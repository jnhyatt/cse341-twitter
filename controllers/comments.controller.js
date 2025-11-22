import { db } from "../config/db.js";
import { ObjectId } from "mongodb";
import { commentRequest } from "../validators/comment.schema.js";
import { createComment as createCommentService } from "../services/createComment.service.js";

export async function createComment(req, res) {
    try {
        const { error } = commentRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await createCommentService(req.body, "oauthplaceholder123");
        res.status(201).send("Comment created");
    } catch (err) {
        // https://www.mongodb.com/docs/manual/reference/error-codes/ says 11000 is duplicate key error
        if (err.code === 11000) {
            return res.status(409).send("Comment already exists");
        }
        res.status(500).send(err);
    }
}

export async function updateComment(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const { error } = commentRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const result = await db.collection("comments").updateOne({ _id: id }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).send("Comment not found");
        }

        res.send("Comment updated");
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getCommentById(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const comment = await db.collection("comments").findOne({ _id: id });
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        res.json(comment);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteComment(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const result = await db.collection("comments").deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send("Comment not found");
        }

        res.send("Comment deleted");
    } catch (err) {
        res.status(500).send(err);
    }
}
