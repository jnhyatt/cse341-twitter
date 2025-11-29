import { db } from "../config/db.js";

export async function createUser(handle, oauthId) {
    const newUser = {
        _id: oauthId,
        handle: handle,
        bookmarkedPosts: [],
        following: [],
    };
    await db.collection("users").insertOne(newUser);
}
