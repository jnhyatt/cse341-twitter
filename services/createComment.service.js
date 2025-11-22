import { db } from "../config/db.js";

export async function createComment(req, oauthId) {
    const newComment = {
        content: req.content,
        post: req.post,
        authorId: oauthId,
        likes: [],
        createdAt: new Date(),
        lastModified: new Date(),
    };
    await db.collection("comments").insertOne(newComment);
}
