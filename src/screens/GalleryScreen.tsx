import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Video, ResizeMode } from "expo-av";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Gallery"
>;

const { width } = Dimensions.get("window");

export default function GalleryScreen({
  navigation,
}: Props) {

  const videoRef = useRef<Video>(null);

  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const scaleAnim = useRef(
    new Animated.Value(0.95)
  ).current;

  useEffect(() => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);

  const playVideo = async () => {

    if (videoRef.current) {

      setPlaying(true);

      await videoRef.current.playAsync();

    }

  };

  const onPlaybackStatusUpdate = (status: any) => {

    if (
      status.isLoaded &&
      status.didJustFinish
    ) {

      setFinished(true);

      setPlaying(false);

    }

  };
    return (
    <LinearGradient
      colors={["#FFF8F5", "#FFEAF2", "#FFFDF9"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>
          📸 Favorite Memory
        </Text>

        <Text style={styles.subtitle}>
          Some moments don't need hundreds of photos...
          {"\n"}
          One beautiful memory is enough. ❤️
        </Text>

        <View style={styles.videoCard}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={require("../../assets/videos/her.mp4")}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />

          {!playing && !finished && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={playVideo}
            >
              <Text style={styles.playText}>
                ▶ Play Memory
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {finished && (
          <Animated.View style={styles.messageCard}>
            <Text style={styles.heart}>
              ❤️
            </Text>

            <Text style={styles.message}>
              I don't know if you remember this
              moment...
              {"\n\n"}
              But every time I watch it, it reminds
              me how precious even the simplest
              memories can become.
              {"\n\n"}
              Thank you for being part of one of my
              favorite memories.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.chapterButton}
          onPress={() =>
            navigation.navigate("Chapters")
          }
        >
          <Text style={styles.chapterText}>
            Back to Chapters ❤️
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 17,
    color: "#777",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 30,
  },

  videoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    overflow: "hidden",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.20,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,

    marginBottom: 25,
  },

  video: {
    width: "100%",
    height: 260,
    backgroundColor: "#000",
  },

  playButton: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",

    backgroundColor: "#FF6B9A",

    paddingVertical: 12,
    paddingHorizontal: 30,

    borderRadius: 30,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  playText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  messageCard: {
    width: "100%",
    backgroundColor: "#FFFDFB",

    borderRadius: 20,

    padding: 22,

    marginBottom: 25,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  heart: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
  },

  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 30,
  },

  chapterButton: {
    width: "100%",
    backgroundColor: "#FF6B9A",

    paddingVertical: 16,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  chapterText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});