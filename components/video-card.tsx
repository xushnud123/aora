import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { Posts } from "@/types/video";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import { App, cn } from "@/lib";
import { useGlobalContext } from "@/context/global-provider";

const VideoCard: FC<Posts> = ({
  title,
  video,
  thumbnail,
  $id,
  bookmark,
  creator: { avatar, username },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [book, setBook] = useState(false);

  const onSaveBookmark = async () => {
    await App.addBookmark({ userId: user.$id, postId: $id });
    setBook(true);
  };

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSaveBookmark}
          className={cn(
            "rounded-xl mt-3 w-max h-max flex transition-all justify-center items-center opacity-100"
          )}
        >
          <Image
            source={bookmark || book ? icons.bookmarkActive : icons.bookmark}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </TouchableOpacity>
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
          isMuted
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
