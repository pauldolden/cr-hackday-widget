import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Container } from "../styles/widgetStyles";
import { object, string, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Input,
  Select,
  ThemeProvider,
  crTheme,
  ButtonWithStates,
  Banner,
  Logo,
} from "@comicrelief/component-library";

enum Causes {
  CLIMATE_CHANGE = "Climate Change",
  UKRAINE_WARE = "War In Ukraine",
  LGBTQA = "LGBTQA+ Equality",
  MISC = "Misc",
}
const causes = Object.values(Causes);

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

const WidgetPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setIsFailure(false);
    setIsSuccess(false);
    setResponseMessage("");
    const isValid = await validationSchema.isValid(formData);

    if (isValid) {
      try {
        const res = await axios.post(process.env.GATSBY_API_URL!, formData);
        setResponseMessage(res.data.message);
        setIsLoading(false);

        if (res.status === 201) {
          return setIsSuccess(true);
        }
        setIsFailure(true);
      } catch (err) {
        const error = err as AxiosError;
        setIsFailure(true);
        setResponseMessage(error.message);
        setIsLoading(false);
      }
    } else {
      setIsFailure(true);
      setIsLoading(false);

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
    <ThemeProvider theme={crTheme}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo-wrapper">
            <Logo sizeMd="10rem" />
          </div>
          {fields.map((field) => (
            <>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.defaultValue}
                label={field.label}
                errorMsg={errors[field.name]?.message}
                {...register(field.name, { required: true })}
              />
            </>
          ))}

          <Select
            {...register("solve", { required: true })}
            defaultValue={causes[0]}
            label="What do you want to fix?"
            options={causes.map((cause) => ({
              value: cause,
              displayValue: cause,
            }))}
          />

          <ButtonWithStates
            disabled={isLoading}
            loading={isLoading}
            loadingText={"Saving the world..."}
          >
            Save The World!
          </ButtonWithStates>
          {(isSuccess || isFailure) && (
            <Banner backgroundColor={isSuccess ? "green" : "red"}>
              <span className="response-message">
                {responseMessage} &nbsp;
                {isSuccess && "🎉"}
                {isFailure && "😞"}
              </span>
            </Banner>
          )}
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default WidgetPage;
