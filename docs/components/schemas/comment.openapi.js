import j2s from "joi-to-swagger";
import {
    commentRequest as commentRequestJoi,
    commentResponse as commentResponseJoi,
} from "../../../validators/comment.schema.js";

const { swagger: commentRequest } = j2s(commentRequestJoi);
const { swagger: commentResponse } = j2s(commentResponseJoi);

export { commentRequest, commentResponse };
