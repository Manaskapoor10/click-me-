import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const compliments = [
  "Your smile can brighten even the darkest day. ☀️",
  "You make ordinary moments feel special. 💖",
  "Your kindness is one of your greatest strengths. 🌸",
  "You inspire people without even realizing it. ✨",
  "The world feels happier because you're in it. 🌍",
  "You're beautiful inside and out. 💕",
  "Every conversation with you becomes a beautiful memory. 📖",
  "You have a heart that's impossible not to admire. ❤️",
  "You make people feel comfortable just by being yourself. 🌹",
  "You are someone's favorite hello and hardest goodbye. 💌",
];

export default function ComplimentsScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <LinearGradient
      colors={["#FFF5F8", "#FFE4EE", "#FFD6E7"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          Chapter II
        </Text>

        <Text style={styles.title}>
          Things I Admire
        </Text>

        <Text style={styles.subtitle}>
          Tap a card to reveal a compliment.
        </Text>

        {compliments.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() =>
              setSelected(selected === index ? null : index)
            }
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                💖 Compliment {index + 1}
              </Text>

              <Text style={styles.cardText}>
                {selected === index
                  ? item
                  : "Tap to reveal..."}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  heading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    letterSpacing: 3,
    color: "#E91E63",
    fontWeight: "700",
  },

  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E91E63",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 17,
    color: "#555",
    lineHeight: 28,
  },
});