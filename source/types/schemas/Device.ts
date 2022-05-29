import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

import UserSchema from "./User";

@modelOptions({
  options: { customName: "devices", allowMixed: Severity.ALLOW },
})
export default class DeviceSchema {
  @prop({
    required: true,
    ref: () => UserSchema,
  })
  public owner!: Ref<UserSchema>;

  @prop({ required: true })
  public label!: string;

  @prop({ type: () => [mongoose.Schema.Types.Mixed] })
  telemetry?: object[];
}

export type DeviceType = DocumentType<DeviceSchema>;
