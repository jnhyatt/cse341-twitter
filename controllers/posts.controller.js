import { db } from "../config/db.js";
import { ObjectId } from "mongodb";
import { postRequest } from "../validators/post.schema.js";
import { createPost as createPostService } from "../services/createPost.service.js";

export async function createPost(req, res) {
    try {
        const { error } = postRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await createPostService(req.body, "oauthplaceholder123");
        res.status(201).send("Post created");
    } catch (err) {
        // https://www.mongodb.com/docs/manual/reference/error-codes/ says 11000 is duplicate key error
        if (err.code === 11000) {
            return res.status(409).send("Post already exists");
        }
        res.status(500).send(err);
    }
}

export async function updatePost(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const { error } = postRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const result = await db.collection("posts").updateOne({ _id: id }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).send("Post not found");
        }

        res.send("Post updated");
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getPostById(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const post = await db.collection("posts").findOne({ _id: id });
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.json(post);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deletePost(req, res) {
    const id = new ObjectId(req.params.id);
    try {
        const result = await db.collection("posts").deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send("Post not found");
        }

        res.send("Post deleted");
    } catch (err) {
        res.status(500).send(err);
    }
}
