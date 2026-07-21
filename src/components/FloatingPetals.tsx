import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface PetalProps {
  left: number;
  delay: number;
  emoji: string;
}

function Petal({ left, delay, emoji }: PetalProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateY.setValue(-100);
      translateX.setValue(0);
      rotate.setValue(0);
      opacity.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(translateY, {
            toValue: height + 100,
            duration: 9000,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.delay(delay),
          Animated.loop(
            Animated.sequence([
              Animated.timing(translateX, {
                toValue: 25,
                duration: 1200,
                useNativeDriver: true,
              }),

              Animated.timing(translateX, {
                toValue: -25,
                duration: 1200,
                useNativeDriver: true,
              }),
            ])
          ),
        ]),

        Animated.sequence([
          Animated.delay(delay),
          Animated.loop(
            Animated.timing(rotate, {
              toValue: 1,
              duration: 2500,
              useNativeDriver: true,
            })
          ),
        ]),
      ]).start(() => startAnimation());
    };

    startAnimation();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Text
      style={[
        styles.petal,
        {
          left,
          opacity,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotation },
          ],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

export default function FloatingPetals() {
  return (
    <>
      <Petal left={width * 0.12} delay={0} emoji="🌸" />
      <Petal left={width * 0.28} delay={1200} emoji="🌺" />
      <Petal left={width * 0.48} delay={2500} emoji="🌸" />
      <Petal left={width * 0.68} delay={3600} emoji="🌷" />
      <Petal left={width * 0.84} delay={4700} emoji="🌸" />
    </>
  );
}

const styles = StyleSheet.create({
  petal: {
    position: "absolute",
    top: -80,
    fontSize: 28,
    opacity: 0.8,
  },
});