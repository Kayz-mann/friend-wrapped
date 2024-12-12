import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme, { Box, Text } from "./Theme";

type InviteProgressButtonProps = {
  invitedContacts: number; // Number of invited contacts
  onPress: () => void;
};

const InviteProgressButton = ({
  invitedContacts,
  onPress,
}: InviteProgressButtonProps) => {
  // Calculate the progress as a percentage
  //   const progress = Math.min((invitedContacts / 5) * 100, 100);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.inviteButton}
      onPress={onPress}
    >
      <Box style={styles.flex}>
        <Octicons name="link-external" size={24} color="white" />
        <Text ml="m" variant="text8" color="bg">
          Invite 5 friends
        </Text>
      </Box>

      <Box style={styles.count}>
        <Text variant="text9" color="bg">{`${invitedContacts}/5`}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default InviteProgressButton;

const styles = StyleSheet.create({
  inviteButton: {
    width: wp(90),
    borderRadius: 50,
    height: 64,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    marginTop: hp(1),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 50,
    borderColor: theme.colors.border4,
  },
});
