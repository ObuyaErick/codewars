import type Device from "./device.js";

export class ServerRack {
  static connections: Record<string, Device> = {};

  static init(devices: Device[]) {
    devices.forEach((device) => {
      ServerRack.connections[device.id] = device;
    });
  }

  static findDevice(deviceId: string): Device {
    return ServerRack.connections[deviceId];
  }
}
