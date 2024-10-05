import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useCallback, useState } from "react";

import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "~/components/custom-button";
import InputField from "~/components/input-field";
import OAuth from "~/components/oauth";

import { icons, images } from "~/constants";

export default function SignUp() {
  const router = useRouter();

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification((prev) => ({ ...prev, state: "pending" }));
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [form.email, form.password, isLoaded, signUp]);

  const handleVerify = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: Create a db user.

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification((prev) => ({ ...prev, state: "success" }));
      } else {
        setVerification((prev) => ({
          ...prev,
          state: "failed",
          error: "Verification failed.",
        }));
      }
    } catch (err: any) {
      setVerification((prev) => ({
        ...prev,
        state: "failed",
        error: err.errors[0].longMessage,
      }));
    }
  }, [verification.code, isLoaded, setActive, signUp]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-jsemibold text-2xl">
            Create your account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) =>
              setForm((prev) => ({
                ...prev,
                name: value,
              }))
            }
          />
          <InputField
            label="Email"
            autoCapitalize="none"
            placeholder="yourname@email.com"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm((prev) => ({
                ...prev,
                email: value,
              }))
            }
          />
          <InputField
            secureTextEntry
            label="Password"
            autoCapitalize="none"
            placeholder="Create a password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) =>
              setForm((prev) => ({
                ...prev,
                password: value,
              }))
            }
          />
          <CustomButton title="Sign Up" onPress={handleSubmit} styles="mt-6" />

          <OAuth />

          <Link
            href="/sign-in"
            className="mt-10 text-center text-lg text-general-200"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log in</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification((prev) => ({ ...prev, state: "success" }))
          }
        >
          <>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Text className="mb-2 font-jextrabold text-2xl">
                Verification
              </Text>
              <Text className="mb-5 font-jregular">
                We&apos;ve sent you a verification code at {form.email}
              </Text>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification((prev) => ({ ...prev, code }))
                }
              />
              {!!verification.error && (
                <Text className="mt-1 text-sm text-red-500">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify Email"
                onPress={handleVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Image
                source={images.check}
                resizeMode="contain"
                className="mx-auto my-5 h-[110px] w-[110px]"
              />
              <Text className="text-center font-jbold text-3xl">Verified</Text>
              <Text className="text-center font-jregular text-base text-gray-400">
                You have successfully verified your account.
              </Text>
              <CustomButton
                title="Start browsing"
                onPress={() => {
                  setVerification((prev) => ({ ...prev, state: "default" }));
                  router.push("/(root)/(tabs)/home");
                }}
                styles="mt-5"
              />
            </View>
          </>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
