import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Letters"
>;

const { width } = Dimensions.get("window");

const letters = [
  {
    title: "The First Hello",
    content:
      "Some people enter our lives quietly, but somehow they leave the loudest memories. I still smile when I think about the beginning of our story. ❤️",
  },
  {
    title: "What I Admire",
    content:
      "Your smile, your kindness, your patience, and the way you make ordinary days feel special are things I will always admire.",
  },
  {
    title: "A Favorite Memory",
    content:
      "Every little moment we've shared has become a memory I treasure. Even the smallest conversations are priceless to me.",
  },
  {
    title: "Thank You",
    content:
      "Thank you for every smile, every laugh, every conversation and every moment you've unknowingly made beautiful.",
  },
  {
    title: "Until Next Time",
    content:
      "No matter where life takes us, I hope this little story always reminds you that someone cared enough to create it just for you. ❤️",
  },
];

export default function LettersScreen({
  navigation,
}: Props) {

  const [opened, setOpened] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  const boxScale = useRef(new Animated.Value(1)).current;
  const lidRotate = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(40)).current;

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(boxScale,{
          toValue:1.03,
          duration:1800,
          useNativeDriver:true,
        }),
        Animated.timing(boxScale,{
          toValue:1,
          duration:1800,
          useNativeDriver:true,
        }),
      ])
    ).start();

  }, []);

  const openBox = () => {

    Animated.sequence([

      Animated.spring(boxScale,{
        toValue:0.96,
        friction:5,
        useNativeDriver:true,
      }),

      Animated.timing(lidRotate,{
        toValue:1,
        duration:700,
        useNativeDriver:true,
      }),

    ]).start(() => {

      setOpened(true);

      Animated.parallel([

        Animated.timing(cardOpacity,{
          toValue:1,
          duration:700,
          useNativeDriver:true,
        }),

        Animated.spring(cardTranslate,{
          toValue:0,
          friction:6,
          useNativeDriver:true,
        }),

      ]).start();

    });

  };

  const openLetter = (index:number) => {
    setSelectedLetter(index);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };
    const lidRotation = lidRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-120deg"],
  });

  return (
    <LinearGradient
      colors={["#FFF8F3", "#FFEAEF", "#FFF5F8"]}
      style={styles.container}
    >
      {!opened ? (

        <Animated.View
          style={{
            transform: [{ scale: boxScale }],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openBox}
          >

            <View style={styles.boxContainer}>

              <Animated.View
                style={[
                  styles.boxLid,
                  {
                    transform: [
                      {
                        rotateX: lidRotation,
                      },
                    ],
                  },
                ]}
              />

              <View style={styles.boxBody}>
                <Text style={styles.boxEmoji}>
                  💝
                </Text>
              </View>

            </View>

            <Text style={styles.title}>
              Memory Box
            </Text>

            <Text style={styles.subtitle}>
              Some words are too precious
              {"\n"}
              to ever be forgotten.
            </Text>

            <View style={styles.openButton}>
              <Text style={styles.openButtonText}>
                Open The Box ❤️
              </Text>
            </View>

          </TouchableOpacity>
        </Animated.View>

      ) : (

        <Animated.View
          style={[
            styles.lettersContainer,
            {
              opacity: cardOpacity,
              transform: [
                {
                  translateY: cardTranslate,
                },
              ],
            },
          ]}
        >

          <Text style={styles.heading}>
            Choose a Letter 💌
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            {letters.map((item, index) => (

              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                style={styles.letterCard}
                onPress={() => openLetter(index)}
              >

                <Text style={styles.letterEmoji}>
                  💌
                </Text>

                <View style={{ flex: 1 }}>

                  <Text style={styles.letterTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.letterHint}>
                    Tap to read this letter
                  </Text>

                </View>

                <Text style={styles.arrow}>
                  →
                </Text>

              </TouchableOpacity>

            ))}

          </ScrollView>

          {selectedLetter !== null && (

            <View style={styles.popup}>

              <ScrollView>

                <Text style={styles.popupTitle}>
                  {letters[selectedLetter].title}
                </Text>

                <Text style={styles.popupText}>
                  {letters[selectedLetter].content}
                </Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeLetter}
                >
                  <Text style={styles.closeButtonText}>
                    Close ❤️
                  </Text>
                </TouchableOpacity>

              </ScrollView>

            </View>

          )}

        </Animated.View>

      )}

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

  boxContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  boxBody: {
    width: 220,
    height: 140,
    backgroundColor: "#D8A15D",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  boxLid: {
    width: 220,
    height: 35,
    backgroundColor: "#C98B45",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: -5,
  },

  boxEmoji: {
    fontSize: 55,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 35,
  },

  openButton: {
    backgroundColor: "#FF6B9A",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignSelf: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  openButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  lettersContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 25,
  },

  letterCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#FF6B9A",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  letterEmoji: {
    fontSize: 32,
    marginRight: 18,
  },

  letterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D4037",
  },

  letterHint: {
    marginTop: 4,
    color: "#888",
    fontSize: 14,
  },

  arrow: {
    fontSize: 28,
    color: "#FF6B9A",
    fontWeight: "bold",
  },

  popup: {
    position: "absolute",
    top: "12%",
    left: 15,
    right: 15,
    bottom: "8%",

    backgroundColor: "#FFFDF9",
    borderRadius: 25,
    padding: 25,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 15,
  },

  popupTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 20,
  },

  popupText: {
    fontSize: 18,
    color: "#555",
    lineHeight: 34,
    textAlign: "center",
  },

  closeButton: {
    marginTop: 35,
    backgroundColor: "#FF6B9A",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});