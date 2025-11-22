import j2s from "joi-to-swagger";
import { userRequest as userRequestJoi, userResponse as userResponseJoi } from "../../../validators/user.schema.js";

const { swagger: userRequest } = j2s(userRequestJoi);
const { swagger: userResponse } = j2s(userResponseJoi);

export { userRequest, userResponse };
