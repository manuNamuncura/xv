// Helper para seleccionar elementos con seguridad
export const $ = (selector, context = document) =>
  context.querySelector(selector);
export const $$ = (selector, context = document) =>
  context.querySelectorAll(selector);

// Helper para mostrar/ocultar elementos
export function toggleVisibility(element, isVisible) {
  if (!element) return;
  if (isVisible) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

// Helper para actualizar texto de un elemento
export function setText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = text;
}
