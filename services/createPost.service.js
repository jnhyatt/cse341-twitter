import { db } from "../config/db.js";

export async function createPost(req, oauthId) {
    const newPost = {
        content: req.content,
        replyTo: req.replyTo || null,
        authorId: oauthId,
        likes: [],
        comments: [],
        createdAt: new Date(),
        lastModified: new Date(),
    };
    await db.collection("posts").insertOne(newPost);
}
