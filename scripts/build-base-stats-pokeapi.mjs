import { readFile, writeFile } from "node:fs/promises";

const sourcePath = process.argv[2] ?? "/tmp/pokemon_stats.csv";
const outputPath = process.argv[3] ?? "assets/data/base-stats.json";
const maxNationalId = Number.parseInt(process.argv[4] ?? "1025", 10);

const statKeysById = {
  1: "hp",
  2: "atk",
  3: "def",
  4: "spa",
  5: "spd",
  6: "spe",
};

const csv = await readFile(sourcePath, "utf8");
const rows = csv.trim().split(/\r?\n/).slice(1);
const statsBySpecies = {};

for (const row of rows) {
  const [pokemonIdRaw, statIdRaw, baseStatRaw] = row.split(",");
  const pokemonId = Number.parseInt(pokemonIdRaw, 10);
  const statId = Number.parseInt(statIdRaw, 10);
  const baseStat = Number.parseInt(baseStatRaw, 10);
  const statKey = statKeysById[statId];

  if (!statKey || pokemonId < 1 || pokemonId > maxNationalId || Number.isNaN(baseStat)) {
    continue;
  }

  statsBySpecies[pokemonId] ??= {};
  statsBySpecies[pokemonId][statKey] = baseStat;
}

const ordered = {};
for (const [id, stats] of Object.entries(statsBySpecies)) {
  if (Object.keys(stats).length !== 6) {
    throw new Error(`Missing base stats for Pokemon #${id}`);
  }
  ordered[id] = {
    hp: stats.hp,
    atk: stats.atk,
    def: stats.def,
    spa: stats.spa,
    spd: stats.spd,
    spe: stats.spe,
  };
}

await writeFile(outputPath, `${JSON.stringify(ordered, null, 2)}\n`);
