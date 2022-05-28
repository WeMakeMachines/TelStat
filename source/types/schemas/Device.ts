import { DocumentType, modelOptions, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";

import UserSchema from "./User";

@modelOptions({ options: { customName: "devices" } })
export default class DeviceSchema {
  @prop({
    required: true,
    ref: () => UserSchema,
  })
  public owner!: Ref<UserSchema>;

  @prop({ required: true })
  public label!: string;

  @prop({ required: true })
  public topic!: string;

  @prop({ type: () => [mongoose.Schema.Types.Mixed] })
  telemetry?: object[];
}

export type DeviceType = DocumentType<DeviceSchema>;
