import React, { useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import theme, { Box, Text } from "./Theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCustomLockButtonIsOpen } from "@/store/global";

const { width } = Dimensions.get("window");

interface CustomLockButtonProps {
  googleSignInAction?: () => void;
  emailSignInAction?: () => void;
}

const CustomLockButton = ({
  googleSignInAction,
  emailSignInAction,
}: CustomLockButtonProps) => {
  const dispatch = useAppDispatch();
  // Use separate Animated Values for different animations
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { customLockButtonIsOpen } = useAppSelector((state) => state.global);

  // Icons to be displayed when tab bar is opened
  const icons = [
    {
      icon: <AntDesign name="form" size={24} color="black" />,
      text: (
        <>
          Sign in With
          {"\n"}Email and Password
        </>
      ),
      onPress: () => {
        emailSignInAction && emailSignInAction(); // Fixing the missing function call
      },
    },
    {
      icon: <AntDesign name="google" size={24} color="black" />,
      text: (
        <>
          Sign in With
          {"\n"}Google
        </>
      ),
      onPress: () => {
        googleSignInAction && googleSignInAction(); // Fixing the missing function call
      },
    },
  ];

  useEffect(() => {
    // Parallel animations with useNativeDriver set to true
    Animated.parallel([
      Animated.spring(rotationAnim, {
        toValue: customLockButtonIsOpen ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.spring(translateYAnim, {
        toValue: customLockButtonIsOpen ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.spring(opacityAnim, {
        toValue: customLockButtonIsOpen ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
    ]).start();
  }, [customLockButtonIsOpen]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    dispatch(setCustomLockButtonIsOpen(!customLockButtonIsOpen));
  };

  const iconTranslateY = translateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  const iconOpacity = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      {/* Main Button */}
      <Animated.View style={[styles.mainButton]}>
        <TouchableOpacity onPress={handlePress}>
          <Box style={styles.pulseAction}>
            <Feather name="lock" size={32} color="black" />
          </Box>
        </TouchableOpacity>
      </Animated.View>

      {/* Expandable Icons */}
      {customLockButtonIsOpen && (
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ translateY: iconTranslateY }],
              opacity: iconOpacity,
            },
          ]}
        >
          {icons.map((item, index) => (
            <View style={{ alignItems: "center" }} key={index}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={item.onPress}
              >
                {item.icon}
              </TouchableOpacity>
              <Text mt="s" textAlign="center">
                {item.text}
              </Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: hp(2),
    alignSelf: "center",
    alignItems: "center",
  },
  mainButton: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(3.5),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: hp(12),
    left: wp(-41),
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconButton: {
    marginHorizontal: hp(8),
    padding: 12,
    backgroundColor: theme.colors.bg1,
    borderRadius: 25,
  },
  pulseAction: {
    // backgroundColor: theme.colors.bg4,
    height: hp(8),
    width: hp(8),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomLockButton;
