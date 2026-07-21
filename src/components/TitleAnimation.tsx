import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
} from "react-native";

interface Props{
title:string;
}

export default function TitleAnimation({title}:Props){

const fade=useRef(new Animated.Value(0)).current;
const move=useRef(new Animated.Value(30)).current;

useEffect(()=>{

Animated.parallel([

Animated.timing(fade,{
toValue:1,
duration:900,
useNativeDriver:true,
}),

Animated.timing(move,{
toValue:0,
duration:900,
useNativeDriver:true,
})

]).start();

},[]);

return(

<Animated.Text

style={[

styles.title,

{

opacity:fade,

transform:[
{translateY:move}
]

}

]}

>

{title}

</Animated.Text>

);

}

const styles=StyleSheet.create({

title:{

fontSize:34,

fontWeight:"bold",

color:"#E91E63",

textAlign:"center",

marginVertical:20,

}

});