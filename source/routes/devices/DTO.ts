import Devices from "../../models/Device";

class DevicesDTO_Error extends Error {}

export default class DevicesDTO {
  public static async createDevice({
    userId,
    label,
  }: {
    userId: string;
    label: string;
  }) {
    try {
      await Devices.create({
        owner: userId,
        label,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async updateDevice({
    deviceId,
    label,
  }: {
    deviceId: string;
    label: string;
  }) {
    try {
      await Devices.findByIdAndUpdate(deviceId, {
        label,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async deleteDevice({ deviceId }: { deviceId: string }) {
    try {
      await Devices.findByIdAndDelete(deviceId);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }
}
