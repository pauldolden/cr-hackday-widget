import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Button,
  Container,
  ErrorMessage,
  Field,
  logoSrc,
  Logo,
  ResponseBanner,
} from "../styles/formStyles";
import { object, string, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useState } from "react";
import axios, { AxiosError } from "axios";

enum Causes {
  CLIMATE_CHANGE = "Climate Change",
  UKRAINE_WARE = "War In Ukraine",
  LGBTQA = "LGBTQA+ Equality",
  MISC = "Misc",
}

interface FormField {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  defaultValue?: string;
}

const validationSchema = object().shape({
  firstName: string()
    .required("First Name is a required field.")
    .min(2, "Please enter your full first name.")
    .matches(
      /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u,
      "This field must only contain letters."
    ),
  secondName: string()
    .required("Second Name is a required field.")
    .min(2, "Please enter your full second name.")
    .matches(
      /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u,
      "This field must only contain letters."
    ),
  email: string()
    .required("Email is a required field.")
    .email("Email must be valid.")
    .max(64, "Email can be no longer than 64 characters"),
  solve: mixed<Causes>()
    .oneOf(Object.values(Causes))
    .required("This is a required field."),
});

const IndexPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    shouldFocusError: true,
  });

  const onSubmit = async (formData: FieldValues) => {
    setIsFailure(false);
    setIsSuccess(false);
    setResponseMessage("");
    const isValid = await validationSchema.isValid(formData);

    if (isValid) {
      try {
        const res = await axios.post(process.env.GATSBY_API_URL!, formData);
        setResponseMessage(res.data.message);

        if (res.status === 201) {
          return setIsSuccess(true);
        }
        setIsFailure(true);
      } catch (err) {
        const error = err as AxiosError;
        setIsFailure(true);
        setResponseMessage(error.message);
      }
    } else {
      setIsFailure(true);
      setResponseMessage(
        "There seems to be a problem submitting form, please check all the information is correct."
      );
    }
  };

  const fields: FormField[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      defaultValue: "John",
    },
    {
      name: "secondName",
      label: "Second Name",
      type: "text",
      defaultValue: "Smith",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      defaultValue: "J.Smith@example.com",
    },
  ];

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo src={logoSrc} />
        {fields.map((field) => (
          <Field key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.name}
              defaultValue={field.defaultValue}
              {...register(field.name, { required: true })}
            />
            {errors[field.name] && (
              <ErrorMessage>
                {errors[field.name]?.message as ReactNode}
              </ErrorMessage>
            )}
          </Field>
        ))}
        <Field>
          <label>What do you want to fix?</label>
          <select {...register("solve", { required: true })}>
            {Object.values(Causes).map((cause) => (
              <option key={cause}>{cause}</option>
            ))}
          </select>
        </Field>
        <Button>Save The World!</Button>
        <ResponseBanner success={isSuccess} show={isSuccess || isFailure}>
          <span>{responseMessage} &nbsp;</span>
          <span>{isSuccess && "🎉"}</span>
          <span>{isFailure && "😞"}</span>
        </ResponseBanner>
      </form>
    </Container>
  );
};

export default IndexPage;
