import { DocumentType, modelOptions, prop, Ref } from "@typegoose/typegoose";

import PublisherSchema from "./Publisher";

@modelOptions({
  options: { customName: "topics" },
})
export default class TopicSchema {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({
    ref: () => PublisherSchema,
    default: [],
  })
  public publishers!: Ref<PublisherSchema>[];
}

export type TopicType = DocumentType<TopicSchema>;
