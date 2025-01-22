const healthElement = document.querySelector('[data-health]');
const staminaElement = document.querySelector('[data-stamina]');

export function updateHealth(value) {
  healthElement.style.width = `${value}%`;
}

export function updateStamina(value) {
  staminaElement.style.width = `${value}%`;
}

// Planned UI components:
// - Minimap with fog of war
// - Quest log display
// - Crafting interface
// - Dialogue system