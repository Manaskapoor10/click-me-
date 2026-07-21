import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function FloatingButterflies() {

  const butterfly1X = useRef(new Animated.Value(-60)).current;
  const butterfly1Y = useRef(new Animated.Value(height * 0.35)).current;

  const butterfly2X = useRef(new Animated.Value(width + 60)).current;
  const butterfly2Y = useRef(new Animated.Value(height * 0.6)).current;

  const butterfly3X = useRef(new Animated.Value(-100)).current;
  const butterfly3Y = useRef(new Animated.Value(height * 0.8)).current;

  useEffect(() => {

    Animated.loop(
      Animated.parallel([

        Animated.timing(butterfly1X,{
          toValue:width + 60,
          duration:18000,
          useNativeDriver:true,
        }),

        Animated.sequence([

          Animated.timing(butterfly1Y,{
            toValue:height*0.25,
            duration:4000,
            useNativeDriver:true,
          }),

          Animated.timing(butterfly1Y,{
            toValue:height*0.40,
            duration:4000,
            useNativeDriver:true,
          }),

        ])

      ])
    ).start();

    Animated.loop(
      Animated.parallel([

        Animated.timing(butterfly2X,{
          toValue:-60,
          duration:22000,
          useNativeDriver:true,
        }),

        Animated.sequence([

          Animated.timing(butterfly2Y,{
            toValue:height*0.45,
            duration:5000,
            useNativeDriver:true,
          }),

          Animated.timing(butterfly2Y,{
            toValue:height*0.65,
            duration:5000,
            useNativeDriver:true,
          }),

        ])

      ])
    ).start();

    Animated.loop(
      Animated.parallel([

        Animated.timing(butterfly3X,{
          toValue:width+80,
          duration:25000,
          useNativeDriver:true,
        }),

        Animated.sequence([

          Animated.timing(butterfly3Y,{
            toValue:height*0.72,
            duration:5000,
            useNativeDriver:true,
          }),

          Animated.timing(butterfly3Y,{
            toValue:height*0.88,
            duration:5000,
            useNativeDriver:true,
          }),

        ])

      ])
    ).start();

  }, []);

  return (

    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >

      <Animated.Text
        style={[
          styles.butterfly,
          {
            transform:[
              {translateX:butterfly1X},
              {translateY:butterfly1Y},
            ]
          }
        ]}
      >
        🦋
      </Animated.Text>

      <Animated.Text
        style={[
          styles.butterfly,
          {
            fontSize:30,
            transform:[
              {translateX:butterfly2X},
              {translateY:butterfly2Y},
            ]
          }
        ]}
      >
        🦋
      </Animated.Text>

      <Animated.Text
        style={[
          styles.butterfly,
          {
            fontSize:24,
            transform:[
              {translateX:butterfly3X},
              {translateY:butterfly3Y},
            ]
          }
        ]}
      >
        🦋
      </Animated.Text>

    </View>

  );

}

const styles = StyleSheet.create({

  butterfly:{
    position:"absolute",
    fontSize:38,
  },

});