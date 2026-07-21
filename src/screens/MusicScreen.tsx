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
import { Audio } from "expo-av";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Music"
>;

const { width } = Dimensions.get("window");

export default function MusicScreen({
  navigation,
}: Props) {

  const [sound, setSound] =
    useState<Audio.Sound | null>(null);

  const [playing, setPlaying] =
    useState(false);

  const rotateAnim = useRef(
    new Animated.Value(0)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {

    Animated.timing(fadeAnim,{
      toValue:1,
      duration:1000,
      useNativeDriver:true,
    }).start();

    return () => {

      if(sound){
        sound.unloadAsync();
      }

    };

  }, [sound]);

  const spinRecord = () => {

    rotateAnim.setValue(0);

    Animated.loop(

      Animated.timing(rotateAnim,{
        toValue:1,
        duration:5000,
        useNativeDriver:true,
      })

    ).start();

  };

  const playSong = async () => {

    if(playing){

      await sound?.pauseAsync();

      setPlaying(false);

      rotateAnim.stopAnimation();

      return;

    }

    let currentSound = sound;

    if(!currentSound){

      const { sound:newSound } =
        await Audio.Sound.createAsync(
          require("../../assets/music/her.aac")
        );

      currentSound = newSound;

      setSound(newSound);

    }

    await currentSound.playAsync();

    spinRecord();

    setPlaying(true);

  };

  const rotation = rotateAnim.interpolate({

    inputRange:[0,1],

    outputRange:["0deg","360deg"],

  });
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
          },
        ]}
      >
        <Text style={styles.title}>
          🎵 Our Song
        </Text>

        <Text style={styles.subtitle}>
          Every time this song plays,
          {"\n"}
          it reminds me of you. ❤️
        </Text>

        {/* Vinyl Record */}

        <Animated.View
          style={[
            styles.record,
            {
              transform: [
                {
                  rotate: rotation,
                },
              ],
            },
          ]}
        >
          <View style={styles.recordCenter}>
            <Text style={styles.recordHeart}>
              ❤️
            </Text>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={playSong}
        >
          <Text style={styles.playButtonText}>
            {playing ? "⏸ Pause Song" : "▶ Play Song"}
          </Text>
        </TouchableOpacity>

        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            "Some songs don't just play...
            {"\n"}
            they bring back memories."
          </Text>
        </View>

        <TouchableOpacity
          style={styles.chapterButton}
          onPress={() =>
            navigation.navigate("Chapters")
          }
        >
          <Text style={styles.chapterButtonText}>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    lineHeight: 28,
    marginTop: -10,
    marginBottom: 20,
  },

  record: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: "#222",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 8,
    borderColor: "#444",

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 15,
  },

  recordCenter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF6B9A",

    justifyContent: "center",
    alignItems: "center",
  },

  recordHeart: {
    fontSize: 32,
    color: "#FFF",
  },

  playButton: {
    width: "85%",
    backgroundColor: "#FF6B9A",

    paddingVertical: 16,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  playButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  quoteCard: {
    width: "95%",
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 22,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  quote: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 32,
    fontStyle: "italic",
  },

  chapterButton: {
    width: "90%",
    backgroundColor: "#FF6B9A",

    paddingVertical: 16,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  chapterButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});