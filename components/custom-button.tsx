import { cn, getBgVariantStyle, getTextVariantStyle } from "@/lib/utils";
import { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  title,
  IconLeft,
  IconRight,
  styles,
  bgVariant = "primary",
  textVariant = "default",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={cn(
        "w-full flex-row items-center justify-center rounded-full shadow-md",
        getBgVariantStyle(bgVariant),
        styles,
      )}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={cn("text-lg font-bold", getTextVariantStyle(textVariant))}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}
