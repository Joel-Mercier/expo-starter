import PostItem from "@/components/posts/PostItem";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

const DATA = [
  {
    title: "First Item",
    is_active: true,
  },
  {
    title: "Second Item",
    is_active: false,
  },
];

export default function HomeScreen() {
  const { data, error, isLoading } = useSupabaseQuery(["posts"], "Posts");

  console.log(data);
  console.log(error);
  console.log(isLoading);
  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 px-8">
        <FlashList
          data={DATA}
          renderItem={({ item }) => <PostItem post={item} />}
          estimatedItemSize={70}
          ListHeaderComponent={() => (
            <Box className="">
              <Heading size="xl" className="mb-8">
                Welcome to Expo Starter
              </Heading>
              <Center className="mb-4">
                <Text>👋 Happy coding !</Text>
              </Center>
              <VStack className="mb-4">
                <Card size="lg" variant="filled">
                  <Heading size="md" className="mb-1">
                    UI Components
                  </Heading>
                  <Text size="sm" className="mb-4">
                    Gluestack is used to build the UI components
                  </Text>
                  <Link
                    href="https://gluestack.io/ui/docs/components/all-components"
                    asChild
                  >
                    <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                      <ButtonText size="sm">See documentation</ButtonText>
                    </Button>
                  </Link>
                </Card>
              </VStack>
              <Heading size="md" className="mb-8">
                CRUD example
              </Heading>
            </Box>
          )}
          ListEmptyComponent={() => (
            <Center>
              <Text>No posts</Text>
            </Center>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}
