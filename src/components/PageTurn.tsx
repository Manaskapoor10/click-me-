import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface PageTurnProps {
  visible: boolean;
  onFinish: () => void;
}

export default function PageTurn({
  visible,
  onFinish,
}: PageTurnProps) {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    rotate.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 900,
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

  const rotateY = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.page,
          {
            opacity,
            transform: [
              { perspective: 1200 },
              { rotateY },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8FB",
    zIndex: 999,
  },

  page: {
    width: width * 0.92,
    height: height * 0.85,
    backgroundColor: "#FFFDF8",
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 15,
  },

});