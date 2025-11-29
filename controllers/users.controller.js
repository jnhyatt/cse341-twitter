import { db } from "../config/db.js";
import { userRequest } from "../validators/user.schema.js";
import { createUser as createUserService } from "../services/createUser.service.js";

export async function createUser(req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).send("Unauthorized: Please log in");
        }

        const { error } = userRequest.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await createUserService(req.body, req.user.id);
        res.status(201).send(`User ${req.user.id} created`);
    } catch (err) {
        // https://www.mongodb.com/docs/manual/reference/error-codes/ says 11000 is duplicate key error
        if (err.code === 11000) {
            return res.status(409).send("User already exists");
        }
        res.status(500).send(err);
    }
}

export async function updateUser(req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).send("Unauthorized: Please log in");
        }

        const id = req.params.id;
        if (id !== req.user.id) {
            return res.status(403).send("Forbidden: You can only modify your own resources");
        }

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
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).send("Unauthorized: Please log in");
        }

        const id = req.params.id;
        if (id !== req.user.id) {
            return res.status(403).send("Forbidden: You can only modify your own resources");
        }

        const result = await db.collection("users").deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted");
    } catch (err) {
        res.status(500).send(err);
    }
}
