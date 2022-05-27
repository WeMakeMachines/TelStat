import { DocumentType, modelOptions, prop, Ref } from "@typegoose/typegoose";

import DeviceSchema from "./Device";

@modelOptions({ options: { customName: "users" } })
export default class UserSchema {
  @prop({ required: true })
  public userName!: string;

  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop({ required: true })
  public hash!: string;

  @prop({
    ref: () => DeviceSchema,
  })
  public devices?: Ref<DeviceSchema>;
}

export type UserType = DocumentType<UserSchema>;
