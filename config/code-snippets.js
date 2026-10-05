import {blocks as project0} from "./code-projects/ren-path-of-destiny.js";
import {blocks as project1} from "./code-projects/digging-game.js";
import {blocks as project2} from "./code-projects/ruin-runners.js";
import {blocks as project3} from "./code-projects/word-search.js";
import {blocks as project4} from "./code-projects/tower-of-hanoi.js";
import {blocks as project5} from "./code-projects/ball-bashers.js";
import {blocks as project6} from "./code-projects/two-player-tag.js";
import {blocks as project7} from "./code-projects/think-try-treasure.js";
import {blocks as project8} from "./code-projects/lost-trance.js";
import {blocks as project9} from "./code-projects/ben-3.js";
import {blocks as project10} from "./code-projects/bubble-parkour.js";
// Source excerpts live in config/code-projects. See SOURCE-CONTENT-GUIDE.md.
export const codeSnippetSettings = {
  enabled: true,
  title: "Code walkthroughs",
  // Per group: layout: "walkthrough" (original) or "stacked" (code, then explanation).
  stacked: {
    enabled: true, // false temporarily restores the original walkthrough for stacked groups
    maxHeight: "24rem", // maximum code area height; short excerpts shrink to fit
    maxViewportHeight: "60svh", // also cap height to the screen; use "none" to disable
    fontSize: "0.875rem", // minimum 0.875rem is enforced for readability
    lineHeight: "1.7",
    gap: "1.5rem",
    showLineNumbers: true,
    showCopyButton: true,
    showLanguage: true
  },
  columns: 3,
  minCardWidth: 260, // Fewer columns are used when needed to keep code readable.
  mobileMaxWidth: 760,
  explanationPosition: "right", // "left" or "right"; stacks below on mobile
  explanationWidth: "15rem",
  explanationStackBelow: 780, // Available group width, including contact-panel reflow.
  fontSize: "0.75rem",
  lineHeight: "1.8",
  arrowColor: "#efbc61",
  highlightColor: "#efbc6126",
  showConnections: true,
  arrowClearance: 10, arrowBendPenalty: 4,
  avoidArrowOverlap: true, arrowLaneSpacing: 6, arrowMaxDetour: 48, arrowPortSpread: 6,
};

// Every project has its own editable block array.
export const projectCodeSnippets = {
  "ren-path-of-destiny": project0,
  "digging-game": project1,
  "ruin-runners": project2,
  "word-search": project3,
  "tower-of-hanoi": project4,
  "ball-bashers": project5,
  "two-player-tag": project6,
  "think-try-treasure": project7,
  "lost-trance": project8,
  "ben-3": project9,
  "bubble-parkour": project10,
};
