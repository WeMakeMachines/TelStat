import { DocumentType, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ options: { customName: "devices" } })
export default class DeviceSchema {
  @prop({ required: true })
  public label!: string;

  @prop({ required: true })
  public topic!: string;

  @prop({ type: () => [mongoose.Schema.Types.Mixed] })
  telemetry?: object[];
}

export type DeviceType = DocumentType<DeviceSchema>;
