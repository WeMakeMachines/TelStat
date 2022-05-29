import Devices from "../../models/Device";

export default class DevicesDTO {
  public static async create({
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

  public static async rename({
    deviceId,
    name,
  }: {
    deviceId: string;
    name: string;
  }) {
    try {
      await Devices.findByIdAndUpdate(deviceId, {
        name,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async delete(deviceId: string) {
    try {
      await Devices.findByIdAndDelete(deviceId);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }
}
