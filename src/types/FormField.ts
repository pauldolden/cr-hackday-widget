import { AnyObject } from "yup/lib/types";
import { HTMLInputTypes, OtherHTMLFormControls } from "../enums/HTMLInputTypes";

export interface FormField {
  name: string;
  label: string;
  type: HTMLInputTypes | OtherHTMLFormControls;
  defaultValue?: string;
  validation?: AnyObject;
  selectOptions?: string[];
}
