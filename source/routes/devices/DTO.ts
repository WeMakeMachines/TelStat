import Devices from "../../models/Device";

class DevicesDTO_Error extends Error {}

export default class DevicesDTO {
  public static async createDevice({
    userId,
    label,
    topic,
  }: {
    userId: string;
    label: string;
    topic: string;
  }) {
    try {
      await Devices.create({
        owner: userId,
        label,
        topic,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async updateDevice({
    deviceId,
    label,
    topic,
  }: {
    deviceId: string;
    label: string;
    topic: string;
  }) {
    try {
      await Devices.findByIdAndUpdate(deviceId, {
        label,
        topic,
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
