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
import { Link } from "expo-router";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: __DEV__ ? "admin" : "",
      lastName: __DEV__ ? "admin" : "",
      email: __DEV__ ? "admin@admin.com" : "",
      password: __DEV__ ? "abcd1234" : "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <Box className="px-8">
        <Heading className="mb-6">Register</Heading>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.firstName}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-5"
            >
              <Input size={"md"}>
                <InputField
                  type="text"
                  placeholder="First name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              {errors.firstName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    First name required
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.lastName}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-5"
            >
              <Input size={"md"}>
                <InputField
                  type="text"
                  placeholder="Last name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              {errors.lastName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Last name required
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
          name="lastName"
        />
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
