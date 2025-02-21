import useAuth from "@/stores/authStore";
// import { useAccount } from '@/hooks/api/useAccount';
import { Stack, Redirect } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
	const session = useAuth.use.session();

	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/(auth)/login" />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
