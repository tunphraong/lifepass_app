"use client";
import { useSearchParams } from "next/navigation";
import { PasswordInput, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { resetPassword } from "./action";
import { Suspense } from "react";

// ... (import your server action)

function Search() {
  const searchParams = useSearchParams();
  const token_hash = searchParams.get("token_hash") as string;
  const type = searchParams.get("type") as string;

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("password", form.values.password);
    formData.append("passwordConfirm", form.values.passwordConfirm);
    formData.append("token_hash", token_hash);
    formData.append("type", type);
    await resetPassword(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <PasswordInput
              label="New Password"
              placeholder="Enter your new password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your new password"
              {...form.getInputProps("passwordConfirm")}
            />
          </Stack>

          <Button type="submit" fullWidth mt="xl" color="blue">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Search />
    </Suspense>
  );
}
