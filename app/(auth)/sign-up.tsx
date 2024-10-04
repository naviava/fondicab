import { View, Text, ScrollView, Image } from "react-native";
import { useCallback, useState } from "react";

import InputField from "~/components/input-field";
import { icons, images } from "~/constants";
import CustomButton from "~/components/custom-button";
import { Link } from "expo-router";
import OAuth from "~/components/oauth";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
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

        {/* TODO: Verification modal. */}
      </View>
    </ScrollView>
  );
}
