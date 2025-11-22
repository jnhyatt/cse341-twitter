import { db } from "../config/db.js";

export async function createUser(req, oauthId) {
    const newUser = {
        _id: oauthId,
        handle: req.handle,
        bookmarkedPosts: [],
        following: [],
    };
    await db.collection("users").insertOne(newUser);
}
