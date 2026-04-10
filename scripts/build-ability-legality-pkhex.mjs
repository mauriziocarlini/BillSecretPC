import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const RESOURCE_BASE = "https://raw.githubusercontent.com/kwsch/PKHeX/master/PKHeX.Core/Resources/byte";
const OUTPUT_PATH = path.join(rootDir, "assets", "data", "ability-legality-pkhex.json");

const FORMAT_CONFIGS = [
  { key: "pb7", personalFile: "personal_gg", personalSize: 0x54, formStatsOffset: 0x1c, formCountOffset: 0x20, abilityOffsets: [0x18, 0x19, 0x1a], abilityWidth: 1 },
  { key: "pk8", personalFile: "personal_swsh", personalSize: 0xb0, formStatsOffset: 0x1e, formCountOffset: 0x20, abilityOffsets: [0x18, 0x1a, 0x1c], abilityWidth: 2 },
  { key: "pa8", personalFile: "personal_la", personalSize: 0xb0, formStatsOffset: 0x1e, formCountOffset: 0x20, abilityOffsets: [0x18, 0x1a, 0x1c], abilityWidth: 2 },
  { key: "pk9", personalFile: "personal_sv", personalSize: 0x50, formStatsOffset: 0x18, formCountOffset: 0x1a, abilityOffsets: [0x12, 0x14, 0x16], abilityWidth: 2 },
  { key: "pa9", personalFile: "personal_za", personalSize: 0x50, formStatsOffset: 0x18, formCountOffset: 0x1a, abilityOffsets: [0x12, 0x14, 0x16], abilityWidth: 2 },
];

async function main() {
  const output = {};
  for (const format of FORMAT_CONFIGS) {
    output[format.key] = await buildFormatDataset(format);
  }
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

async function buildFormatDataset(format) {
  const bytes = await fetchBytes(`${RESOURCE_BASE}/personal/${format.personalFile}`);
  const entries = splitFixedEntries(bytes, format.personalSize);
  const result = {};

  for (let species = 1; species < entries.length; species += 1) {
    const baseEntry = entries[species];
    if (!baseEntry) continue;
    const info = readPersonalInfo(baseEntry, format);
    const forms = Math.max(info.formCount || 1, 1);
    const baseAbilities = readAbilities(baseEntry, format);
    addEntry(result, species, 0, baseAbilities);

    for (let form = 1; form < forms; form += 1) {
      const formIndex = info.formStatsIndex > 0 ? info.formStatsIndex + form - 1 : species;
      const formEntry = entries[formIndex];
      if (!formEntry) continue;
      const formAbilities = readAbilities(formEntry, format);
      if (!arraysEqual(baseAbilities, formAbilities)) {
        addEntry(result, species, form, formAbilities);
      }
    }
  }

  return result;
}

function readPersonalInfo(entry, format) {
  return {
    formStatsIndex: readU16(entry, format.formStatsOffset),
    formCount: entry[format.formCountOffset] ?? 1,
  };
}

function readAbilities(entry, format) {
  const abilities = [];
  for (const offset of format.abilityOffsets) {
    const value = format.abilityWidth === 1 ? entry[offset] : readU16(entry, offset);
    if (value && !abilities.includes(value)) abilities.push(value);
  }
  return abilities;
}

function addEntry(result, species, form, abilities) {
  if (!abilities.length) return;
  result[`${species}:${form}`] = abilities;
}

function arraysEqual(left, right) {
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i += 1) {
    if (left[i] !== right[i]) return false;
  }
  return true;
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
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
