import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Link href="/" className="mt-4 px-4">
          <Text>Something went wrong...</Text>
        </Link>
      </View>
    </>
  );
}
