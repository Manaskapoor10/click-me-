import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  onFinish: () => void;
}

export default function BookOpeningAnimation({
  visible,
  onFinish,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    opacity.setValue(1);
    scale.setValue(1);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 2.2,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.Text
        style={[
          styles.book,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        📖
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F8",
    zIndex: 999,
  },

  book: {
    fontSize: 120,
  },
});