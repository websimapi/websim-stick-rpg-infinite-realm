import { FastNoiseLite } from 'https://cdn.jsdelivr.net/npm/fastnoise-lite@0.0.2/+esm';
import { WORLD_SIZE, CHUNK_SIZE, TILE_SIZE, SEED, tiles } from './gameState.js';

const noise = new FastNoiseLite(SEED);
noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);

// Biome configuration with expansion slots
const biomes = {
  0: { type: 'water', color: '#2980b9', solid: true, fauna: [] },
  0.3: { type: 'sand', color: '#f1c40f', solid: false, spawnChance: 0.02 },
  0.6: { type: 'grass', color: '#27ae60', solid: false, foliage: 0.3 },
  0.8: { type: 'mountain', color: '#7f8c8d', solid: true, mineral: 'iron' },
  1: { type: 'snow', color: '#ecf0f1', solid: true, weather: 'snowing' }
};

export function getBiome(value) {
  const thresholds = Object.keys(biomes).sort((a,b) => a - b);
  for (let threshold of thresholds) {
    if (value <= threshold) return biomes[threshold];
  }
  return biomes[1];
}

export function generateChunk(cx, cy) {
  const chunkKey = `${cx}|${cy}`;
  if (tiles.has(chunkKey)) return;

  const chunkDiv = document.createElement('div');
  chunkDiv.className = 'chunk';
  chunkDiv.style.transform = `translate(${cx * CHUNK_SIZE * TILE_SIZE}px, ${cy * CHUNK_SIZE * TILE_SIZE}px)`;
  
  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let y = 0; y < CHUNK_SIZE; y++) {
      const wx = cx * CHUNK_SIZE + x;
      const wy = cy * CHUNK_SIZE + y;
      
      const value = noise.GetNoise(wx * 0.1, wy * 0.1) * 0.5 + 0.5;
      const biome = getBiome(value);
      
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.backgroundColor = biome.color;
      tile.style.transform = `translate(${x * TILE_SIZE}px, ${y * TILE_SIZE}px)`;
      tile.dataset.biome = biome.type;
      tile.dataset.solid = biome.solid;
      chunkDiv.appendChild(tile);
    }
  }
  
  const world = document.querySelector('[data-world]');
  world.appendChild(chunkDiv);
  tiles.set(chunkKey, chunkDiv);
}

export function getTileAt(x, y) {
  const tx = Math.floor(x / TILE_SIZE);
  const ty = Math.floor(y / TILE_SIZE);
  return document.querySelector(`[style*="translate(${tx * TILE_SIZE}px, ${ty * TILE_SIZE}px)"]`);
}

// Future features:
// - Procedural structure generation (dungeons, villages)
// - Dynamic resource spawning
// - Biome-specific interactables
// - Environmental hazards system