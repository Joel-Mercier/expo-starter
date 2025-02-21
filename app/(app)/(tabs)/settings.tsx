import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { ButtonText } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { themeConfig } from "@/config/theme";
import { useSupabaseLogout } from "@/hooks/useSupabaseAuth";
import useApp from "@/stores/appStore";
import useAuth from "@/stores/authStore";
import * as Application from "expo-application";
import { ChevronRight, Icon, LogOut, TrashIcon } from "lucide-react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const handleClose = () => setShowAlertDialog(false);
  const doLogout = useSupabaseLogout();
  const toast = useToast();
  const setSession = useAuth.use.setSession();
  const setAccount = useAuth.use.setAccount();
  const toggleTheme = useApp.use.toggleTheme();
  const theme = useApp.use.theme();

  const handleLogout = () => {
    doLogout.mutate(undefined, {
      onSuccess: ({ error }) => {
        if (error) {
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="error">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>
                  An error occured while signing out
                </ToastDescription>
              </Toast>
            ),
          });
        } else {
          setSession(null);
          setAccount(null);
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="success">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                  You have been successfully logged out
                </ToastDescription>
              </Toast>
            ),
          });
        }
      },
      onError: (error) => {
        toast.show({
          placement: "top",
          duration: 3000,
          render: () => (
            <Toast action="error">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                An error occured while signing out
              </ToastDescription>
            </Toast>
          ),
        });
      },
    });
  };

  return (
    <SafeAreaView>
      <Box className="px-8">
        <Heading size="xl" className="mb-6">
          Settings
        </Heading>
      </Box>
      <Box>
        <VStack>
          <Card size="lg" variant="ghost" className="px-8">
            <HStack className="justify-between">
              <Heading size="md" className="mb-1">
                Edit profile
              </Heading>
              <ChevronRight
                size={24}
                color={themeConfig.theme.colors.gray[500]}
              />
            </HStack>
          </Card>
          <Divider />
          <Card size="lg" variant="ghost" className="px-8">
            <HStack className="justify-between">
              <Heading size="md" className="mb-1">
                Dark mode
              </Heading>
              <Switch
                value={theme === "dark"}
                defaultValue={false}
                size="sm"
                isDisabled={false}
                trackColor={{
                  false: themeConfig.theme.colors.gray[50],
                  true: themeConfig.theme.colors.primary[500],
                }}
                thumbColor={"#FFF"}
                ios_backgroundColor={themeConfig.theme.colors.gray[50]}
                onChange={() => toggleTheme()}
              />
            </HStack>
          </Card>
          <Divider />
          <Pressable onPress={() => setShowAlertDialog(true)}>
            <Card size="lg" variant="ghost" className="px-8">
              <HStack className="justify-between">
                <Heading size="md" className="mb-1 text-red-800">
                  Log out
                </Heading>
                <LogOut size={24} color={themeConfig.theme.colors.red[800]} />
              </HStack>
            </Card>
          </Pressable>
        </VStack>
        <Center>
          <Text>{Application.nativeApplicationVersion}</Text>
        </Center>
      </Box>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="gap-4 items-center">
          <AlertDialogHeader className="mb-2">
            <Heading size="md">Log out?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center">
              Are you sure you want to log out?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button size="sm" action="negative" onPress={handleLogout}>
              <ButtonText>Log out</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}
