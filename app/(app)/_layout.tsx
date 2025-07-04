import useAuth from "@/stores/authStore";
import { Redirect, Stack, useRouter } from "expo-router";

export default function AppLayout() {
  const session = useAuth.use.session();
  const router = useRouter();

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="language" />
    </Stack>
  );
}
