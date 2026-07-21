import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "FinalLetter"
>;

export default function FinalLetterScreen({
  navigation,
}: Props) {

  const [opened, setOpened] = useState(false);

  // Envelope Animation
  const envelopeScale = useRef(
    new Animated.Value(1)
  ).current;

  // Letter Animation
  const letterOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const letterTranslate = useRef(
    new Animated.Value(80)
  ).current;

  // Ending Animation
  const fadeOut = useRef(
    new Animated.Value(1)
  ).current;

  const scaleDown = useRef(
    new Animated.Value(1)
  ).current;

  const overlayOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const openLetter = () => {

    Animated.sequence([

      Animated.spring(envelopeScale,{
        toValue:0.9,
        friction:5,
        useNativeDriver:true,
      }),

      Animated.spring(envelopeScale,{
        toValue:1,
        friction:4,
        useNativeDriver:true,
      }),

    ]).start(() => {

      setOpened(true);

      Animated.parallel([

        Animated.timing(letterOpacity,{
          toValue:1,
          duration:700,
          useNativeDriver:true,
        }),

        Animated.spring(letterTranslate,{
          toValue:0,
          friction:6,
          useNativeDriver:true,
        }),

      ]).start();

    });

  };

  const finishStory = () => {

    Animated.parallel([

      Animated.timing(fadeOut,{
        toValue:0,
        duration:2500,
        useNativeDriver:true,
      }),

      Animated.timing(scaleDown,{
        toValue:0.9,
        duration:2500,
        useNativeDriver:true,
      }),

      Animated.timing(overlayOpacity,{
        toValue:1,
        duration:2500,
        useNativeDriver:false,
      }),

    ]).start(() => {

      navigation.navigate("Home");

    });

  };
    return (
    <LinearGradient
      colors={["#FFF8F5", "#FFEAF2", "#FFFDF9"]}
      style={styles.container}
    >
      {!opened ? (

        <Animated.View
          style={{
            transform: [
              {
                scale: envelopeScale,
              },
            ],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openLetter}
          >
            <View style={styles.envelope}>

              <Text style={styles.envelopeEmoji}>
                💌
              </Text>

            </View>

            <Text style={styles.title}>
              One Last Letter
            </Text>

            <Text style={styles.subtitle}>
              Before our story ends...
              {"\n"}
              there is one final thing
              {"\n"}
              I want to tell you.
            </Text>

            <View style={styles.openButton}>
              <Text style={styles.openButtonText}>
                Open My Final Letter ❤️
              </Text>
            </View>

          </TouchableOpacity>

        </Animated.View>

      ) : (

        <Animated.View
          style={[
            styles.letterContainer,
            {
              opacity: Animated.multiply(
                letterOpacity,
                fadeOut
              ),
              transform: [
                {
                  translateY: letterTranslate,
                },
                {
                  scale: scaleDown,
                },
              ],
            },
          ]}
        >

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.letterTitle}>
              Dear You ❤️
            </Text>

            <Text style={styles.letterText}>
              If you're reading this...

              {"\n\n"}

              it means you've reached the very end
              of this little world that I built.

              {"\n\n"}

              Every page...

              Every flower...

              Every wish...

              Every memory...

              Every animation...

              was made while thinking about you.

              {"\n\n"}

              Maybe this isn't the biggest gift
              you've ever received.

              But I truly hope it's one of the
              most meaningful ones.

              {"\n\n"}

              Because this wasn't made with money.

              It was made with time.

              Patience.

              Late nights.

              Countless ideas.

              And most importantly...

              with love.

              {"\n\n"}

              Thank you...

              for every smile you've given me.

              Thank you...

              for being yourself.

              Thank you...

              for existing.

              {"\n\n"}

              If one day life gets difficult...

              I hope you'll open this app again.

              Maybe then...

              these little memories will remind
              you how incredibly special you are.

              {"\n\n"}

              Never stop smiling.

              Never stop dreaming.

              Never stop believing in yourself.

              {"\n\n"}

              Because you deserve every beautiful
              thing this world has to offer.

              {"\n\n"}

              And finally...

              thank you for taking this journey
              with me.

              {"\n\n"}

              ❤️

              {"\n\n"}

              With all my heart,

              {"\n\n"}

              — Manas
            </Text>

            <TouchableOpacity
              style={styles.finishButton}
              onPress={finishStory}
            >
              <Text style={styles.finishButtonText}>
                Finish Our Story ❤️
              </Text>
            </TouchableOpacity>

          </ScrollView>

        </Animated.View>

      )}

      <Animated.View
  pointerEvents="none"
  style={[
    {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#000",
    },
    {
      opacity: overlayOpacity,
    },
  ]}
/>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  envelope: {
    width: 220,
    height: 160,
    backgroundColor: "#FFF",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 12,

    marginBottom: 30,
  },

  envelopeEmoji: {
    fontSize: 70,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 35,
  },

  openButton: {
    backgroundColor: "#FF6B9A",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  openButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  letterContainer: {
    flex: 1,
    width: "100%",
    marginTop: 45,
    marginBottom: 20,

    backgroundColor: "#FFFDFB",

    borderRadius: 25,

    padding: 25,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.20,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 12,
  },

  letterTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 25,
  },

  letterText: {
    fontSize: 18,
    color: "#555",
    lineHeight: 34,
    textAlign: "left",
  },

  finishButton: {
    marginTop: 40,
    marginBottom: 20,

    backgroundColor: "#FF6B9A",

    paddingVertical: 16,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.30,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  finishButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});