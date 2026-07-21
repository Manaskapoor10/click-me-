import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HEARTS = [
  { left: width * 0.15, delay: 0 },
  { left: width * 0.35, delay: 1200 },
  { left: width * 0.55, delay: 2400 },
  { left: width * 0.75, delay: 3600 },
];

function Heart({
  left,
  delay,
}: {
  left: number;
  delay: number;
}) {
  const translateY = useRef(new Animated.Value(height + 80)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateY.setValue(height + 80);
      opacity.setValue(0);
      scale.setValue(0.7);

      Animated.sequence([
        Animated.delay(delay),

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -120,
            duration: 7000,
            useNativeDriver: true,
          }),

          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),

          Animated.timing(scale, {
            toValue: 1.2,
            duration: 7000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => startAnimation());
    };

    startAnimation();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.heart,
        {
          left,
          opacity,
          transform: [
            { translateY },
            { scale },
          ],
        },
      ]}
    >
      ❤️
    </Animated.Text>
  );
}

export default function FloatingHearts() {
  return (
    <>
      {HEARTS.map((heart, index) => (
        <Heart
          key={index}
          left={heart.left}
          delay={heart.delay}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    bottom: -50,
    fontSize: 28,
  },
});