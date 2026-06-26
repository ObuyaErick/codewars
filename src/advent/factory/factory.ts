import fs from "fs";
import path from "path";
import { Permutations } from "../permutation/permutations.js";

class Machine {
  indicatorLights: IndicatorLights;
  buttons: Button[];
  constructor(indicatorLights: IndicatorLights, buttons: Button[]) {
    this.indicatorLights = indicatorLights;
    this.buttons = buttons;
  }

  toString() {
    return this.indicatorLights.lights;
  }

  clone(): Machine {
    return new Machine(this.indicatorLights.clone(), [...this.buttons]);
  }
}

class Light {
  on: boolean;
  constructor(on: boolean) {
    this.on = on;
  }

  toggle() {
    this.on = !this.on;
  }

  get state() {
    return this.on ? "#" : ".";
  }

  static from(identity: string): Light {
    return new Light(identity === "#");
  }
}

class IndicatorLights {
  onState: Light[];
  lights: Light[];
  constructor(onState: Light[]) {
    this.onState = onState;
    this.lights = onState.map((_) => new Light(false));
  }

  get isOn() {
    return (
      this.onState.map((l) => l.state).join("") ===
      this.lights.map((l) => l.state).join("")
    );
  }

  press(buttons: Button[]) {
    for (let button of buttons) {
      for (let light of button.lights) {
        this.lights[light]?.toggle();
      }
    }
  }

  get show() {
    return this.lights.map((l) => l.state).join("");
  }

  get activeHash() {
    return this.onState.map((l) => l.state).join("");
  }

  clone(): IndicatorLights {
    return new IndicatorLights([...this.onState]);
  }
}

class Button {
  lights: number[];
  constructor(lights: number[]) {
    this.lights = lights;
  }

  get visual() {
    return `(${this.lights.join(",")})`;
  }
}

//const inputFilePath = path.join(import.meta.dirname, "indicators.test.txt");
const inputFilePath = path.join(import.meta.dirname, "indicators.txt");
const raw = fs.readFileSync(inputFilePath, "utf-8");
const rawLines = raw.split("\n");

const machines = rawLines.map((machineLine) => {
  const endOfIndicatorsIndex = machineLine.lastIndexOf("]");
  const endOfButtons = machineLine.indexOf("{");
  const indicators = machineLine
    .slice(1, endOfIndicatorsIndex)
    .split("")
    .map((id) => Light.from(id));
  const buttons = machineLine
    .slice(endOfIndicatorsIndex + 1, endOfButtons)
    .trim()
    .split(/\s+/)
    .map(
      (btnTuple) =>
        new Button(
          btnTuple
            .slice(1, btnTuple.length - 1)
            .split(",")
            .map((i) => Number(i)),
        ),
    );
  return new Machine(new IndicatorLights(indicators), buttons);
});

export default function run() {
  const presses: number[] = [];
  for (let machine of machines) {
    const buttonCombinations = Permutations.eagerCombinations(
      machine.buttons.length,
    ).map((buttonIndices) =>
      buttonIndices.map((buttonIndex) => machine.buttons[buttonIndex]!),
    );

    let possibleCombinations: Button[][] = [];
    for (let buttonCombination of buttonCombinations) {
      const machineClone = machine.clone();
      machineClone.indicatorLights.press(buttonCombination);
      if (
        machineClone.indicatorLights.show ==
        machineClone.indicatorLights.activeHash
      ) {
        possibleCombinations.push(buttonCombination);
      }
    }
    presses.push(Math.min(...possibleCombinations.map((c) => c.length)));
  }
  console.log(
    presses.reduce((acc, curr) => {
      return acc + curr;
    }, 0),
  );
}
