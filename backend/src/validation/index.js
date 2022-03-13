import { body, validationResult } from "express-validator";
export const rankingValidation = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Nombre debe ser al menos de 3 carácteres")
      .trim()
      .escape(),
    body("score")
      .isNumeric()
      .trim()
      .escape()
      .withMessage("El score debe ser un número"),
    body("time")
      .exists()
      .withMessage("avatar es requerido")
      .isString()
      .withMessage("Debe ser un texto"),
    body("avatar")
      .exists()
      .withMessage("avatar es requerido")
      .isString()
      .withMessage("Debe ser un texto"),
  ];
};

export const validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  console.log(errors);
  console.log(extractedErrors);
  return res.status(422).json({
    msg: "La informacion proporcionada no es la correcto",
    errors: extractedErrors,
  });
};
