import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const RESOURCE_BASE = "https://raw.githubusercontent.com/kwsch/PKHeX/master/PKHeX.Core/Resources/byte";
const OUTPUT_PATH = path.join(rootDir, "assets", "data", "growth-rates-pkhex.json");

const FORMAT_CONFIGS = [
  { key: "pb7", personalFile: "personal_gg", personalSize: 0x54, expGrowthOffset: 0x15, formStatsOffset: 0x1c, formCountOffset: 0x20 },
  { key: "pk8", personalFile: "personal_swsh", personalSize: 0xb0, expGrowthOffset: 0x15, formStatsOffset: 0x1e, formCountOffset: 0x20 },
  { key: "pa8", personalFile: "personal_la", personalSize: 0xb0, expGrowthOffset: 0x15, formStatsOffset: 0x1e, formCountOffset: 0x20 },
  { key: "pk9", personalFile: "personal_sv", personalSize: 0x50, expGrowthOffset: 0x0f, formStatsOffset: 0x18, formCountOffset: 0x1a },
  { key: "pa9", personalFile: "personal_za", personalSize: 0x50, expGrowthOffset: 0x0f, formStatsOffset: 0x18, formCountOffset: 0x1a },
];

async function main() {
  const output = {};
  for (const format of FORMAT_CONFIGS) {
    output[format.key] = await buildFormatGrowthRates(format);
  }
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

async function buildFormatGrowthRates(format) {
  const bytes = await fetchBytes(`${RESOURCE_BASE}/personal/${format.personalFile}`);
  const entries = splitFixedEntries(bytes, format.personalSize);
  const result = {};

  for (let species = 1; species < entries.length; species += 1) {
    const baseEntry = entries[species];
    if (!baseEntry) continue;
    const baseGrowth = baseEntry[format.expGrowthOffset];
    const formStatsIndex = readU16(baseEntry, format.formStatsOffset);
    const formCount = Math.max(baseEntry[format.formCountOffset] ?? 1, 1);

    result[`${species}:0`] = baseGrowth;

    for (let form = 1; form < formCount; form += 1) {
      const formIndex = formStatsIndex > 0 ? formStatsIndex + form - 1 : species;
      const formEntry = entries[formIndex];
      if (!formEntry) continue;
      const formGrowth = formEntry[format.expGrowthOffset];
      if (formGrowth !== baseGrowth) {
        result[`${species}:${form}`] = formGrowth;
      }
    }
  }

  return result;
}

function splitFixedEntries(buffer, entrySize) {
  const bytes = asUint8Array(buffer);
  const result = [];
  for (let offset = 0; offset < bytes.length; offset += entrySize) {
    result.push(bytes.slice(offset, offset + entrySize));
  }
  return result;
}

function readU16(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function asUint8Array(buffer) {
  return buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
}

async function fetchBytes(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
