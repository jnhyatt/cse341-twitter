import Joi from "joi";

const postRequest = Joi.object({
    content: Joi.string().max(280).required(),
    replyTo: Joi.string().hex().length(24).optional(), // MongoDB ObjectId of the post being replied to
});

const postResponse = Joi.object({
    id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
    content: Joi.string().max(280).required(),
    replyTo: Joi.string().hex().length(24).optional(), // MongoDB ObjectId of the post being replied to
    authorId: Joi.string().alphanum().required(), // User's OAuth ID
    likes: Joi.array().items(Joi.string().alphanum()).required(), // Array of User OAuth IDs
    comments: Joi.array().items(Joi.string().hex().length(24)).required(), // Array of Comment MongoDB ObjectIds
    createdAt: Joi.date().required(),
    lastModified: Joi.date().required(),
});

export {
    postRequest,
    postResponse
};
