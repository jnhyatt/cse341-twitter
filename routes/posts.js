import express from "express";
import { createPost, updatePost, getPostById, deletePost, likePost } from "../controllers/posts.controller.js";
import { requirePostOwnership, requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * @openapi
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     description: Creates a new post with content and optional reply reference
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post created"
 *       400:
 *         description: Validation error (content too long, invalid replyTo ID)
 *       409:
 *         description: Post already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", createPost);

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update an existing post by ID
 *     description: Updates a post's content and/or reply reference using its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRequest'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post updated"
 *       400:
 *         description: Validation error
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", requirePostOwnership, updatePost);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get a post by ID
 *     description: Retrieves a single post by its unique ID, including metadata like author, likes, and comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getPostById);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post by ID
 *     description: Permanently deletes a post from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post deleted"
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", requirePostOwnership, deletePost);

router.post("/:id/like", requireAuth, likePost);

export default router;
