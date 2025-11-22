import Joi from "joi";

const commentRequest = Joi.object({
    post: Joi.string().hex().length(24).required(),
    content: Joi.string().max(280).required(),
});

const commentResponse = Joi.object({
    id: Joi.string().hex().length(24).required(),
    content: Joi.string().max(280).required(),
    post: Joi.string().hex().length(24).required(),
    authorId: Joi.string().alphanum().required(),
    likes: Joi.array().items(Joi.string().alphanum()).required(),
    createdAt: Joi.date().required(),
    lastModified: Joi.date().required(),
});

export { commentRequest, commentResponse };
