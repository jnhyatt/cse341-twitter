import express from "express";
import { createComment, updateComment, getCommentById, deleteComment } from "../controllers/comments.controller.js";

const router = express.Router();

/**
 * @openapi
 * /comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment
 *     description: Creates a new comment on a specific post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentRequest'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Comment created"
 *       400:
 *         description: Validation error (content too long, invalid post ID)
 *       409:
 *         description: Comment already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", createComment);

/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update an existing comment by ID
 *     description: Updates a comment's content and/or post reference using its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentRequest'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Comment updated"
 *       400:
 *         description: Validation error
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateComment);

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get a comment by ID
 *     description: Retrieves a single comment by its unique ID, including metadata like author and likes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getCommentById);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment by ID
 *     description: Permanently deletes a comment from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Comment deleted"
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteComment);

export default router;
