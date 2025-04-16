import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="MenuPages" options={{ headerShown: false }} />
        <Stack.Screen name="AccountPages" options={{ headerShown: false }} />
        <Stack.Screen name="ConnectionPages" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
