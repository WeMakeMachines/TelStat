import Topics from "../../models/Topic";

export default class TopicsDAO {
  public static async getById(id: string) {
    return Topics.findById(id).lean().populate("publishers", ["label"]);
  }

  public static async getAll() {
    return Topics.find().lean();
  }
}
