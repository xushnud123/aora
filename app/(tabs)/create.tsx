import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "@/components";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";
import { App } from "@/lib";

const initialState = {
  title: "",
  prompt: "",
  video: null,
  thumbnail: "",
};

export interface CreatePost {
  title: string;
  prompt: string;
  video: any;
  thumbnail: any;
}

const Create = () => {
  const { user } = useGlobalContext();
  const [upload, setUpload] = useState(false);
  const [form, setForm] = useState<CreatePost>(initialState);

  const submit = async () => {
    if (!form.prompt && !form.thumbnail && !form.video && !!form.title) {
      Alert.alert("Please fill in all the field");
    }

    setUpload(true);
    try {
      await App.createVideoPost({ userId: user.$id, ...form });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/(tabs)/");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error);
    } finally {
      setForm(initialState);
      setUpload(false);
    }
  };
  const openPicker = async (selectType: "image" | "video") => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        if (selectType === "image") {
          setForm({ ...form, thumbnail: result.assets[0] });
          return;
        } else if (selectType === "video") {
          setForm({ ...form, video: result.assets[0] });
          return;
        } else {
          setTimeout(
            () =>
              Alert.alert("Document Picked", JSON.stringify(result, null, 2)),
            100
          );
        }
      } else {
        console.log("Document picking was cancelled");
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full min-h-full'>
      <ScrollView className='px-4 my-6 h-full min-h-full'>
        <Text className='text-[22px] font-psemibold text-white'>
          Upload Video
        </Text>
        <View className='mt-8 gap-[22px]'>
          <FormField
            title='Video Title'
            value={form.title}
            placeholder='Give your video a catchy title...'
            handleChangeText={(title) => setForm({ ...form, title })}
          />
          <View>
            <Text className='text-gray-100 text-base font-pmedium'>
              Upload Video
            </Text>
            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className='w-full h-64 rounded-2xl'
                  style={{ height: 256, borderRadius: 16, marginTop: 8 }}
                  resizeMode={ResizeMode.COVER}
                  // useNativeControls
                  // isLooping
                />
              ) : (
                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl mt-2 justify-center items-center'>
                  <View className='size-14 border border-dashed border-secondary-100 justify-center items-center rounded-xl'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text className='text-gray-100 text-base font-pmedium'>
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className='w-full h-64 rounded-2xl mt-2'
                  resizeMode='cover'
                />
              ) : (
                <View className='w-full h-16 border-[2px] border-black-200 px-4 bg-black-100 rounded-2xl mt-2 justify-center items-center flex-col space-x-2'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='size-6'
                  />
                  <Text className='text-gray-100 text-sm font-pmedium mt-1'>
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <FormField
            title='AI Prompt'
            value={form.prompt}
            placeholder='The AI prompt of your video....'
            handleChangeText={(prompt) => setForm({ ...form, prompt })}
          />
          <CustomButton
            title='Submit & Publish'
            handlePress={submit}
            isLoading={upload}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
