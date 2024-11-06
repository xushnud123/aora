import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, SearchField, VideoCard } from "@/components";
import { App } from "@/lib";
import useAppWrite from "@/lib/usa-app-write";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() =>
    App.getSearchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className=' w-full h-full bg-primary'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search results
            </Text>
            <Text className='text-2xl font-psemibold text-white'>{query}</Text>
            <View className='mt-6 mb-8'>
              <SearchField
                placeholder='Search for a video topic'
                initialQuery={query as string}
              />
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

export default Search;
