import { DocumentType, modelOptions, prop, Ref } from "@typegoose/typegoose";

import DeviceSchema from "./Device";

@modelOptions({
  options: { customName: "topics" },
})
export default class TopicSchema {
  @prop({ required: true })
  public name!: string;

  @prop({
    ref: () => DeviceSchema,
  })
  public devices?: Ref<TopicSchema>[];
}

export type TopicType = DocumentType<TopicSchema>;
