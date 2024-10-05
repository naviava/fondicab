import { View, Text, ScrollView, Image } from "react-native";
import { useCallback, useState } from "react";

import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

import CustomButton from "~/components/custom-button";
import InputField from "~/components/input-field";
import OAuth from "~/components/oauth";

import { icons, images } from "~/constants";

export default function SignIn() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [form.email, form.password, isLoaded, router, setActive, signIn]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-jsemibold text-2xl">
            Welcome to Fondicab
          </Text>
        </View>
        <View className="p-5">
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
            placeholder="********"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) =>
              setForm((prev) => ({
                ...prev,
                password: value,
              }))
            }
          />
          <CustomButton title="Sign In" onPress={handleSubmit} styles="mt-6" />

          <OAuth />

          <Link
            href="/sign-up"
            className="mt-10 text-center text-lg text-general-200"
          >
            <Text>Don&apos;t have an account? </Text>
            <Text className="text-primary-500">Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
