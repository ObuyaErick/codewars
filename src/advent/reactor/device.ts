export default class Device {
  id: string;
  outputs: string[];
  constructor(id: string, outputs: string[]) {
    this.id = id;
    this.outputs = outputs;
  }

  static rootDeviceId = "you";

  static build(config: string): Device {
    const indexOfSeparator = config.indexOf(":");

    return new Device(
      config.slice(0, indexOfSeparator),
      config
        .slice(indexOfSeparator + 1)
        .trim()
        .split(/\s+/)
    );
  }
}
