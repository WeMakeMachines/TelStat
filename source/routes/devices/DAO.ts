import Devices from "../../models/Device";
import { DeviceType } from "../../types/schemas/Device";

class DevicesDAO_Error extends Error {}

export default class DevicesDAO {
  public static async getDevicesByUserId(
    userId: string
  ): Promise<DeviceType[]> {
    return Devices.find({ owner: userId }).select(["label"]).lean();
  }

  public static async getDeviceById(
    deviceId: string
  ): Promise<DeviceType | null> {
    return Devices.findById(deviceId).select(["label", "telemetry"]).lean();
  }

  public static async getDeviceOwner(
    deviceId: string
  ): Promise<Pick<DeviceType, "owner"> | null> {
    return Devices.findById(deviceId).lean().select("owner");
  }
}
