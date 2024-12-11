import { Entypo } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";

import theme, { Box, Text } from "./Theme";

export interface InputFieldProps extends TextInputProps {
  type: "number" | "input";
  placeholder: string | any;
  secured?: boolean;
  email?: boolean;
  inputRef?: any;
  error?: string;
  width?: number;
  height?: number;
  search?: boolean;
  bgColor?: string;
}

const TextInput: FC<InputFieldProps> = ({
  placeholder,
  secured,
  email,
  type,
  inputRef,
  error,
  width,
  search,
  bgColor,
  height: heightValue,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Box
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: width || theme.layout.screenWidth,
        marginTop: -3,
        borderRadius: 5,
      }}
    >
      <Box
        style={[
          styles.inputContainer,
          {
            borderRadius: 12,
            height: heightValue ? heightValue : 48,
            zIndex: 30,
          },
        ]}
      >
        <Box
          style={[
            styles.inputContainer,
            {
              borderRadius: 12,
              height: heightValue ? heightValue : 48,
              backgroundColor: bgColor,
              // width: wp(30),
            },
          ]}
        >
          <RNTextInput
            placeholder={placeholder}
            style={[
              styles.input,
              {
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingTop: props.multiline ? 15 : undefined,
                width: width || theme.layout.screenWidth,
                height: heightValue ?? 48,
                borderRadius: 12,
                paddingLeft: search ? 48 : 10,
                textAlign: "left",
              },
            ]}
            placeholderTextColor={theme.colors.border}
            ref={inputRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            secureTextEntry={secured ? !visible : false}
          />

          {secured && (
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={styles.eye}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              {visible ? (
                <Entypo name="eye" size={17} color={theme.colors.gray} />
              ) : (
                <Entypo name="eye" size={17} color={theme.colors.gray} />
              )}
            </TouchableOpacity>
          )}

          {email && (
            <TouchableOpacity style={styles.eye}>
              <Feather name="mail" size={17} color={theme.colors.gray} />
            </TouchableOpacity>
          )}

          {search && (
            <TouchableOpacity style={styles.search}>
              <Feather name="search" size={18} color={theme.colors.gray} />
            </TouchableOpacity>
          )}

          {error && (
            <Box style={[styles.error, { right: 10 }]}>
              <Text variant="text2" color="error">
                {error}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    // backgroundColor: theme.colors.inputPink,
    paddingHorizontal: 15,
    fontFamily: "Lexend-Regular",
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  eye: {
    position: "absolute",
    right: 20,
  },
  flag: {
    position: "absolute",
    zIndex: 10,
    marginLeft: 15,
    flexDirection: "row",
    borderRightWidth: 1.5,
    height: 41,
    alignItems: "center",
    borderColor: theme.colors.border,
    paddingRight: 15,
  },
  search: {
    position: "absolute",
    zIndex: 10,
    marginLeft: 15,
    flexDirection: "row",
    marginRight: wp(2),
  },
  error: {
    position: "absolute",
    top: 28,
  },
  location: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
});

export default TextInput;
