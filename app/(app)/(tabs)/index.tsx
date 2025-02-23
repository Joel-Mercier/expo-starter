import PostItem from "@/components/posts/PostItem";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { themeConfig } from "@/config/theme";
import type { Tables, TablesInsert } from "@/database.types";
import { useSupabaseDeleteMutation } from "@/hooks/useSupabaseDeleteMutation";
import { useSupabaseInsertMutation } from "@/hooks/useSupabaseInsertMutation";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { AlertCircleIcon, ArrowRightCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";

export default function HomeScreen() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSupabaseQuery<Tables<"Posts">[]>(
    ["posts"],
    "Posts",
  );
  const doInsertPost = useSupabaseInsertMutation<Tables<"Posts">>("Posts");
  const doDeletePost = useSupabaseDeleteMutation<Tables<"Posts">>("Posts");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TablesInsert<"Posts">>({
    defaultValues: {
      title: __DEV__ ? "Test new post" : "",
    },
  });

  const onSubmit = (data: TablesInsert<"Posts">) => {
    doInsertPost.mutate(data, {
      onSuccess: ({ title }) => {
        toast.show({
          placement: "top",
          duration: 3000,
          render: () => (
            <Toast action="success">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>
                Post {title} has been created successfully
              </ToastDescription>
            </Toast>
          ),
        });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.show({
          placement: "top",
          duration: 3000,
          render: () => (
            <Toast action="error">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                An error occured while creating the post
              </ToastDescription>
            </Toast>
          ),
        });
        console.error(error.message);
      },
    });
  };

  const handleDelete = (id: number) => {
    doDeletePost.mutate(
      { eq: { column: "id", value: id } },
      {
        onSuccess: ({ title }) => {
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="success">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                  Post {title} has been deleted successfully
                </ToastDescription>
              </Toast>
            ),
          });
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="error">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>
                  An error occured while deleting the post
                </ToastDescription>
              </Toast>
            ),
          });
          console.error(error.message);
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <PostItem post={item} handleDelete={handleDelete} />
          )}
          estimatedItemSize={70}
          contentContainerStyle={{ paddingHorizontal: 32 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Box className="">
              <Heading size="xl" className="mb-8">
                Welcome to Expo Starter
              </Heading>
              <Center className="mb-4">
                <Text>👋 Happy coding !</Text>
              </Center>
              <VStack className="mb-8">
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
          ListFooterComponent={() => (
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  isInvalid={!!errors.title}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-5"
                >
                  <Input size={"lg"}>
                    <InputField
                      type="text"
                      placeholder="Add a post"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    <InputSlot className="px-3">
                      <Button variant="link" onPress={handleSubmit(onSubmit)}>
                        <InputIcon
                          as={ArrowRightCircle}
                          color={themeConfig.theme.colors.white}
                        />
                      </Button>
                    </InputSlot>
                  </Input>
                  {errors.title && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Title required
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              )}
              name="title"
            />
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
