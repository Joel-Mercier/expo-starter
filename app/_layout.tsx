import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import useApp, { type Theme } from "@/stores/appStore";
import { ThemeStorage } from "@/utils/themeStorage";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AppState, type AppStateStatus, Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const theme = useApp.use.theme();
  const setTheme = useApp.use.setTheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const subscription = AppState.addEventListener("change", onAppStateChange);
    (async () => {
      const savedTheme = (await ThemeStorage.getTheme()) as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    })();
    return () => {
      subscription.remove();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={theme}>
        <OverlayProvider>
          <ToastProvider>
            <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </ToastProvider>
        </OverlayProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
