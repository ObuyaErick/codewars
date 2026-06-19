import fs from "fs";

class Machine {
  indicatorLights: IndicatorLights;
  buttons: Button[];
  constructor(indicatorLights: IndicatorLights, buttons: Button[]) {
    this.indicatorLights = indicatorLights;
    this.buttons = buttons;
  }
}

class IndicatorLights {
  onState: string[];
  lights: string[];
  constructor(onState: string[]) {
    this.onState = onState;
    this.lights = onState.map((_) => ".");
  }

  get isOn() {
    return this.onState.join("") === this.lights.join("");
  }
}

class Button {
  lights: number[];
  constructor(lights: number[]) {
    this.lights = lights;
  }
}

// const raw = fs.readFileSync("indicators.txt", "utf-8");
const raw = fs.readFileSync("indicators.test.txt", "utf-8");
const rawLines = raw.split("\n");

console.log(rawLines);
