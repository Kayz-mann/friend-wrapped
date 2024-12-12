import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import theme, { Box } from "./Theme";
import { Easing } from "react-native-reanimated";
import { Shadows } from "@/constants/constants";

interface PulseProps {
  onPress?: () => void;
  icon: React.ReactNode;
  backgroundColor?: string;
  dotBackgroundColor?: string;
}

const Pulse = ({
  onPress,
  icon,
  backgroundColor,
  dotBackgroundColor,
}: PulseProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        style={[
          styles.dot,
          {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: dotBackgroundColor || "rgba(255, 255, 255, 0.12)",
          },
        ]}
      >
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              from={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={
                {
                  type: "timing",
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 1800,
                  repeatReverse: false,
                  loop: true, // Set loop to true for continuous pulsing
                } as any
              }
              key={index}
              style={[
                StyleSheet.absoluteFillObject,
                styles.dot,
                {
                  backgroundColor:
                    dotBackgroundColor || "rgba(255, 255, 255, 0.12)",
                },
              ]}
            />
          );
        })}
        <Box
          style={[
            styles.circle,
            { backgroundColor: backgroundColor || theme.colors.bg },
          ]}
        >
          {icon}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Pulse;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    height: 91,
    width: 91,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.large,
    zIndex: 1,
  },
  dot: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
});
