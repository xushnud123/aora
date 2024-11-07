import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, InfoBox, VideoCard } from "@/components";
import { App } from "@/lib";
import useAppWrite from "@/lib/usa-app-write";
import { useGlobalContext } from "@/context/global-provider";
import { icons } from "@/constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() =>
    App.getUserPosts(user?.$id as string)
  );

  const logout = async () => {
    await App.signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className=' w-full h-full bg-primary'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              onPress={logout}
              className='flex w-full items-end mb-10'
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle='mt-3'
              titleStyle='text-lg'
            />
            <View className='mt-3 flex flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle='Posts'
                titleStyle='text-xl'
                containerStyle='mr-10'
              />
              <InfoBox title='1.2k' subtitle='Followers' titleStyle='text-xl' />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
