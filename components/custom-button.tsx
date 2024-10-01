import { cn, getBgVariantStyle, getTextVariantStyle } from "@/lib/utils";
import { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  title,
  IconLeft,
  IconRight,
  bgVariant = "primary",
  textVariant = "default",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={cn(
        "w-full flex-row items-center justify-center rounded-full p-3 shadow-md shadow-neutral-400/70",
        getBgVariantStyle(bgVariant),
      )}
      {...props}
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
