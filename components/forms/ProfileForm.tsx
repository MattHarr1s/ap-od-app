import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Checkbox, List } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";

const ProfileForm = ({ user }) => {

  const [zipOptions, setZipOptions] = useState([]);
  const { control, setFocus } = useForm({
    defaultValues: {
      nickName: user.nickname,
      phone: user.name,
      zipCode: user.zipCode,
      language: user.language,
      email: user.email,
    },
    disabled: true,
  });

  return (
    <FormBuilder
      control={control}      
      setFocus={setFocus}
      inputSpacing={6}
      formConfigArray={[
        {
          name: "nickName",
          type: "text",
          rules: {
            required: {
              value: true,
              message: "Nickname is required",
            },
          },
          textInputProps: {
            label: "Nickname",
            mode: "outlined",
            style: styles.input,
          },
        },
        {
          name: "phone",
          type: "text",
          rules: {
            required: {
              value: true,
              message: "Phone Number is required",
            },
          },
          textInputProps: {
            label: "Phone Number",
            mode: "outlined",
            style: styles.input,
          },
        },
        {
          name: "zipCode",
          type: "autocomplete", // Update the type to "text"
          rules: {
            required: {
              value: true,
              message: "Zip Code is required",
            },
          },
          options: zipOptions,         
         
        },

        {
          name: "language",
          type: "select",
          textInputProps: {
            label: "Language",
          },
          rules: {
            required: {
              value: true,
              message: "Language is required",
            },
          },
          options: [
            {
              value: 0,
              label: "Espanol",
            },
            {
              value: 1,
              label: "English",
            },
          ],
        },
        {
          name: "email",
          type: "email",
          rules: {
            pattern: {
              value:
                /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
              message: "Email is invalid",
            },
          },
          textInputProps: {
            label: "Email",
            mode: "outlined",
            style: styles.input,
          },
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    marginBottom: 16,
  },
});

export default ProfileForm;
