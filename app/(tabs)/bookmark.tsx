import { FlatList, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, SearchField, VideoCard } from "@/components";
import { App } from "@/lib";
import useAppWrite from "@/lib/usa-app-write";
import { useGlobalContext } from "@/context/global-provider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts } = useAppWrite(() => App.getAllBookmarkPost(user.$id));

  return (
    <SafeAreaView className=' w-full h-full bg-primary'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4'>
            <Text className='font-psemibold text-2xl text-white'>
              Saved Videos
            </Text>
            {/* <View className='mt-4'>
              <SearchField placeholder='Search your saved videos' />
            </View> */}
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

export default Bookmark;
