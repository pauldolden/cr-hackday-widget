import { object } from "yup";
import { FormField } from "../types/FormField";

export const createValidationSchema = (fields: FormField[]) => {
  const validationFields = fields.reduce((acc, current) => {
    return { ...acc, [current.name]: current.validation };
  }, {});

  const validationSchema = object().shape({
    ...validationFields,
  });

  return validationSchema;
};
