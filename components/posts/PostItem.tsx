import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { themeConfig } from "@/config/theme";
import type { Tables, TablesUpdate } from "@/database.types";
import { useSupabaseUpdateMutation } from "@/hooks/useSupabaseUpdateMutation";
import { Motion } from "@legendapp/motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircleIcon,
  Check,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface PostItemProps {
  post: Tables<"Posts">;
  handleDelete: (id: number) => void;
}

export default function PostItem({ post, handleDelete }: PostItemProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [showModal, setShowModal] = useState<boolean>(false);
  const doUpdatePost = useSupabaseUpdateMutation<Tables<"Posts">>("Posts");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TablesUpdate<"Posts">>({
    defaultValues: {
      title: "",
    },
    values: post,
  });

  const onSubmit = (data: TablesUpdate<"Posts">) => {
    doUpdatePost.mutate(
      { updatedData: data, options: { eq: { column: "id", value: post.id } } },
      {
        onSuccess: ({ title }) => {
          setShowModal(false);
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="success">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                  Post {title} has been updated successfully
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
                  An error occured while updating the post
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
    <>
      <Motion.Pressable>
        <Motion.View whileTap={{ scale: 1.05 }}>
          <Card size="lg" variant="filled" className="mb-3">
            <HStack className="items-center justify-between">
              <HStack className="items-center">
                {post.is_active ? (
                  <Box className="w-6 h-6 rounded-full bg-emerald-200 me-2 items-center justify-center">
                    <Check
                      size={16}
                      color={themeConfig.theme.colors.emerald[500]}
                    />
                  </Box>
                ) : (
                  <Box className="w-6 h-6 rounded-full me-2 items-center justify-center" />
                )}
                <Heading size="md" className="mb-1">
                  {post.title}
                </Heading>
              </HStack>
              <Menu
                placement="top"
                offset={5}
                disabledKeys={["Settings"]}
                trigger={({ ...triggerProps }) => {
                  return (
                    <Button {...triggerProps} variant="link">
                      <EllipsisVertical
                        size={24}
                        color={themeConfig.theme.colors.gray[500]}
                      />
                    </Button>
                  );
                }}
              >
                <MenuItem
                  key="edit"
                  textValue="Edit"
                  onPress={() => setShowModal(true)}
                >
                  <Pencil
                    size={16}
                    color={themeConfig.theme.colors.gray[500]}
                  />
                  <MenuItemLabel size="sm" className="ms-4">
                    Edit
                  </MenuItemLabel>
                </MenuItem>
                <MenuItem
                  key="delete"
                  textValue="Delete"
                  onPress={() => handleDelete(post.id)}
                >
                  <Trash size={16} color={themeConfig.theme.colors.red[500]} />
                  <MenuItemLabel size="sm" className="ms-4">
                    Delete
                  </MenuItemLabel>
                </MenuItem>
              </Menu>
            </HStack>
          </Card>
        </Motion.View>
      </Motion.Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="mb-4">
            <Heading size="md" className="text-typography-950">
              Update the post
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
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
                  <Input size={"md"}>
                    <InputField
                      type="text"
                      placeholder="Enter a title"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
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
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>
              <ButtonText>Update</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
