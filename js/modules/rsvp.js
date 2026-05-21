import { $ } from "../utils/domHelpers.js";

let toastTimeout = null;

function showToast(message, duration = 3500) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), duration);
}

function validateForm(name, attendance) {
  if (!name) {
    showToast("Por favor, ingresa tu nombre.");
    return false;
  }
  if (!attendance) {
    showToast("Por favor, confirma tu asistencia.");
    return false;
  }
  return true;
}

function resetForm(form) {
  form.reset();
}

export function initRSVP() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked');

    if (!validateForm(name, attendance)) return;

    const btn = form.querySelector(".submit-btn");
    const originalText = btn.textContent;
    btn.textContent = "Confirmando...";
    btn.disabled = true;

    // Simular envío (aquí puedes agregar fetch real a backend)
    setTimeout(() => {
      if (attendance.value === "yes") {
        showToast(`🎉 ¡Gracias, ${name}! Te esperamos con ilusión.`);
      } else {
        showToast(`Te extrañaremos, ${name}. ¡Hasta la próxima! 💕`);
      }
      btn.textContent = originalText;
      btn.disabled = false;
      resetForm(form);
    }, 1500);
  });
}
