import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StatusBar, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// Large enough to cover every corner once it reaches scale 1.
const CIRCLE_SIZE = Math.sqrt(width * width + height * height) * 1.4;

const BRAND_NAME = "StudyMachan";
const TYPE_SPEED_MS = 70;

export default function SplashScreen() {
  const router = useRouter();

  const circleScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const logoTranslateX = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  const [typedText, setTypedText] = useState("");
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finishSplash = () => {
    // Navigate directly to sign up after splash
    router.replace("/signup");
  };

  const startTyping = () => {
    let index = 0;

    typingTimerRef.current = setInterval(() => {
      index += 1;
      setTypedText(BRAND_NAME.slice(0, index));

      if (index === BRAND_NAME.length && typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;

        // Go straight to fade + navigate (no extra long delay)
        screenOpacity.value = withTiming(0, { duration: 450 }, (finished) => {
          if (finished) {
            runOnJS(finishSplash)();
          }
        });
      }
    }, TYPE_SPEED_MS);
  };

  useEffect(() => {
    // 1. White screen changes to orange as the central circle expands.
    circleScale.value = withTiming(1, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });

    // 2. Logo appears in the center after the orange reveal begins.
    logoOpacity.value = withDelay(
      450,
      withTiming(1, {
        duration: 350,
        easing: Easing.out(Easing.ease),
      }),
    );

    logoScale.value = withDelay(
      450,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.back(1.5)),
      }),
    );

    // 3. Logo shifts left, then the title starts typing on its right.
    logoTranslateX.value = withDelay(
      950,
      withTiming(
        -58,
        {
          duration: 300,
          easing: Easing.out(Easing.ease),
        },
        (finished) => {
          if (finished) {
            runOnJS(startTyping)();
          }
        },
      ),
    );

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  const wrapperStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const logoRowStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateX: logoTranslateX.value },
    ],
  }));

  return (
    <Animated.View style={[{ flex: 1 }, wrapperStyle]}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#FF7A45" />

        {/* Orange circle: starts at the centre and expands to cover the screen */}
        <Animated.View
          pointerEvents="none"
          style={[
            circleStyle,
            {
              position: "absolute",
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: "#FF7A45",
            },
          ]}
        />

        {/* Logo + text row */}
        <Animated.View
          style={[
            logoRowStyle,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              marginRight: 10,
              height: 44,
              width: 44,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 22,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image
              source={require("../../assets/images/studymachan-logo.png")}
              style={{ height: 28, width: 28 }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {typedText}
          </Text>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}
