// Import all modules
import { initLoader } from "./modules/loader.js";
import {
  initGlobalProgressBar,
  initNavScroll,
  initRevealOnScroll,
  initHeroParallax,
  initSmoothScroll,
} from "./modules/scrollEffects.js";
import { initCountdown } from "./modules/countdown.js";
import { initTimeline } from "./modules/timeline.js";
import { initRSVP } from "./modules/rsvp.js";

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initLoader();
  initGlobalProgressBar();
  initNavScroll();
  initRevealOnScroll();
  initHeroParallax();
  initSmoothScroll();
  initCountdown();
  initTimeline();
  initRSVP();
});

