import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { Posts } from "@/types/video";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import { cn } from "@/lib";

const VideoCard: FC<Posts> = ({
  title,
  video,
  thumbnail,
  creator: { avatar, username },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex flex-row gap-3 items-start'>
        <View className='flex justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='flex justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='font-psemibold text-sm text-white'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className=''
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            maxHeight: 240,
            marginTop: 12,
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
          className={cn(
            "w-full rounded-xl mt-3 h-60 min-h-60 flex transition-all justify-center items-center opacity-100"
          )}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
