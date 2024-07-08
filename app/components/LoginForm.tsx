// components/LoginForm.js
import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Group, Box } from "@mantine/core";
import {createClient} from "../../utils/supabase/client";

const LoginForm = ({ onClose }) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.error("Error logging in", error);
    } else {
    //   console.log("Logged in user:", user);
      onClose();
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          mt="sm"
          {...form.getInputProps("password")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginForm;
