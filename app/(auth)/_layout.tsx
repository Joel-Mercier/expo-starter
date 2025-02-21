import useAuth from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
	const session = useAuth.use.session();
  console.log(session)
	if (session) {
		// On web, static rendering will stop here as the user is authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/(app)/(tabs)/" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="lost-password" options={{ title: "Lost password" }} />
		</Stack>
	);
}
