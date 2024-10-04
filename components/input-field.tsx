import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import { cn } from "~/lib/utils";
import { InputFieldProps } from "~/types/type";

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  styles,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={cn("mb-3 font-jsemibold text-lg", labelStyle)}>
            {label}
          </Text>
          <View
            className={cn(
              "relative flex-row items-center justify-start rounded-full border border-neutral-100 bg-neutral-100 focus:border-primary-500",
              containerStyle,
            )}
          >
            {!!icon && (
              <Image source={icon} className={cn("ml-4 h-6 w-6", iconStyle)} />
            )}
            <TextInput
              secureTextEntry={secureTextEntry}
              className={cn(
                "flex-1 rounded-full p-4 text-left font-jsemibold text-[15px]",
                inputStyle,
              )}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
