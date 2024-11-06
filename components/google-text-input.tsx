import { View, Text } from "react-native";
import { cn } from "~/lib/utils";
import { GoogleInputProps } from "~/types/type";

export function GoogleTextInput({
  icon,
  handlePress,
  containerStyle,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) {
  return (
    <View
      className={cn(
        "relative z-50 mb-5 flex-row items-center justify-center rounded-xl",
        containerStyle,
      )}
    >
      <Text>Search</Text>
    </View>
  );
}
