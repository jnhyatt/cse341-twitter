import Joi from "joi";

const userRequest = Joi.object({
    handle: Joi.string().alphanum().min(3).max(30).required(),
});

const userResponse = Joi.object({
    // oauth id
    _id: Joi.string().alphanum().required(),
    handle: Joi.string().alphanum().min(3).max(30).required(),
    bookmarkedPosts: Joi.array().items(Joi.string().hex().length(24)).required(),
    following: Joi.array().items(Joi.string().alphanum()).required(),
});

export { userRequest, userResponse };
