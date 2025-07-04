import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import {
  type ResetPasswordParams,
  useSupabaseResetPassword,
} from "@/hooks/useSupabaseAuth";
import { Link, router } from "expo-router";
import { AlertCircleIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";

export default function LostPasswordScreen() {
  const doResetPassword = useSupabaseResetPassword();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordParams>({
    defaultValues: {
      email: __DEV__ ? "admin@admin.com" : "",
    },
  });

  const onSubmit = (data: ResetPasswordParams) => {
    console.log(data);
    doResetPassword.mutate(data.email, {
      onSuccess: ({ data, error }) => {
        if (error) {
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="error">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>{error.message}</ToastDescription>
              </Toast>
            ),
          });
          return;
        }
        toast.show({
          placement: "top",
          duration: 3000,
          render: () => (
            <Toast action="success">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>
                A link to reset your password has been sent to your email
              </ToastDescription>
            </Toast>
          ),
        });
        router.replace("/(auth)/login");
        console.log(data);
      },
      onError: (error) => {
        toast.show({
          placement: "top",
          duration: 3000,
          render: () => (
            <Toast action="error">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                An error occured while resetting your password
              </ToastDescription>
            </Toast>
          ),
        });
        console.error(error);
      },
    });
  };

  return (
    <SafeAreaView edges={["top"]}>
      <Box className="px-8">
        <Heading className="mb-6">Lost password</Heading>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel className="mb-1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Email"
                  size="xl"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  The email you provided doesn't seem correct.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="email"
        />
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Send me a new password</ButtonText>
        </Button>
        <Center className="mt-6">
          <Link href={"/(auth)/login"} asChild>
            <Button action="primary" variant="link">
              <ButtonText>Back</ButtonText>
            </Button>
          </Link>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
