import fs from "fs";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/oauth.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

// Write swaggerSpecs to a JSON file. I set up swagger-jsdoc before I realized the assignment needs
// a static JSON file for the OpenAPI spec, but we're still going to use swagger-jsdoc to generate
// it for us so we don't have to write it by hand.
fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpecs, null, 2));

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get("/me", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "not logged in" });
    res.json(req.user);
});

export default app;
