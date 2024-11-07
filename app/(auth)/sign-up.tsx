import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import { CustomButton, FormField } from "@/components";
import { Link, router } from "expo-router";
import { App } from "@/lib";
import { useGlobalContext } from "@/context/global-provider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    setLoading(true);

    if (!form.email && !form.password && !form.username) {
      Alert.alert("Error", "Iltimos hamma maydonni to'ldiring");
    } else {
      try {
        await App.createUser(form);

        // State provider
        const user: any = await App.getCurrentUser();
        setUser(user);
        setIsLoggedIn(true);

        router.push("/(tabs)/");
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='p-4 w-full min-h-[80vh] justify-center px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-white text-2xl  font-semibold mt-10'>
            Sign Up to Aora
          </Text>
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(username: string) =>
              setForm({ ...form, username })
            }
            otherStyles='mt-7'
            keyboardType='username'
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(email: string) => setForm({ ...form, email })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(password: string) =>
              setForm({ ...form, password })
            }
            otherStyles='mt-7'
            keyboardType='password-address'
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyle='mt-7'
            isLoading={loading}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular text-gray-100'>
              Already have an account?
            </Text>
            <Link
              href='/(auth)/sign-in'
              className='text-lg font-psemibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
