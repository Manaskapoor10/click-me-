import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SecretGarden"
>;

const { width } = Dimensions.get("window");

const flowers = [
  {
    emoji: "🌸",
    message: "Your smile makes every day brighter. ❤️",
  },
  {
    emoji: "🌹",
    message: "You make ordinary moments unforgettable.",
  },
  {
    emoji: "🌺",
    message: "You are stronger than you realize.",
  },
  {
    emoji: "🌼",
    message: "Your kindness is your greatest beauty.",
  },
  {
    emoji: "🌷",
    message: "Being around you feels like home.",
  },
  {
    emoji: "💐",
    message: "Thank you for simply being you. ❤️",
  },
];

export default function SecretGardenScreen({
  navigation,
}: Props) {

  const [selectedFlower, setSelectedFlower] =
    useState<number | null>(null);

  const flowerScale = useRef(
    flowers.map(() => new Animated.Value(1))
  ).current;

  const messageOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const messageTranslate = useRef(
    new Animated.Value(30)
  ).current;

  const openFlower = (index: number) => {

    Animated.sequence([
      Animated.spring(flowerScale[index], {
        toValue: 1.25,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(flowerScale[index], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedFlower(index);

    messageOpacity.setValue(0);
    messageTranslate.setValue(30);

    Animated.parallel([
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(messageTranslate, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  };
    return (
    <LinearGradient
      colors={["#FFF8F5", "#FFEAF2", "#FFFDF8"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        🌸 Secret Garden 🌸
      </Text>

      <Text style={styles.subtitle}>
        Every flower is hiding something
        beautiful...
      </Text>

      <View style={styles.garden}>

        {flowers.map((flower, index) => (

          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => openFlower(index)}
          >
            <Animated.View
              style={[
                styles.flowerCard,
                {
                  transform: [
                    {
                      scale: flowerScale[index],
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.flowerEmoji}>
                {flower.emoji}
              </Text>
            </Animated.View>
          </TouchableOpacity>

        ))}

      </View>

      {selectedFlower !== null && (

        <Animated.View
          style={[
            styles.messageCard,
            {
              opacity: messageOpacity,
              transform: [
                {
                  translateY: messageTranslate,
                },
              ],
            },
          ]}

        >

          <Text style={styles.messageEmoji}>
            {flowers[selectedFlower].emoji}
          </Text>

          <Text style={styles.messageText}>
            {flowers[selectedFlower].message}
          </Text>

        </Animated.View>

      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Chapters")
        }
      >
        <Text style={styles.buttonText}>
          Back to Chapters ❤️
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
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
    marginTop: -10,
    marginBottom: 20,
    lineHeight: 28,
  },

  garden: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  flowerCard: {
    width: width * 0.25,
    height: width * 0.25,

    backgroundColor: "#FFFFFF",

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    margin: 12,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  flowerEmoji: {
    fontSize: 45,
  },

  messageCard: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 12,
  },

  messageEmoji: {
    fontSize: 45,
    textAlign: "center",
    marginBottom: 15,
  },

  messageText: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    lineHeight: 34,
  },

  button: {
    backgroundColor: "#FF6B9A",
    width: "90%",
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

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});