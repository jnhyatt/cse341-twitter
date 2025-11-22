import j2s from "joi-to-swagger";
import { postRequest as postRequestJoi, postResponse as postResponseJoi } from "../../../validators/post.schema.js";

const { swagger: postRequest } = j2s(postRequestJoi);
const { swagger: postResponse } = j2s(postResponseJoi);

export { postRequest, postResponse };
