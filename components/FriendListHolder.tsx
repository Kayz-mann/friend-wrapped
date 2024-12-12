import React from "react";
import { StyleSheet, View, Image } from "react-native";

import FriendCardIcon from "@/assets/svgs/FriendCardIcon";
import theme, { Text } from "./Theme";

interface FriendListHolderProps {
  contactInfo?: {
    contactImage?: string;
    contactName?: string;
  };
}

const FriendListHolder = ({ contactInfo }: FriendListHolderProps) => {
  const emptyStateText = "No friend\nInvited yet";

  // Function to get initials from contact name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  // Function to split the contact name into two lines
  const splitName = (name: string) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
      };
    }
    return {
      firstName: name,
      lastName: "",
    };
  };

  const { firstName, lastName } = contactInfo?.contactName
    ? splitName(contactInfo.contactName)
    : { firstName: "", lastName: "" };

  return (
    <View style={styles.container}>
      {contactInfo?.contactImage ? (
        <Image
          style={styles.image}
          source={{ uri: contactInfo.contactImage }}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.roundedContainer}>
          {contactInfo?.contactName && !contactInfo.contactImage ? (
            <Text style={styles.initialsText}>
              {getInitials(contactInfo.contactName || "")}
            </Text>
          ) : (
            <FriendCardIcon />
          )}
        </View>
      )}
      <View style={styles.nameContainer}>
        {contactInfo?.contactName ? (
          <>
            <Text textAlign="center" mt="m" variant="text4">
              {firstName}
            </Text>
            {lastName ? (
              <Text textAlign="center" variant="text4">
                {lastName}
              </Text>
            ) : null}
          </>
        ) : (
          <Text textAlign="center" mt="m" variant="text4">
            {emptyStateText}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FriendListHolder;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  roundedContainer: {
    height: 48,
    width: 48,
    borderRadius: 72,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg2,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 72,
  },
  initialsText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  nameContainer: {
    alignItems: "center", // Ensure names are centered
  },
  nameText: {
    fontSize: 16,
    // color: theme.colors.text,
  },
});
