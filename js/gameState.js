// Core game constants and shared state
export const WORLD_SIZE = 3000;
export const CHUNK_SIZE = 8;
export const TILE_SIZE = 64;
export const SEED = Math.floor(Math.random() * 10000);

// Global state containers
export const tiles = new Map();
export let playerPos = { x: WORLD_SIZE/2, y: WORLD_SIZE/2 };
export let cameraPos = { x: 0, y: 0 };

// Pathfinding state
export let currentPath = [];

// Future expansion:
// - Day/night cycle tracker
// - Weather system state
// - Global quest tracking
// - Multiplayer synchronization