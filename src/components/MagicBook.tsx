import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../themes/colors";

interface MagicBookProps {
  onOpen: () => void;
}

export default function MagicBook({
  onOpen,
}: MagicBookProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            { translateY: floatAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowAnim,
          },
        ]}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onOpen}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <View style={styles.book}>
          <View style={styles.spine} />

          <Text style={styles.bookEmoji}>📕</Text>

          <Text style={styles.title}>
            THE STORY
          </Text>

          <Text style={styles.subtitle}>
            OF YOU
          </Text>

          <Text style={styles.open}>
            Tap To Open
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },

  glow: {
    position: "absolute",
    width: 260,
    height: 340,
    borderRadius: 35,
    backgroundColor: "#FFD6E7",
  },

  book: {
    width: 220,
    height: 300,
    borderRadius: 18,
    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 12,
  },

  spine: {
    position: "absolute",
    left: 0,
    width: 18,
    height: "100%",
    backgroundColor: "#C2185B",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  bookEmoji: {
    fontSize: 60,
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },

  open: {
    position: "absolute",
    bottom: 25,
    color: "#fff",
    fontSize: 15,
    opacity: 0.9,
  },
});