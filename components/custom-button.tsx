import { cn } from "@/lib";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  containerStyle,
  textStyles,
  handlePress,
  isLoading,
}: {
  title: string;
  containerStyle?: string;
  handlePress?: () => void;
  textStyles?: string;
  isLoading?: Boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={!!isLoading}
      className={cn(
        "rounded-xl min-h-[62px] justify-center items-center bg-secondary",
        isLoading ? "opacity-50" : "opacity-100",
        containerStyle
      )}
    >
      <Text
        className={cn(
          "text-primary font-psemibold text-lg text-[18px] leading-[28px]",
          textStyles
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
