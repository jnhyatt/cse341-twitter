import { db } from "../config/db.js";
import { ObjectId } from "mongodb";

export function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send("Unauthorized: Please log in");
}

export async function requirePostOwnership(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Unauthorized: Please log in");
    }

    try {
        const post = await db.collection("posts").findOne({ _id: new ObjectId(req.params.id) });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.authorId !== req.user.id) {
            return res.status(403).send("Forbidden: You can only modify your own posts");
        }

        next();
    } catch (err) {
        res.status(500).send("Error verifying post ownership");
    }
}

export async function requireCommentOwnership(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Unauthorized: Please log in");
    }

    try {
        const commentId = new ObjectId(req.params.id);
        const comment = await db.collection("comments").findOne({ _id: commentId });

        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        if (comment.authorId !== req.user.id) {
            return res.status(403).send("Forbidden: You can only modify your own comments");
        }

        next();
    } catch (err) {
        res.status(500).send("Error verifying comment ownership");
    }
}
