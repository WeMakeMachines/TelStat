import { DocumentType, modelOptions, prop } from "@typegoose/typegoose";

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
}

export type UserType = DocumentType<UserSchema>;
