import { db } from "../config/db.js";
import { ObjectId } from "mongodb";
import { userRequest } from "../validators/user.schema.js";
import { createUser as createUserService } from "../services/createUser.service.js";

export async function createUser(req, res) {
    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader?.startsWith("Bearer ")) {
        //     return res.status(401).send("Unauthorized");
        // }
        // const token = authHeader.split(" ")[1];
        // const oauthUser = await verifyToken(token);

        const { error } = userRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await createUserService(req.body, "oauthplaceholder123");
        res.status(201).send("User oauthplaceholder123 created");
    } catch (err) {
        // https://www.mongodb.com/docs/manual/reference/error-codes/ says 11000 is duplicate key error
        if (err.code === 11000) {
            return res.status(409).send("User already exists");
        }
        res.status(500).send(err);
    }
}

export async function updateUser(req, res) {
    const id = req.params.id;
    try {
        const { error } = userRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const result = await db.collection("users").updateOne({ _id: id }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).send("User not found");
        }

        res.send("User updated");
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await db.collection("users").findOne({ _id: id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const result = await db.collection("users").deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted");
    } catch (err) {
        res.status(500).send(err);
    }
}
