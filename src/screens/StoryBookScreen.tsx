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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "StoryBook"
>;

const { width, height } = Dimensions.get("window");

const pages = [
  {
    title: "Our Little Story",
    subtitle: "Every beautiful story begins with a simple hello.",
    emoji: "🌅",
  },
  {
    title: "A Beautiful Beginning",
    subtitle:
      "Little did I know that meeting you would make ordinary days feel extraordinary.",
    emoji: "🌸",
  },
  {
    title: "Beautiful Memories",
    subtitle:
      "Some people become memories.\nSome become home.",
    emoji: "🌙",
  },
  {
    title: "This Story...",
    subtitle:
      "This story isn't about perfect moments.\nIt's about every little moment with you. ❤️",
    emoji: "💌",
  },
];

export default function StoryBookScreen({
  navigation,
}: Props) {

  const [page, setPage] = useState(-1);

  const fade = useRef(new Animated.Value(0)).current;

  const scale = useRef(new Animated.Value(1)).current;

  const pageTranslate = useRef(
    new Animated.Value(50)
  ).current;

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.03,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, []);

  useEffect(() => {

    if (page >= 0) {

      fade.setValue(0);
      pageTranslate.setValue(40);

      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pageTranslate, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

    }

  }, [page]);

  const nextPage = () => {

    if (page < pages.length - 1) {

      Animated.parallel([
        Animated.timing(fade, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(pageTranslate, {
          toValue: -40,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => {

        setPage((prev) => prev + 1);

      });

    } else {

      navigation.replace("Chapters");

    }

  };
    return (
    <LinearGradient
      colors={["#FFF8F3", "#FFF1EB", "#FFE8EF"]}
      style={styles.container}
    >
      {page === -1 ? (
        <Animated.View
          style={[
            styles.bookCover,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Text style={styles.bookEmoji}>📖</Text>

          <Text style={styles.bookTitle}>
            Our Little Story
          </Text>

          <Text style={styles.bookSubtitle}>
            Made with love,
            {"\n"}
            one page at a time ❤️
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.openButton}
            onPress={() => setPage(0)}
          >
            <Text style={styles.openButtonText}>
              Open The Book ❤️
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.page,
            {
              opacity: fade,
              transform: [
                {
                  translateX: pageTranslate,
                },
              ],
            },
          ]}
        >
          <Text style={styles.pageNumber}>
            {page + 1} / {pages.length}
          </Text>

          <Text style={styles.pageEmoji}>
            {pages[page].emoji}
          </Text>

          <Text style={styles.pageTitle}>
            {pages[page].title}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.pageText}>
            {pages[page].subtitle}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.nextButton}
            onPress={nextPage}
          >
            <Text style={styles.nextButtonText}>
              {page === pages.length - 1
                ? "Begin Our Journey ❤️"
                : "Next Page →"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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

  bookCover: {
    width: "92%",
    height: "75%",
    backgroundColor: "#FFFDF8",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 12,
  },

  bookEmoji: {
    fontSize: 70,
    marginBottom: 20,
  },

  bookTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#6A4E42",
    textAlign: "center",
    marginBottom: 15,
  },

  bookSubtitle: {
    fontSize: 18,
    color: "#7A6A63",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 50,
  },

  openButton: {
    backgroundColor: "#FF6B9A",
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  openButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  page: {
    width: "95%",
    minHeight: "78%",
    backgroundColor: "#FFFDF9",
    borderRadius: 25,
    padding: 25,

    justifyContent: "space-between",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 12,
  },

  pageNumber: {
    textAlign: "right",
    color: "#B8A7A0",
    fontSize: 15,
  },

  pageEmoji: {
    fontSize: 70,
    textAlign: "center",
    marginTop: 15,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6A4E42",
    textAlign: "center",
    marginTop: 20,
  },

  divider: {
    width: 90,
    height: 3,
    backgroundColor: "#FF6B9A",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 20,
  },

  pageText: {
    fontSize: 20,
    color: "#555555",
    textAlign: "center",
    lineHeight: 36,
    flex: 1,
    textAlignVertical: "center",
  },

  nextButton: {
    backgroundColor: "#FF6B9A",
    paddingVertical: 16,
    borderRadius: 25,
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

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});