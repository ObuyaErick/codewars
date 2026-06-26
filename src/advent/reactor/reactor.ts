import readInput from "../../assets/read-input.js";
import Device from "./device.js";
import { ServerRack } from "./server-rack.js";
import { Tracer } from "./tracer.js";

export default function () {
  console.log("--- Day 11: Reactor ---\n");
  const devices = readInput("2025/reactor/devices.txt")
    // const devices = readInput("2025/reactor/devices.test.txt")
    // const devices = readInput("2025/reactor/devices.part2.test.txt")
    .split("\n")
    .map((deviceConfig) => Device.build(deviceConfig));
  ServerRack.init(devices);

  // Device.rootDeviceId = "svr";

  // --------------------------------------------------
  const rootDevice = ServerRack.findDevice(Device.rootDeviceId);
  const rootTracer = new Tracer(rootDevice);

  let arrivers = 0;
  const findWay = (tracer: Tracer) => {
    const nextTracers = tracer.advance();
    if (nextTracers.length === 0) {
      arrivers++;
      return;
    }

    for (let tr of nextTracers) {
      findWay(tr);
    }
  };

  findWay(rootTracer);

  console.log(arrivers);
}
