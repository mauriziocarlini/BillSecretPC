import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const RESOURCE_BASE = "https://raw.githubusercontent.com/kwsch/PKHeX/master/PKHeX.Core/Resources/byte";
const SOURCE_BASE = "https://raw.githubusercontent.com/kwsch/PKHeX/master/PKHeX.Core";
const OUTPUT_PATH = path.join(rootDir, "assets", "data", "move-legality-pkhex.json");
const MOVES_PATH = path.join(rootDir, "assets", "data", "moves.json");

const PKHEX_SOURCES = {
  learnSource7GG: "Legality/LearnSource/Sources/LearnSource7GG.cs",
  personalInfo8SWSH: "PersonalInfo/Info/PersonalInfo8SWSH.cs",
  personalInfo8LA: "PersonalInfo/Info/PersonalInfo8LA.cs",
  personalInfo9SV: "PersonalInfo/Info/PersonalInfo9SV.cs",
  personalInfo9ZA: "PersonalInfo/Info/PersonalInfo9ZA.cs",
};

const FORMAT_CONFIGS = [
  {
    key: "pb7",
    personalFile: "personal_gg",
    personalSize: 0x54,
    levelupFile: "lvlmove_gg.pkl",
    resourceId: "gg",
    formStatsOffset: 0x1c,
    formCountOffset: 0x20,
    machineBitsOffset: 0x28,
    machineMovesSource: { sourceKey: "learnSource7GG", arrayName: "MachineMoves" },
    applyExtras(entries, { moveId }) {
      addMoves(entries, 25, 8, [
        moveId("ZippyZap"),
        moveId("SplishySplash"),
        moveId("FloatyFall"),
      ]);
      addMoves(entries, 133, 1, [
        moveId("BouncyBubble"),
        moveId("BuzzyBuzz"),
        moveId("SizzlySlide"),
        moveId("GlitzyGlow"),
        moveId("BaddyBad"),
        moveId("SappySeed"),
        moveId("FreezyFrost"),
        moveId("SparklySwirl"),
      ]);
    },
  },
  {
    key: "pk8",
    personalFile: "personal_swsh",
    personalSize: 0xb0,
    levelupFile: "lvlmove_swsh.pkl",
    resourceId: "ss",
    eggFile: "eggmove_swsh.pkl",
    formStatsOffset: 0x1e,
    formCountOffset: 0x20,
    machineBitsOffset: 0x28,
    machineMovesSource: { sourceKey: "personalInfo8SWSH", arrayName: "MachineMovesTechnical" },
    extraBitArrays: [
      { offset: 0x3c, arraySource: { sourceKey: "personalInfo8SWSH", arrayName: "MachineMovesRecord" } },
      { offset: 0x38, arraySource: { sourceKey: "personalInfo8SWSH", arrayName: "TypeTutorMoves" }, byteLength: 1 },
      { offset: 0xa8, arraySource: { sourceKey: "personalInfo8SWSH", arrayName: "SpecialTutorMoves" }, byteLength: 3 },
    ],
    applyExtras(entries, { moveId }) {
      addMoves(entries, 479, 1, [moveId("Overheat")]);
      addMoves(entries, 479, 2, [moveId("HydroPump")]);
      addMoves(entries, 479, 3, [moveId("Blizzard")]);
      addMoves(entries, 479, 4, [moveId("AirSlash")]);
      addMoves(entries, 479, 5, [moveId("LeafStorm")]);
      addMoves(entries, 800, 1, [moveId("SunsteelStrike")]);
      addMoves(entries, 800, 2, [moveId("MoongeistBeam")]);
      addMoves(entries, 898, 0, [moveId("Agility")]);
    },
  },
  {
    key: "pa8",
    personalFile: "personal_la",
    personalSize: 0xb0,
    levelupFile: "lvlmove_la.pkl",
    resourceId: "la",
    formStatsOffset: 0x1e,
    formCountOffset: 0x20,
    machineBitsOffset: 0xa8,
    machineBitCount: 61,
    machineMovesSource: { sourceKey: "personalInfo8LA", arrayName: "MoveShopMoves" },
    applyExtras(entries, { moveId }) {
      addMoves(entries, 479, 1, [moveId("Overheat")]);
      addMoves(entries, 479, 2, [moveId("HydroPump")]);
      addMoves(entries, 479, 3, [moveId("Blizzard")]);
      addMoves(entries, 479, 4, [moveId("AirSlash")]);
      addMoves(entries, 479, 5, [moveId("LeafStorm")]);
    },
  },
  {
    key: "pk9",
    personalFile: "personal_sv",
    personalSize: 0x50,
    levelupFile: "lvlmove_sv.pkl",
    resourceId: "sv",
    eggFile: "eggmove_sv.pkl",
    reminderFile: "reminder_sv.pkl",
    reminderFolder: "personal",
    formStatsOffset: 0x18,
    formCountOffset: 0x1a,
    machineBitsOffset: 0x2c,
    machineMovesSource: { sourceKey: "personalInfo9SV", arrayName: "MachineMoves" },
    applyExtras(entries, { moveId }) {
      addMoves(entries, 479, 1, [moveId("Overheat")]);
      addMoves(entries, 479, 2, [moveId("HydroPump")]);
      addMoves(entries, 479, 3, [moveId("Blizzard")]);
      addMoves(entries, 479, 4, [moveId("AirSlash")]);
      addMoves(entries, 479, 5, [moveId("LeafStorm")]);
      addMoves(entries, 800, 1, [moveId("SunsteelStrike")]);
      addMoves(entries, 800, 2, [moveId("MoongeistBeam")]);
      addMoves(entries, 636, 0, [moveId("BugBite", 28)]);
      addMoves(entries, 570, 1, [moveId("Spite", 24)]);
    },
  },
  {
    key: "pa9",
    personalFile: "personal_za",
    personalSize: 0x50,
    levelupFile: "lvlmove_za.pkl",
    resourceId: "za",
    formStatsOffset: 0x18,
    formCountOffset: 0x1a,
    machineBitsOffset: 0x2c,
    machineMovesSource: { sourceKey: "personalInfo9ZA", arrayName: "MachineMoves" },
  },
];

async function main() {
  const moves = JSON.parse(await readFile(MOVES_PATH, "utf8"));
  const moveLookup = buildMoveLookup(moves);
  const sourceTexts = await loadSourceTexts();
  const output = {};

  for (const format of FORMAT_CONFIGS) {
    output[format.key] = await buildFormatDataset(format, sourceTexts, moveLookup);
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

async function loadSourceTexts() {
  const entries = await Promise.all(
    Object.entries(PKHEX_SOURCES).map(async ([key, relativePath]) => [key, await fetchText(`${SOURCE_BASE}/${relativePath}`)]),
  );
  return Object.fromEntries(entries);
}

async function buildFormatDataset(format, sourceTexts, moveLookup) {
  const [personalBytes, levelupBytes, eggBytes, reminderBytes] = await Promise.all([
    fetchBytes(`${RESOURCE_BASE}/personal/${format.personalFile}`),
    fetchBytes(`${RESOURCE_BASE}/levelup/${format.levelupFile}`),
    format.eggFile ? fetchBytes(`${RESOURCE_BASE}/eggmove/${format.eggFile}`) : null,
    format.reminderFile ? fetchBytes(`${RESOURCE_BASE}/${format.reminderFolder ?? "personal"}/${format.reminderFile}`) : null,
  ]);

  const personalEntries = splitFixedEntries(personalBytes, format.personalSize);
  const levelupEntries = parseBinLinker16(levelupBytes, format.resourceId).map(parseLearnsetEntry);
  const eggEntries = eggBytes ? parseBinLinker16(eggBytes, format.resourceId).map(parseMoveSourceEntry) : null;
  const reminderEntries = reminderBytes ? parseBinLinker16(reminderBytes, format.resourceId).map(parseMoveSourceEntry) : null;

  const machineMoves = format.machineMovesSource
    ? extractCSharpArray(sourceTexts[format.machineMovesSource.sourceKey], format.machineMovesSource.arrayName, moveLookup)
    : [];

  const extraBitArrays = (format.extraBitArrays ?? []).map((entry) => ({
    ...entry,
    moves: extractCSharpArray(sourceTexts[entry.arraySource.sourceKey], entry.arraySource.arrayName, moveLookup),
  }));

  const results = {};
  for (let species = 1; species < personalEntries.length; species += 1) {
    const info = readPersonalInfo(personalEntries[species], format);
    const forms = Math.max(info.formCount || 1, 1);

    const baseMoves = collectMovesForEntry({
      formIndex: species,
      levelupEntries,
      eggEntries,
      reminderEntries,
      personal: personalEntries[species],
      machineBitsOffset: format.machineBitsOffset,
      machineBitCount: format.machineBitCount ?? machineMoves.length,
      machineMoves,
      extraBitArrays,
    });
    addEntry(results, species, 0, baseMoves);

    for (let form = 1; form < forms; form += 1) {
      const formIndex = info.formStatsIndex > 0 ? info.formStatsIndex + form - 1 : species;
      if (formIndex <= 0 || formIndex >= personalEntries.length) continue;
      const formMoves = collectMovesForEntry({
        formIndex,
        levelupEntries,
        eggEntries,
        reminderEntries,
        personal: personalEntries[formIndex],
        machineBitsOffset: format.machineBitsOffset,
        machineBitCount: format.machineBitCount ?? machineMoves.length,
        machineMoves,
        extraBitArrays,
      });
      if (!areMoveListsEqual(baseMoves, formMoves)) {
        addEntry(results, species, form, formMoves);
      }
    }
  }

  if (typeof format.applyExtras === "function") {
    format.applyExtras(results, {
      moveId(name, minLevel = 0) {
        return { id: resolveMoveId(moveLookup, name), minLevel };
      },
    });
  }

  return sortEntries(results);
}

function collectMovesForEntry({
  formIndex,
  levelupEntries,
  eggEntries,
  reminderEntries,
  personal,
  machineBitsOffset,
  machineBitCount,
  machineMoves,
  extraBitArrays,
}) {
  const moveLevels = new Map();

  for (const [moveId, minLevel] of levelupEntries[formIndex] ?? []) {
    mergeMove(moveLevels, moveId, minLevel);
  }
  for (const moveId of eggEntries?.[formIndex] ?? []) {
    mergeMove(moveLevels, moveId, 0);
  }
  for (const moveId of reminderEntries?.[formIndex] ?? []) {
    mergeMove(moveLevels, moveId, 0);
  }

  applyBitflagMoves(moveLevels, personal, machineBitsOffset, machineMoves, machineBitCount);
  for (const extra of extraBitArrays) {
    applyBitflagMoves(moveLevels, personal, extra.offset, extra.moves, extra.moves.length, extra.byteLength);
  }

  return Array.from(moveLevels.entries()).sort((a, b) => a[0] - b[0]);
}

function applyBitflagMoves(target, bytes, offset, moves, count, byteLength = null) {
  if (!moves.length || offset == null) return;
  const maxCount = Math.min(count, moves.length);
  const neededLength = byteLength ?? Math.ceil(maxCount / 8);
  const flags = bytes.subarray(offset, offset + neededLength);
  for (let index = 0; index < maxCount; index += 1) {
    if ((flags[index >> 3] & (1 << (index & 7))) !== 0) {
      mergeMove(target, moves[index], 0);
    }
  }
}

function readPersonalInfo(entry, format) {
  return {
    formStatsIndex: readU16(entry, format.formStatsOffset),
    formCount: entry[format.formCountOffset] ?? 1,
  };
}

function addEntry(result, species, form, moves) {
  if (!moves.length) return;
  result[`${species}:${form}`] = moves;
}

function addMoves(result, species, form, moveEntries) {
  const key = `${species}:${form}`;
  const current = new Map(result[key] ?? []);
  for (const entry of moveEntries) {
    mergeMove(current, entry.id, entry.minLevel ?? 0);
  }
  result[key] = Array.from(current.entries()).sort((a, b) => a[0] - b[0]);
}

function mergeMove(map, moveId, minLevel) {
  if (!moveId) return;
  const prev = map.get(moveId);
  if (prev == null || minLevel < prev) {
    map.set(moveId, minLevel);
  }
}

function sortEntries(result) {
  return Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => {
      const [speciesA, formA] = a.split(":").map(Number);
      const [speciesB, formB] = b.split(":").map(Number);
      return speciesA - speciesB || formA - formB;
    }),
  );
}

function areMoveListsEqual(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index][0] !== right[index][0] || left[index][1] !== right[index][1]) {
      return false;
    }
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

function parseBinLinker16(buffer, expectedIdentifier) {
  const bytes = asUint8Array(buffer);
  const identifier = new TextDecoder("ascii").decode(bytes.subarray(0, 2));
  if (identifier !== expectedIdentifier) {
    throw new Error(`Unexpected BinLinker identifier ${identifier}; expected ${expectedIdentifier}`);
  }
  const count = readU16(bytes, 2);
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    const offset = 4 + index * 2;
    const start = readU16(bytes, offset);
    const end = readU16(bytes, offset + 2);
    entries.push(bytes.slice(start, end));
  }
  return entries;
}

function parseLearnsetEntry(entryBytes) {
  if (!entryBytes?.length) return [];
  const count = Math.floor(entryBytes.length / 3);
  const movesByteLength = count * 2;
  const result = [];
  for (let index = 0; index < count; index += 1) {
    result.push([readU16(entryBytes, index * 2), entryBytes[movesByteLength + index]]);
  }
  return result;
}

function parseMoveSourceEntry(entryBytes) {
  if (!entryBytes?.length) return [];
  const result = [];
  for (let offset = 0; offset < entryBytes.length; offset += 2) {
    result.push(readU16(entryBytes, offset));
  }
  return result.filter(Boolean);
}

function buildMoveLookup(moves) {
  const map = new Map();
  for (const move of moves) {
    const keys = [move.name, move.key, toSpacedWords(move.key), toSpacedWords(move.name)];
    for (const key of keys) {
      map.set(normalizeMoveToken(key), move.id);
    }
  }
  return map;
}

function extractCSharpArray(sourceText, arrayName, moveLookup) {
  const pattern = new RegExp(`${arrayName}\\s*=>\\s*\\[(.*?)\\];`, "s");
  const match = sourceText.match(pattern);
  if (!match) throw new Error(`Unable to find array ${arrayName}`);

  const rawBody = match[1].replace(/\/\/.*$/gm, "").replace(/\r/g, "");
  return rawBody
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => parseCSharpMoveToken(token, moveLookup));
}

function parseCSharpMoveToken(token, moveLookup) {
  if (/^\d+$/.test(token)) {
    return Number.parseInt(token, 10);
  }
  const enumToken = token.match(/\(int\)Move\.([A-Za-z0-9_]+)/);
  if (enumToken) {
    return resolveMoveId(moveLookup, enumToken[1]);
  }
  throw new Error(`Unsupported move token: ${token}`);
}

function resolveMoveId(moveLookup, token) {
  const moveId = moveLookup.get(normalizeMoveToken(token));
  if (moveId == null) throw new Error(`Unable to resolve move token: ${token}`);
  return moveId;
}

function normalizeMoveToken(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function toSpacedWords(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ");
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

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
