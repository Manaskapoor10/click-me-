import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Colors from "../themes/colors";

interface ChapterCardProps {
  chapter: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export default function ChapterCard({
  chapter,
  title,
  subtitle,
  icon,
  color,
  onPress,
}: ChapterCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            borderLeftColor: color,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.chapter}>{chapter}</Text>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 22,
    padding: 18,
    marginVertical: 10,
    borderLeftWidth: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F8",
  },

  icon: {
    fontSize: 32,
  },

  content: {
    flex: 1,
    marginLeft: 18,
  },

  chapter: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  title: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },

  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  arrow: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: "bold",
  },
});