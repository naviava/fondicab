import { View, Text, Image } from "react-native";
import CustomButton from "./custom-button";
import { icons } from "~/constants";
import { useCallback } from "react";

export default function OAuth() {
  const handleGoogleSignIn = useCallback(async () => {}, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-center gap-x-3">
        <View className="h-[1px] flex-1 bg-general-100" />
        <Text className="text-lg">or</Text>
        <View className="h-[1px] flex-1 bg-general-100" />
      </View>
      <CustomButton
        title="Sign in with Googleee"
        styles="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-2 h-5 w-5"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}
