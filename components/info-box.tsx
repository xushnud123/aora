import { View, Text } from "react-native";

const InfoBox = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
}: {
  title: string | number;
  subtitle?: string;
  containerStyle?: string;
  titleStyle?: string;
}) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
