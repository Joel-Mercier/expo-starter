import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { themeConfig } from "@/config/theme";
import { useRouter } from "expo-router";
import i18next from "i18next";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function LanguageScreen() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]}>
      <HStack className="px-8 items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color={themeConfig.theme.colors.white} />
        </TouchableOpacity>
        <Heading size="xl">Language</Heading>
      </HStack>
      <Box>
        <VStack>
          {i18next.languages.map((language) => (
            <Card size="lg" variant="ghost" className="px-8" key={language}>
              <HStack className="justify-between">
                <Heading size="md" className="mb-1">
                  {language}
                </Heading>
              </HStack>
            </Card>
          ))}
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
