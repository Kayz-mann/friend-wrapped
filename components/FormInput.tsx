import React from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { Text, View } from "react-native";

import theme from "./Theme";
import TextInput, { InputFieldProps } from "./TextInput";

export interface FormInputProps extends InputFieldProps {
  control?: Control<any, any> | any;
  name: string;
  resizable?: boolean;
  minHeight?: number;
  hideError?: boolean;
  inputRef?: any;
}

const FormInput = ({ control, name, ...rest }: FormInputProps) => {
  return (
    <Controller
      control={control}
      render={({ field, fieldState }) => (
        <FormInputItem
          inputRef={rest.inputRef}
          field={field}
          fieldState={fieldState}
          name={name}
          {...rest}
        />
      )}
      name={name}
    />
  );
};

export interface FormInputItemProps extends InputFieldProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  resizable?: boolean;
  minHeight?: number;
  name?: string;
  bgColor?: string;
}

export const FormInputItem = ({
  field,
  fieldState,
  resizable,
  minHeight,
  name,
  bgColor,
  ...rest
}: FormInputItemProps) => {
  return (
    <>
      <TextInput
        autoCapitalize="sentences"
        onChangeText={field.onChange}
        value={field?.value}
        bgColor={bgColor}
        {...rest}
        error={undefined} // This could be removed if not necessary
        placeholderTextColor={theme.colors.gray}
      />
      <View>
        <Text>
          {fieldState.error || rest?.error ? (
            <Text
              style={{ color: theme.colors.error, top: 8, marginBottom: 15 }}
            >
              {fieldState.error?.message || rest?.error}
            </Text>
          ) : null}
        </Text>
      </View>
    </>
  );
};

FormInputItem.defaultProps = {
  minHeight: 45,
};

export default FormInput;
