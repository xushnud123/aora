import { Text, FlatList, TouchableOpacity, Image, View } from "react-native";
import React, { useState } from "react";
import { Posts } from "@/types/video";
import * as Animatable from "react-native-animatable";
import { cn } from "@/lib";

import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";

const TrendingItem = ({
  item,
  activeItem,
}: {
  item: Posts;
  activeItem: string;
}) => {
  const [play, setPlay] = useState(false);

  const anim =
    item.$id === activeItem
      ? {
          0: { transform: [{ scale: 0.9 }] },
          1: {
            transform: [{ scale: play ? 1 : 1.1 }],
          },
        }
      : {
          0: { transform: [{ scale: 1 }] },
          1: {
            transform: [{ scale: 0.9 }],
          },
        };
  return (
    <Animatable.View className='mr-5' animation={anim} duration={500}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            maxHeight: 288,
            backgroundColor: "rgba(255,255,255,0.1)",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className={cn("relative justify-center items-center")}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: Posts[] }) => {
  const [activeItem, setActiveItem] = useState("");
  const viewableItemsChanges = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem item={item} activeItem={activeItem} />
        )}
        onViewableItemsChanged={viewableItemsChanges}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170, y: 0 }}
        horizontal
        className='pl-4'
      />
    </View>
  );
};

export default Trending;
