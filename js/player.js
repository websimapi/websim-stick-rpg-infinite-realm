import { WORLD_SIZE, TILE_SIZE, playerPos } from './gameState.js';
import { getTileAt } from './world.js';

const player = document.querySelector('[data-player]');
let stamina = 100;

export function movePlayer(dx, dy) {
  const speed = 5;
  if (stamina >= speed) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    
    const targetTile = getTileAt(newX, newY);
    if (targetTile?.dataset.solid === 'true') return;

    playerPos.x = newX;
    playerPos.y = newY;
    player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
    
    const chunkX = Math.floor((playerPos.x / TILE_SIZE) / 8);
    const chunkY = Math.floor((playerPos.y / TILE_SIZE) / 8);
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // TODO: Implement chunk generation logic here
      }
    }
    
    stamina -= speed;
    
    // Add movement animation class
    player.classList.add('moving');
    setTimeout(() => player.classList.remove('moving'), 200);
  }
}

// TODO: Implement combat system
// export function attack() {}

// TODO: Add inventory management
// export function pickupItem() {}

// TODO: Create skill system
// export function useAbility() {}