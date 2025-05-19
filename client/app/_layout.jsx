import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/context/UserContext";
import { PhotoProvider } from "@/context/PhotoContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratExtraBold: require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      if (isLoggedIn) {
        router.replace("(tabs)");
      } else {
        router.replace("openScreen");
      }
    }
  }, [loaded, isLoggedIn]);

  if (!loaded) {
    return null;
  }

  return (
    <PhotoProvider>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen
                name="openScreen/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="openScreen/authForms/register"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="details/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="update/update"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="add/index" options={{ headerShown: false }} />
            </Stack>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserProvider>
    </PhotoProvider>
  );
}
