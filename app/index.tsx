import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from "react-native-reanimated";

const ORANGE = "#FF7A45";
const LOGO_SIZE = 92;

export default function AnimatedSplashScreen() {
  const router = useRouter();

  /*
   * The background circle starts at its real size.
   * It expands separately from the logo.
   */
  const backgroundScale = useSharedValue(1);

  /*
   * The logo is centered at the beginning.
   * It moves left only after the orange background has expanded.
   */
  const logoTranslateX = useSharedValue(0);
  const logoScale = useSharedValue(1);

  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(24);

  useEffect(() => {
    const backgroundDuration = 1000;
    const backgroundFinishDelay = 250;

    // Stage 1:
    // Expand the orange circle from the center until it covers the screen.
    backgroundScale.value = withDelay(
      backgroundFinishDelay,
      withTiming(18, {
        duration: backgroundDuration,
        easing: Easing.out(Easing.cubic),
      }),
    );

    // Stage 2:
    // After the background has filled the screen, move and shrink the logo.
    const logoStartDelay = 1450;

    logoTranslateX.value = withDelay(
      logoStartDelay,
      withTiming(-92, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );

    logoScale.value = withDelay(
      logoStartDelay,
      withTiming(0.72, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );

    // Stage 3:
    // Reveal the title beside the logo.
    titleOpacity.value = withDelay(
      logoStartDelay + 180,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
    );

    titleTranslateX.value = withDelay(
      logoStartDelay + 180,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
    );

    // Keep the completed transition visible, then open signup.
    const navigationTimer = setTimeout(() => {
      router.replace("/signup");
    }, 5000);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [
    backgroundScale,
    logoTranslateX,
    logoScale,
    titleOpacity,
    titleTranslateX,
    router,
  ]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundScale.value }],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: logoTranslateX.value },
      { scale: logoScale.value },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateX: titleTranslateX.value }],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={ORANGE} />

      <View style={styles.container}>
        {/* White background remains underneath the animation */}
        <View style={styles.whiteBackground} />

        {/* Separate orange circle used only for the background transition */}
        <Animated.View
          pointerEvents="none"
          style={[styles.backgroundCircle, backgroundAnimatedStyle]}
        />

        {/* Branding row remains above the orange background */}
        <View style={styles.brandingRow}>
          {/* Separate logo layer */}
          <Animated.View style={[styles.logo, logoAnimatedStyle]}>
            <Text style={styles.logoLetter}>S</Text>
          </Animated.View>

          {/* Title layer */}
          <Animated.Text style={[styles.title, titleAnimatedStyle]}>
            StudyMachan
          </Animated.Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  whiteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF",
  },

  backgroundCircle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ORANGE,
  },

  brandingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 110,
  },

  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ORANGE,
  },

  logoLetter: {
    color: "#FFFFFF",
    fontSize: 58,
    fontWeight: "900",
    lineHeight: 68,
  },

  title: {
    position: "absolute",
    marginLeft: 120,
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
