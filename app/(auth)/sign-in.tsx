import { View, Text, ScrollView, Image } from "react-native";
import { useCallback, useState } from "react";

import InputField from "~/components/input-field";
import { icons, images } from "~/constants";
import CustomButton from "~/components/custom-button";
import { Link } from "expo-router";
import OAuth from "~/components/oauth";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(async () => {}, []);

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

        {/* TODO: Verification modal. */}
      </View>
    </ScrollView>
  );
}
