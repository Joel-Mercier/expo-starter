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
import { useEffect } from "react";
import "react-native-reanimated";
import { supabase } from "@/services/supabase";
import useApp, { type Theme } from "@/stores/appStore";
import useAuth from "@/stores/authStore";
import { ThemeStorage } from "@/utils/themeStorage";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AppState, type AppStateStatus, Platform } from "react-native";
import { DevToolsBubble } from "react-native-react-query-devtools";
import "@/config/i18n";
import i18n, {
  SupportedLanguages,
  type TSupportedLanguages,
} from "@/config/i18n";
import { getLocales } from "expo-localization";
import { SystemBars } from "react-native-edge-to-edge";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  const setSession = useAuth.use.setSession();
  const theme = useApp.use.theme();
  const setTheme = useApp.use.setTheme();
  const locale = useApp.use.locale();
  const setLocale = useApp.use.setLocale();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    (async () => {
      const savedTheme = (await ThemeStorage.getTheme()) as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    })();
  }, [loaded, setTheme]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    } else {
      const userLocales = getLocales();
      if (
        userLocales.some(
          (userLocale) =>
            userLocale.languageCode &&
            (SupportedLanguages as string[]).includes(userLocale.languageCode),
        )
      ) {
        const firstMatchingLocale = userLocales.filter(
          (userLocale) =>
            userLocale.languageCode &&
            (SupportedLanguages as string[]).includes(userLocale.languageCode),
        )[0].languageCode as TSupportedLanguages;
        setLocale(firstMatchingLocale);
        i18n.changeLanguage(firstMatchingLocale);
      } else {
        setLocale("en");
        i18n.changeLanguage("en");
      }
    }
  }, []);

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
              <SystemBars style="auto" />
            </ThemeProvider>
          </ToastProvider>
        </OverlayProvider>
      </GluestackUIProvider>
      {__DEV__ && <DevToolsBubble />}
    </QueryClientProvider>
  );
}
