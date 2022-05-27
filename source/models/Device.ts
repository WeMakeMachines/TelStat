import { getModelForClass } from "@typegoose/typegoose";

import Devices from "../types/schemas/Device";

export default getModelForClass(Devices);
