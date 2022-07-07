import React from "react";
import { HTMLInputTypes, OtherHTMLFormControls } from "../enums/HTMLInputTypes";
import { FormField } from "../types/FormField";
import {
  Select,
  Input,
  TextArea,
  ButtonWithStates,
  Logo,
  /* @ts-ignore */
} from "@comicrelief/component-library";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createValidationSchema } from "../helpers/createValidationSchma";

interface FormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const Form = ({ fields, onSubmit, isLoading }: FormProps) => {
  const validationSchema = createValidationSchema(fields);

  const _onSubmit = (data: FieldValues) => {
    onSubmit(data) 
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    shouldFocusError: true,
  });

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div className="logo-wrapper">
        <Logo sizeMd="10rem" />
      </div>
      {fields.map((field) =>
        Object.values(HTMLInputTypes).includes(field.type as HTMLInputTypes) ? (
          <Input
            key={field.name}
            id={field.name}
            type={field.type}
            placeholder={field.defaultValue}
            label={field.label}
            errorMsg={errors[field.name]?.message}
            {...register(field.name, { required: true })}
          />
        ) : Object.values(OtherHTMLFormControls).includes(
            field.type as OtherHTMLFormControls
          ) ? (
          <>
            {field.type === OtherHTMLFormControls.TEXT_AREA && (
              <TextArea
                key={field.name}
                id={field.name}
                placeholder={field.defaultValue}
                label={field.label}
                errorMsg={errors[field.name]?.message}
                {...register(field.name, { required: true })}
              />
            )}
            {field.type === OtherHTMLFormControls.SELECT && (
              <Select
                key={field.name}
                id={field.name}
                placeholder={field.defaultValue}
                label={field.label}
                errorMsg={errors[field.name]?.message}
                options={field.selectOptions!.map((cause) => ({
                  value: cause,
                  displayValue: cause,
                }))}
                {...register(field.name, { required: true })}
              />
            )}
          </>
        ) : null
      )}
      <ButtonWithStates
        disabled={isLoading}
        loading={isLoading}
        loadingText={"Saving the world..."}
      >
        Save The World!
      </ButtonWithStates>
    </form>
  );
};
