import Device from "./device.js";
import { ServerRack } from "./server-rack.js";

export class Tracer {
  device: Device;
  constructor(device: Device) {
    this.device = device;
  }

  advance(): Tracer[] {
    const tracers: Tracer[] = [];
    for (let i = 0; i < this.device.outputs.length; i++) {
      const deviceId = this.device.outputs[i];
      if (!(deviceId === "out" || deviceId === Device.rootDeviceId)) {
        tracers.push(new Tracer(ServerRack.findDevice(deviceId)));
      }
    }
    return tracers;
  }
}
