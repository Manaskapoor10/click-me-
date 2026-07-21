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
  "WishTree"
>;

const { width } = Dimensions.get("window");

const wishes = [
  {
    emoji: "🍃",
    title: "My First Wish",
    message:
      "I wish your smile never fades, because it brightens more than just your own day. ❤️",
  },
  {
    emoji: "🍃",
    title: "A Little Dream",
    message:
      "I hope every dream you carry finds its way into reality.",
  },
  {
    emoji: "🍃",
    title: "For Your Heart",
    message:
      "May your heart always find peace, no matter where life takes you.",
  },
  {
    emoji: "🍃",
    title: "For Your Future",
    message:
      "I wish success follows you in everything you choose to do.",
  },
  {
    emoji: "🍃",
    title: "A Forever Wish",
    message:
      "May happiness choose you every single day of your life.",
  },
  {
    emoji: "🍃",
    title: "One Last Wish",
    message:
      "And if one wish could come true for me... I'd wish to keep seeing you smile. ❤️",
  },
];

export default function WishTreeScreen({
  navigation,
}: Props) {

  const [selectedWish, setSelectedWish] =
    useState<number | null>(null);

  const leafAnimations = useRef(
    wishes.map(() => new Animated.Value(1))
  ).current;

  const cardOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const cardTranslate = useRef(
    new Animated.Value(30)
  ).current;

  const openWish = (index: number) => {

    Animated.sequence([

      Animated.timing(leafAnimations[index], {
        toValue: 1.25,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.spring(leafAnimations[index], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),

    ]).start();

    setSelectedWish(index);

    cardOpacity.setValue(0);
    cardTranslate.setValue(40);

    Animated.parallel([

      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.spring(cardTranslate, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),

    ]).start();

  };
    return (
    <LinearGradient
      colors={["#FFF8F5", "#FFEEDB", "#FFFDF7"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        🌳 Wish Tree 🌳
      </Text>

      <Text style={styles.subtitle}>
        Every leaf carries a wish made
        especially for you.
      </Text>

      {/* Tree */}

      <View style={styles.treeContainer}>

        <Text style={styles.tree}>🌳</Text>

        <View style={styles.leafContainer}>

          {wishes.map((wish, index) => (

            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => openWish(index)}
            >
              <Animated.View
                style={[
                  styles.leaf,
                  {
                    transform: [
                      {
                        scale: leafAnimations[index],
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.leafEmoji}>
                  {wish.emoji}
                </Text>
              </Animated.View>
            </TouchableOpacity>

          ))}

        </View>

      </View>

      {/* Wish Card */}

      {selectedWish !== null && (

        <Animated.View
          style={[
            styles.wishCard,
            {
              opacity: cardOpacity,
              transform: [
                {
                  translateY: cardTranslate,
                },
              ],
            },
          ]}
        >

          <Text style={styles.cardTitle}>
            {wishes[selectedWish].title}
          </Text>

          <Text style={styles.cardMessage}>
            {wishes[selectedWish].message}
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

  treeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  tree: {
    fontSize: 140,
    marginBottom: 15,
  },

  leafContainer: {
    width: width * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  leaf: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    margin: 10,

    shadowColor: "#4CAF50",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  leafEmoji: {
    fontSize: 32,
  },

  wishCard: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,

    shadowColor: "#4CAF50",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 18,
  },

  cardMessage: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 32,
  },

  button: {
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

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});