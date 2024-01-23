import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const { control, setFocus } = useForm({
    defaultValues: {
      zipCode: "",
      phone: "",
      language: "",
      email: "",
    },
  });

  return (
    <FormBuilder control={control} setFocus={setFocus}
    formConfigArray={[
      {
        name: "zipCode",
        type: "input",
        rules: {
          required: {
            value: true,
            message: "Zip Code is required",
          },
        },
        textInputProps: {
          label: "Zip Code",
          mode: "outlined",
          style: styles.input,
        },
      },
      {
        name: "phone",
        type: "input",
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
        name: "language",
        type: "input",
        rules: {
          required: {
            value: true,
            message: "Language is required",
          },
        },
        textInputProps: {
          label: "Language",
          mode: "outlined",
          style: styles.input,
        },
      },
      {
        name: "email",
        type: "input",
        rules: {
          required: {
            value: true,
            message: "Email is required",
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
