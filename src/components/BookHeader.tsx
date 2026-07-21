import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookHeader() {
  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        📖
      </Text>

      <Text style={styles.title}>
        THE STORY OF YOU
      </Text>

      <Text style={styles.subtitle}>
        Every chapter is written
        {"\n"}
        with love.
      </Text>

      <View style={styles.line} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  icon: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#E91E63",
    letterSpacing: 2,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },

  line: {
    marginTop: 25,
    width: "70%",
    height: 2,
    backgroundColor: "#F8BBD0",
    borderRadius: 20,
  },
});