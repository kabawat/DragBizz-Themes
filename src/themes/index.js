import tempA from "./temp_A/index.js";
import tempB from "./temp_B/index.js";
import tempC from "./temp_C/index.js";
import tempD from "./temp_D/index.js";
import tempE from "./temp_E/index.js";
import tempF from "./temp_F/index.js";

export const themes = Object.freeze({
  [tempA.id]: tempA,
  [tempB.id]: tempB,
  [tempC.id]: tempC,
  [tempD.id]: tempD,
  [tempE.id]: tempE,
  [tempF.id]: tempF,
});

export function getTheme(id) {
  return themes[id] ?? null;
}
