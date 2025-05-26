import { Stack } from "expo-router/stack";
import React from "react";
import { StatusBar } from "react-native";
import "../global.css"
export default function Layout() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="projectPage" options={{ headerShown: false }} />
        <Stack.Screen name="accountPage" options={{ headerShown: false }} />
        <Stack.Screen name="connectionPage" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
