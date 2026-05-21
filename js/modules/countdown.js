import { EVENT_DATE } from "../config/constants.js";
import { setText } from "../utils/domHelpers.js";

let countdownInterval = null;

function updateCountdown() {
  const now = new Date();
  let diff = EVENT_DATE - now;

  if (diff < 0) diff = 0;

  // Calcula días, horas, minutos y segundos
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  // Actualiza los elementos del HTML
  setText("cd-days", String(days).padStart(2, "0"));
  setText("cd-hours", String(hours).padStart(2, "0"));
  setText("cd-mins", String(mins).padStart(2, "0"));
  setText("cd-secs", String(secs).padStart(2, "0"));
}

export function initCountdown() {
  updateCountdown();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Para limpiar el intervalo si es necesario
export function destroyCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}