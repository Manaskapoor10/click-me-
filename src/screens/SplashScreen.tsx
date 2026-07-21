import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Heart beating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Hold splash for 10 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("Home");
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <LinearGradient
        colors={["#FFE6F0", "#FFD6E8", "#FFF5F8"]}
        style={styles.gradient}
      >
        <Animated.Text
          style={[
            styles.heart,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          ❤️
        </Animated.Text>

        <Text style={styles.title}>Dear Her</Text>

        <Text style={styles.subtitle}>
          Made with love,{'\n'}just for you.
        </Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heart: {
    fontSize: 90,
    marginBottom: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FF4D88",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 22,
    color: "#555",
    textAlign: "center",
    lineHeight: 34,
  },
});