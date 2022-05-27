import { Request } from "express";
import { JwtPayload as _JwtPayload } from "jsonwebtoken";

import { UserType } from "./schemas/User";

export interface JwtPayload extends _JwtPayload {
  sub: string;
  iat: number;
}

export interface RequestWithUser extends Request {
  user?: UserType;
}
