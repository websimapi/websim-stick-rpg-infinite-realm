import { WORLD_SIZE, TILE_SIZE, playerPos } from './gameState.js';
import { getTileAt } from './world.js';

const player = document.querySelector('[data-player]');
let stamina = 100;

// Add pathfinding variables and functions
let targetPosition = null;
let currentPath = [];
const PATHFINDING_INTERVAL = 100;

export function setTargetPosition(x, y) {
  targetPosition = { x, y };
  findPath(playerPos.x, playerPos.y, x, y);
}

function findPath(startX, startY, endX, endY) {
  // Simple Bresenham line algorithm for initial implementation
  currentPath = [];
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1;
  let err = dx - dy;

  while(true) {
    currentPath.push({ x: startX, y: startY });
    
    if ((startX === endX) && (startY === endY)) break;
    let e2 = 2*err;
    if (e2 > -dy) { err -= dy; startX += sx; }
    if (e2 < dx) { err += dx; startY += sy; }
  }
}

export function update() {
  if (currentPath.length > 0) {
    const nextPos = currentPath[0];
    const dx = nextPos.x - playerPos.x;
    const dy = nextPos.y - playerPos.y;
    
    if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) {
      currentPath.shift();
    } else {
      movePlayer(dx * 0.2, dy * 0.2);
    }
  }
}

// Modify movePlayer for better collision detection
export function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  
  // Check collision in 4 directions
  const checkPoints = [
    {x: newX - 24, y: newY - 24}, // Top-left
    {x: newX + 24, y: newY - 24}, // Top-right
    {x: newX - 24, y: newY + 24}, // Bottom-left
    {x: newX + 24, y: newY + 24}  // Bottom-right
  ];

  for (const point of checkPoints) {
    const tile = getTileAt(point.x, point.y);
    if (tile?.dataset.solid === 'true') return;
  }

  playerPos.x = newX;
  playerPos.y = newY;
  player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  
  // Update stamina
  stamina = Math.max(0, stamina - Math.sqrt(dx*dx + dy*dy)/2);
  
  // Add movement animation class
  player.classList.add('moving');
  setTimeout(() => player.classList.remove('moving'), 200);
}

// TODO: Implement combat system
// export function attack() {}

// TODO: Add inventory management
// export function pickupItem() {}

// TODO: Create skill system
// export function useAbility() {}