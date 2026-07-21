import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AboutScreen() {
  return (
    <LinearGradient
      colors={["#FFF8FB", "#FFEAF3", "#FFDCEB"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.chapter}>
          CHAPTER I
        </Text>

        <Text style={styles.title}>
          The Girl Who Changed Everything
        </Text>

        <View style={styles.divider} />

        <Text style={styles.paragraph}>
          Some people enter our lives quietly.
          {"\n\n"}
          They don't know they are about to become one of the most beautiful
          parts of someone else's story.
          {"\n\n"}
          This chapter is dedicated to someone who unknowingly made ordinary
          days feel extraordinary.
        </Text>

        <Text style={styles.quote}>
          "Sometimes one person changes your whole world without even trying."
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Why This Chapter Exists
          </Text>

          <Text style={styles.cardText}>
            Every great story deserves a beautiful beginning. This is the place
            where I wanted to express how meeting you made life feel a little
            brighter, a little happier, and much more meaningful.
          </Text>
        </View>

        <View style={styles.memoryBox}>
          <Text style={styles.memoryTitle}>
            🌸 A Small Note
          </Text>

          <Text style={styles.memoryText}>
            Thank you for simply being yourself.
            {"\n\n"}
            Whether you realize it or not,
            you inspire kindness,
            confidence,
            happiness,
            and countless smiles.
          </Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 25,
  },

  chapter: {
    fontSize: 16,
    letterSpacing: 3,
    color: "#E91E63",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
  },

  title: {
    marginTop: 15,
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },

  divider: {
    marginVertical: 25,
    height: 2,
    backgroundColor: "#F8BBD0",
    borderRadius: 10,
  },

  paragraph: {
    fontSize: 18,
    lineHeight: 32,
    color: "#555",
    textAlign: "justify",
  },

  quote: {
    marginTop: 35,
    fontSize: 22,
    color: "#E91E63",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "600",
  },

  card: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E91E63",
    marginBottom: 12,
  },

  cardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 28,
  },

  memoryBox: {
    marginTop: 30,
    backgroundColor: "#FFF4F8",
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: "#E91E63",
  },

  memoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#E91E63",
  },

  memoryText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 28,
  },
});