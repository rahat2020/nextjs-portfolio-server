import AppError from "../utils/AppError.js";

/**
 * Zod validation middleware factory.
 * Validates req.body against a given Zod schema.
 * Passes cleaned data forward via req.body.
 */
const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const messages = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new AppError(`Validation error — ${messages.join("; ")}`, 400);
  }

  // Replace body with cleaned/parsed data
  req.body = result.data;
  next();
};

export default validate;
