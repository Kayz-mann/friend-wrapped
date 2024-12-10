import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import theme, { Box, Text } from "./Theme";

type DimensionValue = number | string | undefined;

interface Props {
  type: "primary" | "secondary" | "alert" | "secondaryAlert";
  label: string;
  onPress: () => void;
  width?: DimensionValue;
  loading?: boolean;
  disabled?: boolean;
  height?: number;
  radius?: any;
  icon?: React.ReactNode;
  addBorder?: boolean;
  addErrorBorder?: boolean;
}

const Button: FC<Props> = ({
  type,
  label,
  onPress,
  width,
  loading,
  disabled,
  height,
  radius,
  icon,
  addBorder,
  addErrorBorder,
}) => {
  const returnBgColor = () => {
    if (type === "primary" && !disabled) return theme.colors.primary;
    // if (type === "alert" && !disabled) return theme.colors.error;
    if (type === "secondary" && !disabled) return theme.colors.bg;
    // if (type === "secondaryAlert" && !disabled) return theme.colors.secondary;
    // if (type === "primary" && disabled) return theme.colors.border;
  };

  return (
    <Box
      style={{
        // borderColor: addErrorBorder
        //   ? theme.colors.error
        //   : addErrorBorder
        //   ? theme.colors.error
        //   : "none",
        // borderWidth: addErrorBorder ? 1 : 0,
        borderRadius: 8,
      }}
    >
      <Box
        style={{
          borderColor: addBorder
            ? // ? theme.colors.bg
              // : addErrorBorder
              theme.colors.error
            : "none",
          borderWidth: addBorder ? 1 : 0,
          borderRadius: 12,
        }}
      >
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.6}
          style={[
            styles.container,
            {
              backgroundColor: returnBgColor(),
              width: width || theme.layout.screenWidth,
              height: height ? height : 56,
              borderRadius: radius ? 32 : 8,
              borderWidth: type === "secondary" ? 1 : 0,
              borderColor:
                type === "secondary"
                  ? theme.colors.primary
                  : // : type === "secondaryAlert"
                    // ? theme.colors.primary
                    "bg",
              shadowColor:
                type === "primary"
                  ? theme.colors.primary
                  : type === "alert"
                  ? theme.colors.primary
                  : "none",
              shadowOpacity: type === "primary" ? 0.6 : 0,
              shadowRadius: type === "primary" ? 2 : 0,
              elevation: type === "primary" ? 6 : 0,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            } as ViewStyle,
          ]}
          onPress={!disabled ? onPress : () => true}
        >
          {loading ? (
            <ActivityIndicator
              color={
                type === "primary" ? theme.colors.bg : theme.colors.primary
              }
            />
          ) : (
            <Box style={styles.flex}>
              {type === "secondaryAlert" ? (
                <Text variant="text2" color={"primary"}>
                  {label}
                </Text>
              ) : (
                <Text
                  variant="text2"
                  color={
                    type === "primary"
                      ? "bg"
                      : type === "alert"
                      ? "bg"
                      : "primary"
                  }
                >
                  {label}
                </Text>
              )}

              {icon && <Box ml="s">{icon}</Box>}
            </Box>
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Button;
