import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import { CustomButton, FormField } from "@/components";
import { Link, router } from "expo-router";
import { App } from "@/lib";
import { useGlobalContext } from "@/context/global-provider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const submit = async () => {
    if (!form.email && !form.password) {
      Alert.alert("Error", "Iltimos hamma maydonni to'ldiring");
    } else {
      setLoading(true);
      try {
        await App.signIn(form);
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
            Log in to Aora
          </Text>
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
            title='Sign In'
            handlePress={submit}
            containerStyle='mt-7'
            isLoading={loading}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular text-gray-100'>
              Don’t have an account?{" "}
            </Text>
            <Link
              href='/(auth)/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
function setIsLogged(arg0: boolean) {
  throw new Error("Function not implemented.");
}
