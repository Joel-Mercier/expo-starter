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
import { useToast } from "@/components/ui/toast";
import { Link } from "expo-router";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <Box className="px-8">
        <Heading className="mb-6">Login</Heading>
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
          <ButtonText>Change password</ButtonText>
        </Button>
        <Center className="mt-6">
          <Link href={"/(auth)/login"} asChild>
            <Button action="primary" variant="link">
              <ButtonText>Go to login</ButtonText>
            </Button>
          </Link>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
