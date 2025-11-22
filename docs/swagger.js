import swaggerJSDoc from "swagger-jsdoc";
import { userRequest, userResponse } from "./components/schemas/user.openapi.js";
import { postRequest, postResponse } from "./components/schemas/post.openapi.js";
import { commentRequest, commentResponse } from "./components/schemas/comment.openapi.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Twitter clone (Y)",
            version: "1.0.0",
        },
        components: {
            schemas: {
                UserRequest: userRequest,
                UserResponse: userResponse,
                PostRequest: postRequest,
                PostResponse: postResponse,
                CommentRequest: commentRequest,
                CommentResponse: commentResponse,
            },
        },
    },
    apis: ["./routes/*.js"],
};

export default swaggerJSDoc(options);
