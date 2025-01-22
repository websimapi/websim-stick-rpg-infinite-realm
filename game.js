const WORLD_SIZE = 3000;
const CHUNK_SIZE = 8;
const TILE_SIZE = 64;
const SEED = Math.floor(Math.random() * 10000);

const noise = new FastNoiseLite(SEED);
noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);

const world = document.querySelector('[data-world]');
const player = document.querySelector('[data-player]');
const tiles = new Map();
let playerPos = { x: WORLD_SIZE/2, y: WORLD_SIZE/2 };
let cameraPos = { x: 0, y: 0 };

// Biome definitions
const biomes = {
  0: { type: 'water', color: '#2980b9', solid: true },
  0.3: { type: 'sand', color: '#f1c40f', solid: false },
  0.6: { type: 'grass', color: '#27ae60', solid: false },
  0.8: { type: 'mountain', color: '#7f8c8d', solid: true },
  1: { type: 'snow', color: '#ecf0f1', solid: true }
};

function getBiome(value) {
  const thresholds = Object.keys(biomes).sort((a,b) => a - b);
  for (let threshold of thresholds) {
    if (value <= threshold) return biomes[threshold];
  }
  return biomes[1];
}

function generateChunk(cx, cy) {
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
  
  world.appendChild(chunkDiv);
  tiles.set(chunkKey, chunkDiv);
}

function updateCamera() {
  const screenX = window.innerWidth / 2;
  const screenY = window.innerHeight / 2;
  cameraPos.x = playerPos.x - screenX;
  cameraPos.y = playerPos.y - screenY;
  world.style.transform = `translate(${-cameraPos.x}px, ${-cameraPos.y}px)`;
}

function getTileAt(x, y) {
  const tx = Math.floor(x / TILE_SIZE);
  const ty = Math.floor(y / TILE_SIZE);
  return document.querySelector(`[style*="translate(${tx * TILE_SIZE}px, ${ty * TILE_SIZE}px)"]`);
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  
  const targetTile = getTileAt(newX, newY);
  if (targetTile?.dataset.solid === 'true') return;

  playerPos.x = newX;
  playerPos.y = newY;
  player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  
  const chunkX = Math.floor((playerPos.x / TILE_SIZE) / CHUNK_SIZE);
  const chunkY = Math.floor((playerPos.y / TILE_SIZE) / CHUNK_SIZE);
  
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      generateChunk(chunkX + x, chunkY + y);
    }
  }
}

document.addEventListener('keydown', (e) => {
  const speed = 5;
  switch(e.key.toLowerCase()) {
    case 'w':
    case 'arrowup': movePlayer(0, -speed); break;
    case 's':
    case 'arrowdown': movePlayer(0, speed); break;
    case 'a':
    case 'arrowleft': movePlayer(-speed, 0); break;
    case 'd':
    case 'arrowright': movePlayer(speed, 0); break;
  }
  updateCamera();
});

// Initialize world
generateChunk(-1, -1);
generateChunk(0, -1);
generateChunk(1, -1);
generateChunk(-1, 0);
generateChunk(0, 0);
generateChunk(1, 0);
generateChunk(-1, 1);
generateChunk(0, 1);
generateChunk(1, 1);
player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
updateCamera();