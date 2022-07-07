import * as React from "react";
import { string } from "yup";

import {
  ThemeProvider,
  crTheme,
  // @ts-ignore
} from "@comicrelief/component-library";
import { FormField } from "../types/FormField";
import { Container } from "../styles/widget.styles";
import { HTMLInputTypes, OtherHTMLFormControls } from "../enums/HTMLInputTypes";
import { Form } from "../components/Form";
import { useState } from "react";

const fields: FormField[] = [
  {
    name: "campaignShortCode",
    label: "Campaign Short Code",
    type: HTMLInputTypes.TEXT,
    defaultValue: "SRCW22",
    validation: string().required("Campaign Short Code is required"),
  },
  {
    name: "templateName",
    label: "Template Name",
    type: HTMLInputTypes.TEXT,
    defaultValue: "srcw22_fsu_justgiving_reminder_general",
    validation: string().required("Template Name is required"),
  },
  {
    name: "from",
    label: "From",
    type: HTMLInputTypes.TEXT,
    defaultValue: "Comic Relief <no-reply@comicrelief.com>",
    validation: string().required("From is required"),
  },
  {
    name: "replyTo",
    label: "Reply To",
    type: HTMLInputTypes.TEXT,
    defaultValue: "fundraising@comicrelief.com",
    validation: string().required("Reply To is required"),
  },
  {
    name: "subject",
    label: "Subject",
    type: HTMLInputTypes.TEXT,
    defaultValue: "SRCW22 JustGiving Reminder",
    validation: string().required("Subject is required"),
  },
  {
    name: "header",
    label: "Header",
    type: HTMLInputTypes.TEXT,
    defaultValue: "This is a header",
    validation: string().required("Body is required"),
  },
  {
    name: "body",
    label: "Body",
    type: OtherHTMLFormControls.TEXT_AREA,
    defaultValue: "SRCW22 JustGiving Reminder",
    validation: string().required("Body is required"),
  },
  {
    name: "body",
    label: "Body",
    type: HTMLInputTypes.NUMBER,
    defaultValue: "SRCW22 JustGiving Reminder",
    validation: string().required("Body is required"),
  },
];

const form = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <ThemeProvider theme={crTheme}>
      <Container>
        <Form fields={fields} onSubmit={onSubmit} isLoading={isLoading} />
      </Container>
    </ThemeProvider>
  );
};

export default form;
