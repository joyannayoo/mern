const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2-30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
