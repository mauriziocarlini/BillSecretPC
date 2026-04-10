const FORMAT_CONFIGS = {
  pb7: {
    key: "pb7",
    fileExtension: ".pb7",
    game: "LGPE",
    sizeStored: 0x104,
    sizeParty: 0x104,
    blockSize: 0x38,
    crypto: "g67",
    speciesMode: "raw",
    offsets: {
      checksum: 0x06,
      species: 0x08,
      exp: 0x10,
      ability: 0x14,
      nature: 0x1c,
      statNature: null,
      formPacked: 0x1d,
      evHp: 0x1e,
      evAtk: 0x1f,
      evDef: 0x20,
      evSpe: 0x21,
      evSpa: 0x22,
      evSpd: 0x23,
      move1: 0x5a,
      move2: 0x5c,
      move3: 0x5e,
      move4: 0x60,
      nicknameTerminator: 0x58,
      otTerminator: 0xc8,
      statLevel: 0xec,
    },
  },
  pk8: {
    key: "pk8",
    fileExtension: ".pk8",
    game: "SWSH",
    sizeStored: 0x148,
    sizeParty: 0x158,
    blockSize: 0x50,
    crypto: "g8",
    speciesMode: "raw",
    offsets: {
      checksum: 0x06,
      species: 0x08,
      exp: 0x10,
      ability: 0x14,
      nature: 0x20,
      statNature: 0x21,
      form: 0x24,
      evHp: 0x26,
      evAtk: 0x27,
      evDef: 0x28,
      evSpe: 0x29,
      evSpa: 0x2a,
      evSpd: 0x2b,
      move1: 0x72,
      move2: 0x74,
      move3: 0x76,
      move4: 0x78,
      nicknameTerminator: 0x70,
      otTerminator: 0x110,
      statLevel: 0x148,
    },
  },
  pa8: {
    key: "pa8",
    fileExtension: ".pa8",
    game: "PLA",
    sizeStored: 0x168,
    sizeParty: 0x178,
    blockSize: 0x58,
    crypto: "g8a",
    speciesMode: "raw",
    offsets: {
      checksum: 0x06,
      species: 0x08,
      exp: 0x10,
      ability: 0x14,
      nature: 0x20,
      statNature: 0x21,
      form: 0x24,
      evHp: 0x26,
      evAtk: 0x27,
      evDef: 0x28,
      evSpe: 0x29,
      evSpa: 0x2a,
      evSpd: 0x2b,
      move1: 0x54,
      move2: 0x56,
      move3: 0x58,
      move4: 0x5a,
      nicknameTerminator: 0x78,
      otTerminator: 0x128,
      statLevel: 0x168,
    },
  },
  pk9: {
    key: "pk9",
    fileExtension: ".pk9",
    game: "SV",
    sizeStored: 0x148,
    sizeParty: 0x158,
    blockSize: 0x50,
    crypto: "g8",
    speciesMode: "gen9",
    offsets: {
      checksum: 0x06,
      species: 0x08,
      exp: 0x10,
      ability: 0x14,
      nature: 0x20,
      statNature: 0x21,
      form: 0x24,
      evHp: 0x26,
      evAtk: 0x27,
      evDef: 0x28,
      evSpe: 0x29,
      evSpa: 0x2a,
      evSpd: 0x2b,
      move1: 0x72,
      move2: 0x74,
      move3: 0x76,
      move4: 0x78,
      nicknameTerminator: 0x70,
      otTerminator: 0x110,
      statLevel: 0x148,
    },
  },
  pa9: {
    key: "pa9",
    fileExtension: ".pa9",
    game: "ZA",
    sizeStored: 0x148,
    sizeParty: 0x158,
    blockSize: 0x50,
    crypto: "g8",
    speciesMode: "gen9",
    offsets: {
      checksum: 0x06,
      species: 0x08,
      exp: 0x10,
      ability: 0x14,
      nature: 0x20,
      statNature: 0x21,
      form: 0x24,
      evHp: 0x26,
      evAtk: 0x27,
      evDef: 0x28,
      evSpe: 0x29,
      evSpa: 0x2a,
      evSpd: 0x2b,
      move1: 0x72,
      move2: 0x74,
      move3: 0x76,
      move4: 0x78,
      nicknameTerminator: 0x70,
      otTerminator: 0x110,
      statLevel: 0x148,
    },
  },
};

const NATURES = [
  "Hardy", "Lonely", "Brave", "Adamant", "Naughty",
  "Bold", "Docile", "Relaxed", "Impish", "Lax",
  "Timid", "Hasty", "Serious", "Jolly", "Naive",
  "Modest", "Mild", "Quiet", "Bashful", "Rash",
  "Calm", "Gentle", "Sassy", "Careful", "Quirky",
];

const NATURE_STATS = ["Atk", "Def", "Spe", "SpA", "SpD"];

const EXPERIENCE_MIN_LEVEL = 1;
const EXPERIENCE_MAX_LEVEL = 100;
const MAX_STAT_POINTS = 32;
const MAX_TOTAL_STAT_POINTS = 66;
const POINT_TO_EV = [0, 4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244, 252];

const FIRST_UNALIGNED_INTERNAL_9 = 917;
const TABLE_9_INTERNAL_TO_NATIONAL = [
  65, -1, -1, -1, -1, 31, 31, 47, 47, 29, 29, 53, 31, 31, 46, 44, 30, 30, -7, -7, -7, 13, 13,
  -2, -2, 23, 23, 24, -21, -21, 27, 27, 47, 47, 47, 26, 14, -33, -33, -33, -17, -17, 3, -29, 12,
  -12, -31, -31, -31, 3, 3, -24, -24, -44, -44, -30, -30, -28, -28, 23, 23, 6, 7, 29, 8, 3, 4,
  4, 20, 4, 23, 6, 3, 3, 4, -1, 13, 9, 7, 5, 7, 9, 9, -43, -43, -43, -68, -68, -68, -58, -58,
  -25, -29, -31, 6, -1, 6, 0, 0, 0, 3, 3, 4, 2, 3, 3, -5, -12, -12,
];

const BLOCK_POSITION = [
  0, 1, 2, 3, 0, 1, 3, 2, 0, 2, 1, 3, 0, 3, 1, 2,
  0, 2, 3, 1, 0, 3, 2, 1, 1, 0, 2, 3, 1, 0, 3, 2,
  2, 0, 1, 3, 3, 0, 1, 2, 2, 0, 3, 1, 3, 0, 2, 1,
  1, 2, 0, 3, 1, 3, 0, 2, 2, 1, 0, 3, 3, 1, 0, 2,
  2, 3, 0, 1, 3, 2, 0, 1, 1, 2, 3, 0, 1, 3, 2, 0,
  2, 1, 3, 0, 3, 1, 2, 0, 2, 3, 1, 0, 3, 2, 1, 0,
  0, 1, 2, 3, 0, 1, 3, 2, 0, 2, 1, 3, 0, 3, 1, 2,
  0, 2, 3, 1, 0, 3, 2, 1, 1, 0, 2, 3, 1, 0, 3, 2,
];

const BLOCK_POSITION_INVERT = [
  0, 1, 2, 4, 3, 5, 6, 7, 12, 18, 13, 19,
  8, 10, 14, 20, 16, 22, 9, 11, 15, 21, 17, 23,
  0, 1, 2, 4, 3, 5, 6, 7,
];

const appState = {
  datasetsReady: false,
  species: [],
  moves: [],
  abilities: [],
  moveLegality: null,
  abilityLegality: null,
  growthRates: null,
  speciesMap: new Map(),
  movesMap: new Map(),
  abilitiesMap: new Map(),
  moveQueryMap: new Map(),
  abilityQueryMap: new Map(),
  loadedFile: null,
};

const ui = {
  fileInput: document.querySelector("#file-input"),
  summaryCard: document.querySelector("#summary-card"),
  editorForm: document.querySelector("#editor-form"),
  statusBanner: document.querySelector("#status-banner"),
  pokemonName: document.querySelector("#pokemon-name"),
  pokemonLevel: document.querySelector("#pokemon-level"),
  evInputs: {
    hp: document.querySelector('[data-ev-input="hp"]'),
    atk: document.querySelector('[data-ev-input="atk"]'),
    def: document.querySelector('[data-ev-input="def"]'),
    spa: document.querySelector('[data-ev-input="spa"]'),
    spd: document.querySelector('[data-ev-input="spd"]'),
    spe: document.querySelector('[data-ev-input="spe"]'),
  },
  evValueLabels: {
    hp: document.querySelector('[data-ev-value="hp"]'),
    atk: document.querySelector('[data-ev-value="atk"]'),
    def: document.querySelector('[data-ev-value="def"]'),
    spa: document.querySelector('[data-ev-value="spa"]'),
    spd: document.querySelector('[data-ev-value="spd"]'),
    spe: document.querySelector('[data-ev-value="spe"]'),
  },
  evTotal: document.querySelector("#ev-total"),
  natureSelect: document.querySelector("#nature-select"),
  abilityInput: document.querySelector("#ability-input"),
  moveInputs: [
    document.querySelector('[data-move-input="1"]'),
    document.querySelector('[data-move-input="2"]'),
    document.querySelector('[data-move-input="3"]'),
    document.querySelector('[data-move-input="4"]'),
  ],
  saveButton: document.querySelector("#save-button"),
};

bootstrap().catch((error) => {
  console.error(error);
  setStatus("App bootstrap failed.", "error");
});

async function bootstrap() {
  await Promise.all([loadDatasets(), registerServiceWorker()]);
  buildStaticUI();
  wireEvents();
  setStatus("", "");
}

async function loadDatasets() {
  const [species, moves, abilities, moveLegality, abilityLegality, growthRates] = await Promise.all([
    fetch("./assets/data/species.json").then((res) => res.json()),
    fetch("./assets/data/moves.json").then((res) => res.json()),
    fetch("./assets/data/abilities.json").then((res) => res.json()),
    fetch("./assets/data/move-legality-pkhex.json").then((res) => res.json()),
    fetch("./assets/data/ability-legality-pkhex.json").then((res) => res.json()),
    fetch("./assets/data/growth-rates-pkhex.json").then((res) => res.json()),
  ]);

  appState.species = species;
  appState.moves = [{ id: 0, key: "none", name: "(None)" }, ...moves];
  appState.abilities = abilities;
  appState.moveLegality = moveLegality;
  appState.abilityLegality = abilityLegality;
  appState.growthRates = growthRates;
  appState.speciesMap = new Map(species.map((entry) => [entry.id, entry]));
  appState.movesMap = new Map(appState.moves.map((entry) => [entry.id, entry]));
  appState.abilitiesMap = new Map(abilities.map((entry) => [entry.id, entry]));
  appState.moveQueryMap = buildQueryMap(appState.moves);
  appState.abilityQueryMap = buildQueryMap(appState.abilities);
  appState.datasetsReady = true;
}

function buildStaticUI() {
  ui.natureSelect.innerHTML = "";
  NATURES.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = formatNatureLabel(name, index);
    ui.natureSelect.append(option);
  });

  renderAbilityOptions();
  renderMoveOptions(appState.moves);
}

function wireEvents() {
  ui.fileInput.addEventListener("change", async (event) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    await handleFile(file);
  });

  Object.values(ui.evInputs).forEach((input) => {
    input.addEventListener("input", () => {
      syncSpSliders(input.dataset.evInput);
      updateEvBadge();
      refreshSaveState();
    });
  });

  ui.abilityInput.addEventListener("change", refreshSaveState);
  ui.natureSelect.addEventListener("change", refreshSaveState);
  ui.moveInputs.forEach((input) => input.addEventListener("change", () => {
    updateSummaryLevel();
    refreshSaveState();
  }));
  ui.editorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    exportEditedFile();
  });
}

async function handleFile(file) {
  try {
    if (!appState.datasetsReady) throw new Error("Datasets are still loading.");

    const bytes = new Uint8Array(await file.arrayBuffer());
    const format = detectFormat(file.name, bytes);
    if (!format) {
      throw new Error("Unsupported file type. Use PB7, PK8, PA8, PK9 or PA9.");
    }

    const encrypted = isEncrypted(bytes, format);
    const decrypted = bytes.slice();
    if (encrypted) decryptForFormat(decrypted, format);

    const parsed = parsePokemon(decrypted, format);
    appState.loadedFile = {
      fileName: file.name,
      originalBytes: bytes,
      decryptedBytes: decrypted,
      encrypted,
      format,
      parsed,
    };

    fillForm(appState.loadedFile);
    setStatus(`Loaded ${parsed.speciesName}.`, "ok");
  } catch (error) {
    console.error(error);
    appState.loadedFile = null;
    ui.summaryCard.classList.add("hidden");
    ui.editorForm.classList.add("hidden");
    setStatus(error.message || "Could not read this file.", "error");
  }
}

function detectFormat(fileName, bytes) {
  const extension = fileName.includes(".") ? `.${fileName.split(".").pop().toLowerCase()}` : "";
  const exact = Object.values(FORMAT_CONFIGS).find(
    (config) => config.fileExtension === extension && (bytes.length === config.sizeStored || bytes.length === config.sizeParty),
  );
  if (exact) return exact;

  const bySize = Object.values(FORMAT_CONFIGS).filter(
    (config) => bytes.length === config.sizeStored || bytes.length === config.sizeParty,
  );
  if (bySize.length === 1) return bySize[0];
  return null;
}

function parsePokemon(bytes, format) {
  const speciesRaw = readU16(bytes, format.offsets.species);
  const speciesId = format.speciesMode === "gen9" ? getNational9(speciesRaw) : speciesRaw;
  const form = readForm(bytes, format);
  const exp = readU32(bytes, format.offsets.exp);
  const growthRate = getGrowthRate(format.key, speciesId, form);
  return {
    speciesId,
    speciesRaw,
    form,
    speciesName: appState.speciesMap.get(speciesId)?.name || `Unknown Pokemon #${speciesId}`,
    growthRate,
    exp,
    level: getLevelFromData(bytes, format, exp, growthRate),
    abilityId: readAbility(bytes, format),
    natureId: readNature(bytes, format),
    evs: {
      hp: bytes[format.offsets.evHp],
      atk: bytes[format.offsets.evAtk],
      def: bytes[format.offsets.evDef],
      spa: bytes[format.offsets.evSpa],
      spd: bytes[format.offsets.evSpd],
      spe: bytes[format.offsets.evSpe],
    },
    moves: [0, 1, 2, 3].map((index) => readU16(bytes, format.offsets.move1 + index * 2)),
  };
}

function fillForm(fileState) {
  const { parsed } = fileState;
  ui.summaryCard.classList.remove("hidden");
  ui.editorForm.classList.remove("hidden");
  ui.pokemonName.textContent = parsed.speciesName;

  Object.entries(parsed.evs).forEach(([key, value]) => {
    ui.evInputs[key].value = String(pointsFromLegacyEv(value));
  });

  ui.natureSelect.value = String(parsed.natureId);
  renderAbilityOptions(parsed.abilityId);
  ui.abilityInput.value = String(parsed.abilityId);

  updateMoveOptions();
  ui.moveInputs.forEach((input, index) => {
    const moveId = parsed.moves[index];
    ensureMoveOptionExists(moveId);
    input.value = String(moveId);
  });

  updateSummaryLevel();
  syncSpSliders();
  updateEvBadge();
  refreshSaveState();

  if (!hasLegalityDataForCurrentPokemon()) {
    setStatus(
      `Loaded ${parsed.speciesName}. Move legality data is missing for this format, so only the current moves are editable.`,
      "warn",
    );
  }
}

function updateEvBadge() {
  const total = getEvTotal();
  ui.evTotal.textContent = `${total} / ${MAX_TOTAL_STAT_POINTS} SP`;
  ui.evTotal.classList.toggle("error", total > MAX_TOTAL_STAT_POINTS);
  Object.entries(ui.evInputs).forEach(([key, input]) => {
    ui.evValueLabels[key].textContent = String(clampPointsValue(input.value));
  });
}

function refreshSaveState() {
  ui.saveButton.disabled = !isFormValid();
}

function isFormValid() {
  if (!appState.loadedFile) return false;
  const total = getEvTotal();
  if (total > MAX_TOTAL_STAT_POINTS) return false;

  const evValues = Object.values(ui.evInputs).map((input) => Number.parseInt(input.value || "0", 10));
  if (evValues.some((value) => Number.isNaN(value) || value < 0 || value > MAX_STAT_POINTS)) return false;
  const level = getDesiredLevel();
  if (level == null || level < EXPERIENCE_MIN_LEVEL || level > EXPERIENCE_MAX_LEVEL) return false;
  if (resolveAbilityValue() == null) return false;

  for (const input of ui.moveInputs) {
    const moveId = resolveMoveValue(input.value);
    if (moveId == null) return false;
    if (!isLegalMoveId(moveId)) return false;
  }
  return true;
}

function exportEditedFile() {
  if (!appState.loadedFile || !isFormValid()) {
    setStatus("Please fix the invalid fields before exporting.", "error");
    return;
  }

  const { decryptedBytes, encrypted, fileName, format } = appState.loadedFile;
  const output = decryptedBytes.slice();
  const desiredLevel = getDesiredLevel();
  const evs = collectEvs();
  output[format.offsets.evHp] = evs.hp;
  output[format.offsets.evAtk] = evs.atk;
  output[format.offsets.evDef] = evs.def;
  output[format.offsets.evSpa] = evs.spa;
  output[format.offsets.evSpd] = evs.spd;
  output[format.offsets.evSpe] = evs.spe;
  writeU32(output, format.offsets.exp, getExpForLevel(desiredLevel, appState.loadedFile.parsed.growthRate));
  if (format.offsets.statLevel != null && format.offsets.statLevel < output.length) {
    output[format.offsets.statLevel] = desiredLevel;
  }

  const natureId = Number.parseInt(ui.natureSelect.value, 10);
  if (format.offsets.statNature != null) {
    output[format.offsets.statNature] = natureId;
  } else {
    output[format.offsets.nature] = natureId;
  }

  writeAbility(output, format, resolveAbilityValue());
  ui.moveInputs.forEach((input, index) => {
    writeU16(output, format.offsets.move1 + index * 2, resolveMoveValue(input.value));
  });

  refreshChecksum(output, format);
  if (encrypted) encryptForFormat(output, format);

  const blob = new Blob([output], { type: "application/octet-stream" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = buildOutputName(fileName);
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

  const levelMessage = desiredLevel > appState.loadedFile.parsed.level
    ? `Export complete. Level auto-raised to ${desiredLevel}.`
    : "Export complete.";
  setStatus(levelMessage, "ok");
}

function updateMoveOptions() {
  const options = getLegalMoveEntries();
  const selectedValues = ui.moveInputs.map((input) => input.value);
  renderMoveOptions(options);
  ui.moveInputs.forEach((input, index) => {
    const selected = selectedValues[index];
    if (selected && Array.from(input.options).some((option) => option.value === selected)) {
      input.value = selected;
    }
  });
}

function collectEvs() {
  return {
    hp: legacyEvFromPoints(ui.evInputs.hp.value),
    atk: legacyEvFromPoints(ui.evInputs.atk.value),
    def: legacyEvFromPoints(ui.evInputs.def.value),
    spa: legacyEvFromPoints(ui.evInputs.spa.value),
    spd: legacyEvFromPoints(ui.evInputs.spd.value),
    spe: legacyEvFromPoints(ui.evInputs.spe.value),
  };
}

function getEvTotal() {
  return Object.values(ui.evInputs).reduce((sum, input) => sum + clampPointsValue(input.value), 0);
}

function syncSpSliders(changedKey = "") {
  if (changedKey) {
    const input = ui.evInputs[changedKey];
    const otherTotal = Object.entries(ui.evInputs).reduce((sum, [key, current]) => {
      if (key === changedKey) return sum;
      return sum + clampPointsValue(current.value);
    }, 0);
    const maxForChanged = Math.max(0, Math.min(MAX_STAT_POINTS, MAX_TOTAL_STAT_POINTS - otherTotal));
    if (clampPointsValue(input.value) > maxForChanged) {
      input.value = String(maxForChanged);
    }
  }

  Object.entries(ui.evInputs).forEach(([key, input]) => {
    const otherTotal = Object.entries(ui.evInputs).reduce((sum, [otherKey, current]) => {
      if (otherKey === key) return sum;
      return sum + clampPointsValue(current.value);
    }, 0);
    const maxForStat = Math.max(0, Math.min(MAX_STAT_POINTS, MAX_TOTAL_STAT_POINTS - otherTotal));
    if (clampPointsValue(input.value) > maxForStat) {
      input.value = String(maxForStat);
    }
    const fill = (clampPointsValue(input.value) / MAX_STAT_POINTS) * 100;
    input.style.setProperty("--range-fill", `${fill}%`);
  });
}

function buildQueryMap(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    map.set(normalizeQuery(entry.name), entry.id);
    map.set(normalizeQuery(entry.key), entry.id);
    map.set(normalizeQuery(formatOptionLabel(entry)), entry.id);
  });
  return map;
}

function resolveMoveValue(value) {
  if (!value.trim()) return 0;
  return Number.parseInt(value, 10);
}

function resolveAbilityValue() {
  if (!ui.abilityInput.value.trim()) return null;
  return Number.parseInt(ui.abilityInput.value, 10);
}

function getLegalMoveEntries() {
  if (!appState.loadedFile || !appState.moveLegality) return appState.moves;

  const { parsed } = appState.loadedFile;
  const speciesData = getLegalityEntriesForCurrentPokemon();
  if (!speciesData) return getConservativeMoveEntries();

  const legalIds = new Set([0]);
  for (const [moveId, minLevel] of speciesData) {
    legalIds.add(moveId);
  }

  for (const moveId of parsed.moves) {
    if (moveId) legalIds.add(moveId);
  }

  return appState.moves.filter((entry) => legalIds.has(entry.id));
}

function isLegalMoveId(moveId) {
  if (moveId === 0 || !appState.loadedFile || !appState.moveLegality) return true;
  const { parsed } = appState.loadedFile;
  if (parsed.moves.includes(moveId)) return true;
  const speciesData = getLegalityEntriesForCurrentPokemon();
  if (!speciesData) {
    return getConservativeMoveEntries().some((entry) => entry.id === moveId);
  }

  for (const [legalMoveId, minLevel] of speciesData) {
    if (legalMoveId !== moveId) continue;
    return true;
  }
  return false;
}

function hasLegalityDataForCurrentPokemon() {
  return !!getLegalityEntriesForCurrentPokemon();
}

function getLegalityEntriesForCurrentPokemon() {
  if (!appState.loadedFile || !appState.moveLegality) return null;
  const { format, parsed } = appState.loadedFile;
  return (
    appState.moveLegality[format.key]?.[`${parsed.speciesId}:${parsed.form}`] ??
    appState.moveLegality[format.key]?.[`${parsed.speciesId}:0`] ??
    null
  );
}

function getConservativeMoveEntries() {
  if (!appState.loadedFile) return [{ id: 0, key: "none", name: "(None)" }];
  const entries = new Map([[0, { id: 0, key: "none", name: "(None)" }]]);
  for (const moveId of appState.loadedFile.parsed.moves) {
    if (!moveId) continue;
    entries.set(
      moveId,
      appState.movesMap.get(moveId) || { id: moveId, key: String(moveId), name: `Unknown Move ${moveId}` },
    );
  }
  return Array.from(entries.values()).sort((a, b) => a.id - b.id);
}

function getLegalAbilityIds() {
  if (!appState.loadedFile || !appState.abilityLegality) return null;
  const { format, parsed } = appState.loadedFile;
  return (
    appState.abilityLegality[format.key]?.[`${parsed.speciesId}:${parsed.form}`] ??
    appState.abilityLegality[format.key]?.[`${parsed.speciesId}:0`] ??
    null
  );
}

function normalizeQuery(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function formatOptionLabel(entry) {
  return `${entry.name} (#${entry.id})`;
}

function formatDisplayLabel(entry) {
  return entry.name;
}

function formatNatureLabel(name, index) {
  const increased = Math.floor(index / 5);
  const decreased = index % 5;
  if (increased === decreased) {
    return name;
  }
  return `${name} (+${NATURE_STATS[increased]}, -${NATURE_STATS[decreased]})`;
}

function renderAbilityOptions(selectedAbilityId = 0) {
  const legalIds = getLegalAbilityIds();
  const entries = (legalIds?.length ? legalIds : appState.abilities.map((entry) => entry.id))
    .map((id) => appState.abilitiesMap.get(id) || { id, name: `Unknown Ability ${id}` });
  if (selectedAbilityId && !entries.some((entry) => entry.id === selectedAbilityId)) {
    entries.unshift(appState.abilitiesMap.get(selectedAbilityId) || { id: selectedAbilityId, name: `Unknown Ability ${selectedAbilityId}` });
  }
  ui.abilityInput.innerHTML = entries
    .map((entry) => `<option value="${entry.id}">${formatDisplayLabel(entry)}</option>`)
    .join("");
}

function renderMoveOptions(entries) {
  const rendered = entries
    .map((entry) => `<option value="${entry.id}">${formatDisplayLabel(entry)}</option>`)
    .join("");
  ui.moveInputs.forEach((input) => {
    input.innerHTML = rendered;
  });
}

function ensureMoveOptionExists(moveId) {
  if (!moveId) return;
  const existsEverywhere = ui.moveInputs.every((input) => Array.from(input.options).some((option) => Number.parseInt(option.value, 10) === moveId));
  if (existsEverywhere) return;
  const entry = appState.movesMap.get(moveId) || { id: moveId, name: `Unknown Move ${moveId}` };
  ui.moveInputs.forEach((input) => {
    if (Array.from(input.options).some((option) => Number.parseInt(option.value, 10) === moveId)) return;
    const option = document.createElement("option");
    option.value = String(entry.id);
    option.textContent = formatDisplayLabel(entry);
    input.append(option);
  });
}

function buildOutputName(fileName) {
  const dot = fileName.lastIndexOf(".");
  if (dot === -1) return `${fileName}_edited`;
  return `${fileName.slice(0, dot)}_edited${fileName.slice(dot)}`;
}

function setStatus(message, tone = "") {
  if (!ui.statusBanner) return;
  const shouldShow = tone === "error" && !!message;
  ui.statusBanner.textContent = shouldShow ? message : "";
  ui.statusBanner.className = `status${tone ? ` ${tone}` : ""}${shouldShow ? "" : " hidden"}`;
}

function readNature(bytes, format) {
  const offset = format.offsets.statNature ?? format.offsets.nature;
  return bytes[offset];
}

function readCurrentLevel(bytes, format) {
  const { statLevel } = format.offsets;
  if (statLevel == null || statLevel >= bytes.length) return null;
  return bytes[statLevel];
}

function getLevelFromData(bytes, format, exp, growthRate) {
  if (growthRate != null) {
    return getLevelFromExp(exp, growthRate);
  }
  return readCurrentLevel(bytes, format) ?? EXPERIENCE_MIN_LEVEL;
}

function readForm(bytes, format) {
  if (format.offsets.formPacked != null) {
    return bytes[format.offsets.formPacked] >> 3;
  }
  if (format.offsets.form != null) {
    return bytes[format.offsets.form];
  }
  return 0;
}

function readAbility(bytes, format) {
  if (format.key === "pb7") return bytes[format.offsets.ability];
  return readU16(bytes, format.offsets.ability);
}

function writeAbility(bytes, format, abilityId) {
  if (format.key === "pb7") {
    bytes[format.offsets.ability] = abilityId & 0xff;
    return;
  }
  writeU16(bytes, format.offsets.ability, abilityId);
}

function getDesiredLevel() {
  const baseline = appState.loadedFile?.parsed.level ?? EXPERIENCE_MIN_LEVEL;
  return Math.max(baseline, getRequiredLevelForSelectedMoves());
}

function getRequiredLevelForSelectedMoves() {
  if (!appState.loadedFile) return EXPERIENCE_MIN_LEVEL;
  const speciesData = getLegalityEntriesForCurrentPokemon();
  if (!speciesData) return appState.loadedFile.parsed.level ?? EXPERIENCE_MIN_LEVEL;

  let requiredLevel = appState.loadedFile.parsed.level ?? EXPERIENCE_MIN_LEVEL;
  for (const input of ui.moveInputs) {
    const moveId = resolveMoveValue(input.value);
    if (moveId == null || moveId === 0) continue;
    for (const [legalMoveId, minLevel] of speciesData) {
      if (legalMoveId === moveId) {
        requiredLevel = Math.max(requiredLevel, minLevel || EXPERIENCE_MIN_LEVEL);
        break;
      }
    }
  }
  return requiredLevel;
}

function updateSummaryLevel() {
  if (!appState.loadedFile) return;
  const parsedLevel = appState.loadedFile.parsed.level ?? EXPERIENCE_MIN_LEVEL;
  const desiredLevel = getDesiredLevel();
  ui.pokemonLevel.textContent = desiredLevel > parsedLevel
    ? `Level ${parsedLevel} -> ${desiredLevel}`
    : `Level ${parsedLevel}`;
  ui.pokemonLevel.classList.toggle("auto-raised", desiredLevel > parsedLevel);
}

function getGrowthRate(formatKey, speciesId, form) {
  return (
    appState.growthRates?.[formatKey]?.[`${speciesId}:${form}`] ??
    appState.growthRates?.[formatKey]?.[`${speciesId}:0`] ??
    null
  );
}

function getLevelFromExp(exp, growthRate) {
  let level = EXPERIENCE_MIN_LEVEL;
  while (level < EXPERIENCE_MAX_LEVEL && exp >= getExpForLevel(level + 1, growthRate)) {
    level += 1;
  }
  return level;
}

function getExpForLevel(level, growthRate) {
  const n = Math.max(EXPERIENCE_MIN_LEVEL, Math.min(EXPERIENCE_MAX_LEVEL, level));
  switch (growthRate) {
    case 0:
      return n ** 3;
    case 1:
      if (n <= 50) return Math.floor((n ** 3 * (100 - n)) / 50);
      if (n <= 68) return Math.floor((n ** 3 * (150 - n)) / 100);
      if (n <= 98) return Math.floor((n ** 3 * ((1911 - (10 * n)) / 3)) / 500);
      return Math.floor((n ** 3 * (160 - n)) / 100);
    case 2:
      if (n <= 15) return Math.floor((n ** 3 * (((n + 1) / 3) + 24)) / 50);
      if (n <= 36) return Math.floor((n ** 3 * (n + 14)) / 50);
      return Math.floor((n ** 3 * ((n / 2) + 32)) / 50);
    case 3:
      return Math.floor((6 * (n ** 3)) / 5) - (15 * (n ** 2)) + (100 * n) - 140;
    case 4:
      return Math.floor((4 * (n ** 3)) / 5);
    case 5:
      return Math.floor((5 * (n ** 3)) / 4);
    default:
      return 0;
  }
}

function refreshChecksum(bytes, format) {
  let sum = 0;
  for (let offset = 8; offset < format.sizeStored; offset += 2) {
    sum = (sum + readU16(bytes, offset)) & 0xffff;
  }
  writeU16(bytes, format.offsets.checksum, sum);
}

function isEncrypted(bytes, format) {
  const { nicknameTerminator, otTerminator } = format.offsets;
  return readU16(bytes, nicknameTerminator) !== 0 || readU16(bytes, otTerminator) !== 0;
}

function decryptForFormat(bytes, format) {
  switch (format.crypto) {
    case "g67":
      decrypt67(bytes, format);
      break;
    case "g8":
      decrypt8(bytes, format);
      break;
    case "g8a":
      decrypt8A(bytes, format);
      break;
    default:
      throw new Error(`Unsupported crypto mode ${format.crypto}`);
  }
}

function encryptForFormat(bytes, format) {
  switch (format.crypto) {
    case "g67":
      encrypt67(bytes, format);
      break;
    case "g8":
      encrypt8(bytes, format);
      break;
    case "g8a":
      encrypt8A(bytes, format);
      break;
    default:
      throw new Error(`Unsupported crypto mode ${format.crypto}`);
  }
}

function decrypt67(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = pv % 24;
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
  shuffleBlocks(bytes, 8, format.blockSize, sv);
}

function encrypt67(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = BLOCK_POSITION_INVERT[pv % 24];
  shuffleBlocks(bytes, 8, format.blockSize, sv);
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
}

function decrypt8(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = (pv >>> 13) & 31;
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
  shuffleBlocks(bytes, 8, format.blockSize, sv);
}

function encrypt8(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = BLOCK_POSITION_INVERT[(pv >>> 13) & 31];
  shuffleBlocks(bytes, 8, format.blockSize, sv);
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
}

function decrypt8A(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = (pv >>> 13) & 31;
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
  shuffleBlocks(bytes, 8, format.blockSize, sv);
}

function encrypt8A(bytes, format) {
  const pv = readU32(bytes, 0);
  const sv = BLOCK_POSITION_INVERT[(pv >>> 13) & 31];
  shuffleBlocks(bytes, 8, format.blockSize, sv);
  cryptArray(bytes, 8, format.sizeStored, pv);
  if (bytes.length > format.sizeStored) cryptArray(bytes, format.sizeStored, bytes.length, pv);
}

function shuffleBlocks(bytes, start, blockSize, sv) {
  if (sv === 0) return;
  const perm = [0, 1, 2, 3];
  const slotOf = [0, 1, 2, 3];
  const shuffle = BLOCK_POSITION.slice(sv * 4, sv * 4 + 4);

  for (let i = 0; i < 3; i += 1) {
    const desired = shuffle[i];
    const j = slotOf[desired];
    if (j === i) continue;
    swapBlocks(bytes, start + i * blockSize, start + j * blockSize, blockSize);
    const blockAtI = perm[i];
    perm[j] = blockAtI;
    slotOf[blockAtI] = j;
  }
}

function swapBlocks(bytes, aStart, bStart, count) {
  for (let i = 0; i < count; i += 1) {
    const temp = bytes[aStart + i];
    bytes[aStart + i] = bytes[bStart + i];
    bytes[bStart + i] = temp;
  }
}

function cryptArray(bytes, start, end, seed) {
  for (let offset = start; offset < end; offset += 2) {
    seed = ((0x41c64e6d * seed) + 0x6073) >>> 0;
    const xor = (seed >>> 16) & 0xffff;
    writeU16(bytes, offset, readU16(bytes, offset) ^ xor);
  }
}

function getNational9(raw) {
  const shift = raw - FIRST_UNALIGNED_INTERNAL_9;
  if (shift < 0 || shift >= TABLE_9_INTERNAL_TO_NATIONAL.length) return raw;
  return raw + TABLE_9_INTERNAL_TO_NATIONAL[shift];
}

function readU16(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function writeU16(bytes, offset, value) {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
}

function readU32(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function clampPointsValue(value) {
  const parsed = Number.parseInt(String(value ?? "").trim() || "0", 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(MAX_STAT_POINTS, parsed));
}

function pointsFromLegacyEv(value) {
  const ev = Math.max(0, Math.min(252, Number.parseInt(String(value ?? "").trim() || "0", 10) || 0));
  return Math.min(MAX_STAT_POINTS, Math.floor((ev + 4) / 8));
}

function legacyEvFromPoints(value) {
  return POINT_TO_EV[clampPointsValue(value)] ?? 0;
}

function writeU32(bytes, offset, value) {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
  bytes[offset + 2] = (value >>> 16) & 0xff;
  bytes[offset + 3] = (value >>> 24) & 0xff;
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch (error) {
    console.warn("Service worker registration failed", error);
  }
}
