export function initLoader() {
  const loader = document.getElementById("loader");
  const hero = document.querySelector(".hero");

  if (!loader || !hero) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      hero.classList.add("loaded");
    }, 2200);
  });
}
