import { getModelForClass } from "@typegoose/typegoose";

import Users from "../types/schemas/User";

export default getModelForClass(Users);
