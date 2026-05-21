import { TIMELINE_DATA } from "../config/constants.js";
import { $, $$ } from "../utils/domHelpers.js";

let currentSlide = 0;
let track = null;
let dotsContainer = null;
let tlProgressBar = null;
let totalSlides = TIMELINE_DATA.length;

function generateTimelineSlides() {
  track = document.getElementById("timeline-track");
  dotsContainer = document.getElementById("tl-dots");
  tlProgressBar = document.getElementById("tl-progress-bar");

  if (!track || !dotsContainer) return;

  TIMELINE_DATA.forEach((item, i) => {
    // Cambiar la URL de Picsum por la imagen local
    const imagePath = `assets/images/timeline/age-${item.age}.jpg`;
    // O si usas año: `assets/images/timeline/${item.year}.jpg`
    
    const slide = document.createElement('div');
    slide.className = 'timeline-year';
    slide.innerHTML = `
      <div class="timeline-giant-year">${item.year}</div>
      <div class="polaroid-card">
        <div class="polaroid-image">
          <img src="${imagePath}" alt="Año ${item.age}" loading="lazy" onerror="this.src='https://picsum.photos/seed/fallback/600/800.jpg'">
        </div>
        <div class="polaroid-caption">
          <span class="age">${item.age} año${item.age > 1 ? 's' : ''}</span>
          <p>${item.caption}</p>
        </div>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "timeline-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

export function goToSlide(index) {
  if (!track || !tlProgressBar) return;
  if (index < 0 || index >= totalSlides) return;

  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}vw)`;

  // Update Dots
  $$(".timeline-dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });

  // Update Timeline Progress Bar
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  tlProgressBar.style.width = progress + "%";
}

function initNavigation() {
  const prevBtn = document.getElementById("tl-prev");
  const nextBtn = document.getElementById("tl-next");

  if (prevBtn)
    prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
  if (nextBtn)
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
}

function initKeyboardSupport() {
  document.addEventListener("keydown", (e) => {
    const tlSection = document.getElementById("timeline");
    if (!tlSection) return;

    const rect = tlSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
      if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
    }
  });
}

function initTouchSupport() {
  if (!track) return;
  let touchStartX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
    },
    { passive: true },
  );
}

export function initTimeline() {
  generateTimelineSlides();
  initNavigation();
  initKeyboardSupport();
  initTouchSupport();
}
