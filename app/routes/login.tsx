import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Container,
  Box,
} from "@mantine/core";
import { createUserSession } from "~/utils/cookie";
import { ActionArgs, json } from "@remix-run/node";
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

  return await createUserSession(response.accessToken, "/");
};

const LoginPage = () => {
  return (
    <BrowserOnly>
      <Box>
        <Container
          sx={{
            maxWidth: "720px",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper radius="md" p="xl" withBorder sx={{ width: "100%" }}>
            <Text size="lg" weight={500}>
              Welcome to Dashboard
            </Text>
            <Box sx={{ marginBlock: "40px" }}>
              <form>
                <Stack>
                  <TextInput
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    // value={form.values.email}
                    // onChange={(event) =>
                    //   form.setFieldValue("email", event.currentTarget.value)
                    // }
                    // error={form.errors.email && "Invalid email"}
                  />

                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    // value={form.values.password}
                    // onChange={(event) =>
                    //   form.setFieldValue("password", event.currentTarget.value)
                    // }
                    // error={
                    //   form.errors.password &&
                    //   "Password should include at least 6 characters"
                    // }
                  />
                </Stack>

                <Group position="apart" mt="xl">
                  <Box></Box>
                  <Button type="submit">Login</Button>
                </Group>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
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
