import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function FloatingFireflies() {
  const fireflies = [...Array(15)].map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    move: new Animated.Value(0),
    opacity: new Animated.Value(Math.random()),
  }));

  useEffect(() => {
    fireflies.forEach((firefly) => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(firefly.move, {
              toValue: -40,
              duration: 3000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.timing(firefly.move, {
              toValue: 0,
              duration: 3000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
          ]),

          Animated.sequence([
            Animated.timing(firefly.opacity, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(firefly.opacity, {
              toValue: 0.2,
              duration: 1200,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {fireflies.map((firefly, index) => (
        <Animated.View
          key={index}
          style={[
            styles.firefly,
            {
              left: firefly.x,
              top: firefly.y,
              opacity: firefly.opacity,
              transform: [
                {
                  translateY: firefly.move,
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  firefly: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF176",

    shadowColor: "#FFF176",
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 10,
  },
});