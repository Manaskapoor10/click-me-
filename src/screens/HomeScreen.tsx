import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../themes/colors";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }: any) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
  navigation.navigate("StoryBook");
};

  return (
    <LinearGradient
      colors={["#FFF5F8", "#FFE5EF", "#FFD4E5"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.emoji}>🌸</Text>

        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.appName}>Dear Her</Text>

        <Text style={styles.quote}>
          "Some people inspire poems...
          {"\n"}
          You inspired an entire application."
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>
            Begin the Journey ❤️
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.footer}>
        Made with genuine admiration 💖
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: width * 0.9,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 30,
    padding: 35,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    color: Colors.text,
  },

  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.primary,
    marginVertical: 15,
  },

  quote: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 40,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 40,
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  footer: {
    position: "absolute",
    bottom: 40,
    color: "#666",
    fontSize: 14,
  },
});