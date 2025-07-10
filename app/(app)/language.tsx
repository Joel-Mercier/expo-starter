import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { SupportedLanguages } from "@/config/i18n";
import { themeConfig } from "@/config/theme";
import useApp from "@/stores/appStore";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export default function LanguageScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useApp.use.theme();
  const setLocale = useApp.use.setLocale();
  return (
    <SafeAreaView>
      <HStack className="px-8 items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft
            color={
              theme === "dark"
                ? themeConfig.theme.colors.white
                : themeConfig.theme.colors.black
            }
          />
        </TouchableOpacity>
        <Heading size="xl">Language</Heading>
      </HStack>
      <Box>
        <VStack>
          {SupportedLanguages.map((language) => (
            <Pressable onPress={() => setLocale(language)} key={language}>
              <Card
                size="lg"
                variant="ghost"
                className="px-8 active:opacity-50"
              >
                <HStack className="justify-between">
                  <Heading size="md" className="mb-1">
                    {t(`app.settings.language.options.${language}`, {
                      lng: language,
                    })}
                  </Heading>
                </HStack>
              </Card>
            </Pressable>
          ))}
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
