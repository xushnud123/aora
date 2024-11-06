import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchField = ({
  placeholder,
  initialQuery,
}: {
  placeholder: string;
  initialQuery?: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className='w-full h-16  bg-black-100 border-black-200 mt-2 rounded-xl  items-center relative space-x-4'>
      <TextInput
        className='flex-1 text-white w-full border-black-200 border-2 focus:border-secondary text-left font-pregular text-base px-4 rounded-xl mt-0.5'
        value={query}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }

          if (pathname.startsWith("/search/")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
        className='absolute right-4 top-1/2 -translate-y-1/2'
      >
        <Image source={icons.search} resizeMode='contain' className='size-5' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
