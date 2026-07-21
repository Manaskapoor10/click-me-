import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
} from "react-native";

export default function GlowBackground() {

  const glow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow,{
          toValue:1,
          duration:2500,
          useNativeDriver:false,
        }),

        Animated.timing(glow,{
          toValue:0.4,
          duration:2500,
          useNativeDriver:false,
        }),
      ])
    ).start();

  },[]);

  return(

    <Animated.View
      style={[
        styles.glow,
        {
          opacity:glow,
        }
      ]}
    />

  );
}

const styles=StyleSheet.create({

glow:{

position:"absolute",

top:-120,

left:-60,

width:500,

height:500,

borderRadius:250,

backgroundColor:"#FFD6E7",

}

});