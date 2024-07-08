'use client'

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
} from "@mantine/core";
import { createClient } from '../../../utils/supabase/client';
import { login, signup } from './action'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "./submit-button";

export default function LoginPage() {

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
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
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
    // <main className="min-h-screen flex flex-col items-center">
    //   <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //     <Link
    //       href="/app"
    //       className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //       >
    //         <polyline points="15 18 9 12 15 6" />
    //       </svg>{" "}
    //       Back
    //     </Link>

    //     <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
    //       <label className="text-md" htmlFor="email">
    //         Email
    //       </label>
    //       <input
    //         className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //         name="email"
    //         placeholder="you@example.com"
    //         required
    //       />
    //       <label className="text-md" htmlFor="password">
    //         Password
    //       </label>
    //       <input
    //         className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //         type="password"
    //         name="password"
    //         placeholder="••••••••"
    //         required
    //       />
    //       <SubmitButton
    //         formAction={login}
    //         className="bg-yellow rounded-md px-4 py-2 text-foreground mb-2"
    //         pendingText="Signing In..."
    //       >
    //         Sign In
    //       </SubmitButton>
    //       <Link
    //         href="/app/signup"
    //         className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-center"
    //       >
    //         Sign Up
    //       </Link>
    //     </form>
    //   </div>
    // </main>
  );
}