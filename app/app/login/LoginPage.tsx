"use client";

import { FormEvent } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
// import { useFormState } from "react-dom";
import { login, signup } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";

// const initialState = {
//   errors: {}, // Add an empty errors object
// };

export default function LoginPage(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      if (type === "login") {
        await login(formData);
      } else {
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        await signup(formData);
      }
      // router.push("/dashboard"); // Redirect after successful login/signup
    } catch (error) {
      console.error(error);
      alert("Error logging in or signing up");
    }
  };

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // setIsLoading(true);
  //   console.log("get here");

  //   try {
  //     const formData = new FormData(event.currentTarget);

  //     if (type === "login") {
  //       await login(formData);
  //     } else if (type === "register") {
  //       formData.append("firstName", formData.get("firstName") as string);
  //       formData.append("lastName", formData.get("lastName") as string);
  //       await signup(formData);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error logging in or signing up");
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // const handleLogin = async () => {
  //   // Example: Perform login logic, authenticate user
  //   // Example: If login is successful, redirect to callback URL
  //   try {
  //     // Example: Perform login API call or authentication logic
  //     // Replace with actual login logic
  //     const loginResponse = await fetch("/api/login", {
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (loginResponse.ok) {
  //       // Example: Get callback URL from query parameters or state
  //       const callbackUrl = router.query.callbackUrl || "/"; // Default to homepage

  //       // Redirect to callback URL after successful login
  //       router.push(callbackUrl);
  //     } else {
  //       // Handle login error
  //       console.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  return (
    <Center>
      <Paper radius="md" p="lg" withBorder style={{ maxWidth: 400 }}>
        <Text size="lg" fw={500}>
          Welcome to LifePass
        </Text>

        {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}

        <Divider
          // label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        > */}
          {/* <form action={type === 'login' ? login : signup}> */}
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="First name"
                placeholder="Your first name"
                value={form.values.first_name}
                onChange={(event) =>
                  form.setFieldValue("first_name", event.currentTarget.value)
                }
                error={form.errors.first_name}
                radius="md"
              />
            )}

            {type === "register" && (
              <TextInput
                required
                label="Last name"
                placeholder="Your Last name"
                value={form.values.last_name}
                onChange={(event) =>
                  form.setFieldValue("last_name", event.currentTarget.value)
                }
                error={form.errors.last_name}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@lifepass.one"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            {/* <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor> */}
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
