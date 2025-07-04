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
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { type SignUpParams, useSupabaseSignUp } from "@/hooks/useSupabaseAuth";
import useAuth from "@/stores/authStore";
import { Link, useRouter } from "expo-router";
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  Lock,
  Mail,
} from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const doSignUp = useSupabaseSignUp();
  const toast = useToast();
  const setSession = useAuth.use.setSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({
    defaultValues: {
      email: __DEV__ ? "new@user.com" : "",
      password: __DEV__ ? "abcd1234" : "",
    },
  });

  const onSubmit = (data: SignUpParams) => {
    console.log(data);
    doSignUp.mutate(data, {
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
        }
        if (data.session && data.user) {
          setSession(data.session);
          toast.show({
            placement: "top",
            duration: 3000,
            render: () => (
              <Toast action="success">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                  You have been successfully registered
                </ToastDescription>
              </Toast>
            ),
          });
          router.replace("/(app)/(tabs)");
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
                An error occured while registering
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
        <Heading className="mb-6">Register</Heading>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.email}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-5"
            >
              <Input size={"md"}>
                <InputSlot className="px-3">
                  <InputIcon as={Mail} />
                </InputSlot>
                <InputField
                  type="text"
                  keyboardType="email-address"
                  placeholder="Email address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              {errors.email && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>Email required</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.password}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-5"
            >
              <Input size={"md"}>
                <InputSlot className="px-3">
                  <InputIcon as={Lock} />
                </InputSlot>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  At least 6 characters
                </FormControlHelperText>
              </FormControlHelper>
              {errors.password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>Password required</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
          name="password"
        />
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Sign up</ButtonText>
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
