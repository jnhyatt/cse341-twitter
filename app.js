import fs from "fs";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";

// Write swaggerSpecs to a JSON file. I set up swagger-jsdoc before I realized the assignment needs
// a static JSON file for the OpenAPI spec, but we're still going to use swagger-jsdoc to generate
// it for us so we don't have to write it by hand.
fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpecs, null, 2));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
