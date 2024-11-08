import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}: {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-gray-100 text-base font-pmedium'>{title}</Text>
      <View className='w-full h-16  bg-black-100 border-black-200 mt-2 rounded-xl  items-center relative'>
        <TextInput
          className='flex-1 text-white w-full border-black-200 border-2 focus:border-secondary text-left font-psemibold text-base px-4 rounded-xl'
          value={value}
          placeholder={placeholder || title}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !show}
        />
        {title === "Password" && (
          <TouchableOpacity
            className='absolute right-2 top-1/2 -translate-y-1/2'
            onPress={() => setShow(!show)}
          >
            <Image
              source={show ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='size-6'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
