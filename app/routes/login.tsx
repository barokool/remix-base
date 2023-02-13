import React, { useEffect, useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
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
  Container,
} from "@mantine/core";
import { GoogleButton } from "~/global-components/GoogleLogin";
import { GoogleResponse } from "~/models/user";
import { createUserSession } from "~/utils/cookie";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { googleAuthLoginAPI } from "~/api/auth";
import { useCatch } from "@remix-run/react";
import BrowserOnly from "~/global-components/BrowserOnly";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const accessToken = formData.get("accessToken") as string;

  if (!accessToken) {
    throw json({
      message: "Error in logging in, Please try again",
      status: 404,
    });
  }

  const response = await googleAuthLoginAPI(accessToken);

  if (!("accessToken" in response))
    throw json({
      message: "Error in logging in, Please try again",
      status: 404,
    });

  // const headers = new Headers([
  //   ["Set-Cookie", `access_token=${response.accessToken}; path=/`],
  //   // [
  //   //   "Set-Cookie",
  //   //   `refresh_token=${response.refreshToken}; HttpOnly; path=/; SameSite=lax;  'secure'
  //   //     }`,
  //   // ],
  // ]);

  // return redirect("/", {
  //   headers,
  // });

  return await createUserSession(response.accessToken, "/");
};

const LoginPage = () => {
  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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

  return (
    <BrowserOnly>
      <Container sx={{ maxWidth: "720px" }}>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Mantine, {type} with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton />
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

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

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </BrowserOnly>
  );
};

export default LoginPage;

export function CatchBoundary() {
  const caught = useCatch();
  //  throw json({ message: "error", status: 404 }); will jump to this
  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  //throw new Error("error"); will jump this
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
