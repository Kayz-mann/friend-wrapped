import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Contacts from "expo-contacts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { useContacts } from "@/hooks/useContacts";
import theme, { Text } from "./Theme";
import { useContactEngagement } from "@/hooks/useContactEngagement";
import { getDarkerShade, getRandomLightColor } from "@/constants/constants";

interface ContactEngagement {
  contactId: string;
  messageCount: number;
  lastInteractionDate: Date;
  callDuration: number;
}

interface ContactListProps {
  contactEngagement?: ContactEngagement[];
  onInvite?: (contact: Contacts.Contact) => void;
}

const ContactList = ({ contactEngagement, onInvite }: ContactListProps) => {
  const { contacts, permissionStatus, isLoading, error } = useContacts();
  const [invitedContacts, setInvitedContacts] = useState<Contacts.Contact[]>(
    []
  );
  const sortedContacts = useContactEngagement(contacts, contactEngagement);

  const getInitials = (contact: Contacts.Contact) => {
    if (contact.firstName && contact.lastName) {
      return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
    }
    if (contact.name) {
      const words = contact.name.split(" ");
      return words.length > 1
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : words[0][0].toUpperCase();
    }
    return "";
  };

  const handleInvite = (contact: Contacts.Contact) => {
    if (
      invitedContacts.length < 5 &&
      !invitedContacts.some((c) => c.id === contact.id)
    ) {
      setInvitedContacts((prev) => [...prev, contact]);
      if (onInvite) {
        onInvite(contact);
      }
    }
  };

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => {
    const backgroundColor = getRandomLightColor();
    const textColor = getDarkerShade(backgroundColor);

    const formattedLastName =
      item.lastName && item.lastName.length > 25
        ? `${item.lastName.charAt(0)}.`
        : item.lastName || "";

    return (
      <View style={styles.contactItem}>
        {item.imageAvailable ? (
          <Image
            source={{ uri: item.image?.uri }}
            style={styles.contactImage}
          />
        ) : (
          <View style={[styles.initialsContainer, { backgroundColor }]}>
            <Text style={[styles.initialsText, { color: textColor }]}>
              {getInitials(item)}
            </Text>
          </View>
        )}
        <Text variant="text6" color="text" style={styles.contactName}>
          {item.firstName || ""} {formattedLastName}
        </Text>
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => handleInvite(item)}
        >
          <MaterialIcons name="person-add" size={14} color="black" />
          <Text variant="text7" style={styles.inviteText}>
            Invite
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // If permission is not granted
  if (permissionStatus !== "granted") {
    return (
      <View style={styles.permissionContainer}>
        <Text>Contact permission not granted</Text>
      </View>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={sortedContacts}
      keyExtractor={(item) => item.id || ""}
      renderItem={renderContactItem}
      ListEmptyComponent={
        <View style={styles.permissionContainer}>
          <Text>No contacts found</Text>
        </View>
      }
      contentContainerStyle={styles.listContainer}
      style={styles.listStyle}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // padding: 10,
  },
  listStyle: {
    maxHeight: hp(30), // Limit list height to 30% of screen height
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: wp(85),
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initialsText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.bg1,
    borderRadius: 46,
    gap: 8,
  },
  inviteText: {
    marginLeft: 5,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default ContactList;
