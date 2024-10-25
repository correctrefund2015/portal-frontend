"use client";

import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  horizontal?: boolean;
  dateFormat?: string;
  selectOptions?: string[];
  children?: React.ReactNode;
  renderSkeleton?: (filed: any) => React.ReactNode;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    name,
    dateFormat,
    renderSkeleton,
  } = props;

  const getType = () => {
    if (name === "password") {
      return "password";
    } else if (name === "amount") {
      return "number";
    } else {
      return "text";
    }
  };
  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex border-0 ">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
              type={getType()}
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              className="text-sm p-3"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              showYearDropdown
              showMonthDropdown
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="">
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.selectOptions?.map((item, idx) => (
                <SelectItem key={idx} value={item} className="w-full">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          ></Textarea>
        </FormControl>
      );
    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, horizontal } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex-1",
            horizontal ? "grid grid-cols-2 gap-4 items-center" : ""
          )}
        >
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel
              className={cn("shad-input-label", horizontal && "text-right")}
            >
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
