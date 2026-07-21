import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Chapters"
>;

const { width } = Dimensions.get("window");

const chapters = [
  {
    title: "Letters",
    emoji: "💌",
    screen: "Letters",
    subtitle: "Every word comes from my heart.",
  },
  {
    title: "Secret Garden",
    emoji: "🌸",
    screen: "SecretGarden",
    subtitle: "Beautiful memories bloom here.",
  },
  {
    title: "Wish Tree",
    emoji: "🌳",
    screen: "WishTree",
    subtitle: "Every wish has a story.",
  },
  {
    title: "Favorite Memory",
    emoji: "📸",
    screen: "Gallery",
    subtitle: "A moment I'll always treasure.",
  },
  {
    title: "Our Song",
    emoji: "🎵",
    screen: "Music",
    subtitle: "Every beat reminds me of you.",
  },
  {
    title: "Final Letter",
    emoji: "❤️",
    screen: "FinalLetter",
    subtitle: "The ending... or maybe a beginning.",
  },
];

export default function ChapterSelectionScreen({
  navigation,
}: Props) {

  const scaleAnimations = useRef(
    chapters.map(() => new Animated.Value(1))
  ).current;

  const pressCard = (
    index: number,
    screen: keyof RootStackParamList
  ) => {

    Animated.sequence([
      Animated.timing(scaleAnimations[index], {
        toValue: 0.95,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimations[index], {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(screen);
    });

  };
    return (
    <LinearGradient
      colors={["#FFF8F5", "#FFEAF2", "#FFF5FB"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}

        <Text style={styles.heading}>
          Our Journey ❤️
        </Text>

        <Text style={styles.subHeading}>
          Choose a chapter and continue
          our little story.
        </Text>

        {/* Progress */}

        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>
            Journey Progress
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressHeart}>❤️</Text>
            <Text style={styles.progressHeart}>❤️</Text>
            <Text style={styles.progressHeart}>🤍</Text>
            <Text style={styles.progressHeart}>🤍</Text>
            <Text style={styles.progressHeart}>🤍</Text>
            <Text style={styles.progressHeart}>🤍</Text>
          </View>
        </View>

        {/* Chapters */}

        {chapters.map((chapter, index) => (

          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() =>
              pressCard(
                index,
                chapter.screen as keyof RootStackParamList
              )
            }
          >
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [
                    {
                      scale: scaleAnimations[index],
                    },
                  ],
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {chapter.emoji}
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>
                  {chapter.title}
                </Text>

                <Text style={styles.cardSubtitle}>
                  {chapter.subtitle}
                </Text>
              </View>

              <Text style={styles.arrow}>
                →
              </Text>

            </Animated.View>
          </TouchableOpacity>

        ))}

        <Text style={styles.footer}>
          "Every chapter holds a memory."
        </Text>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 17,
    color: "#777",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 35,
  },

  progressContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 30,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5D4037",
    marginBottom: 12,
    textAlign: "center",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  progressHeart: {
    fontSize: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,

    padding: 18,

    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF1F5",

    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 34,
  },

  textContainer: {
    flex: 1,
    marginLeft: 18,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D4037",
  },

  cardSubtitle: {
    fontSize: 15,
    color: "#888",
    marginTop: 6,
    lineHeight: 22,
  },

  arrow: {
    fontSize: 28,
    color: "#FF6B9A",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 18,
    color: "#AA7B8A",
    fontStyle: "italic",
    marginBottom: 30,
  },
});