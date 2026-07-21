import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import StoryBookScreen from "../screens/StoryBookScreen";
import HomeScreen from "../screens/HomeScreen";
import ChapterSelectionScreen from "../screens/ChapterSelectionScreen";
import AboutScreen from "../screens/AboutScreen";
import ComplimentsScreen from "../screens/ComplimentsScreen";
import LettersScreen from "../screens/LettersScreen";
import SecretGardenScreen from "../screens/SecretGardenScreen";
import WishTreeScreen from "../screens/WishTreeScreen";
import GalleryScreen from "../screens/GalleryScreen";
import MusicScreen from "../screens/MusicScreen";
import FinalLetterScreen from "../screens/FinalLetterScreen";

export type RootStackParamList = {
  Splash: undefined;
  StoryBook: undefined;
  Home: undefined;
  Chapters: undefined;
  About: undefined;
  Compliments: undefined;
  Letters: undefined;
  Gallery: undefined;
  Music: undefined;
  WishTree: undefined;
  SecretGarden: undefined;
  FinalLetter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
  initialRouteName="Splash"
  screenOptions={{
    headerShown: false,

    animation: "fade",

    animationDuration: 700,

    gestureEnabled: true,

    contentStyle: {
      backgroundColor: "#FFF9F7",
    },
  }}
>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="StoryBook" component={StoryBookScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chapters" component={ChapterSelectionScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Compliments" component={ComplimentsScreen} />
      <Stack.Screen name="Letters" component={LettersScreen} />
      <Stack.Screen name="SecretGarden" component={SecretGardenScreen} />
      <Stack.Screen name="WishTree" component={WishTreeScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="FinalLetter" component={FinalLetterScreen} />
    </Stack.Navigator>
  );
}