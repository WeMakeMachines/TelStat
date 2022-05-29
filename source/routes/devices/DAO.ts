import Devices from "../../models/Device";
import { DeviceType } from "../../types/schemas/Device";

export default class DevicesDAO {
  public static async getById(deviceId: string): Promise<DeviceType | null> {
    return Devices.findById(deviceId).select(["label", "telemetry"]).lean();
  }

  public static async getOwner(
    deviceId: string
  ): Promise<Pick<DeviceType, "owner"> | null> {
    return Devices.findById(deviceId).lean().select("owner");
  }

  public static async getAll() {
    return Devices.find().lean().select("-telemetry");
  }
}
