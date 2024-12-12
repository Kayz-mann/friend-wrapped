import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Contacts from "expo-contacts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useForm } from "react-hook-form";
import RNBounceable from "@freakycoder/react-native-bounceable";

import { useContacts } from "@/hooks/useContacts";
import theme, { Text } from "./Theme";
import { useContactEngagement } from "@/hooks/useContactEngagement";
import {
  getDarkerShade,
  getRandomLightColor,
  Shadows,
} from "@/constants/constants";
import FormInput from "./FormInput";
import ListEmptyCompontent from "./ListEmptyCompontent";

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
  const { control, watch } = useForm();
  const searchQuery = watch("search");
  const { contacts, permissionStatus, isLoading, error } = useContacts();
  const [invitedContacts, setInvitedContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const sortedContacts = useContactEngagement(contacts, contactEngagement);

  // Filter contacts based on the search query
  const filteredContacts = sortedContacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().includes(searchQuery?.toLowerCase() || "");
  });

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
    const contactId = contact.id as string;

    if (
      invitedContacts.length < 5 &&
      !invitedContacts.some((c) => c.id === contactId)
    ) {
      // Set loading state to true for this contact
      setLoadingStates((prev) => ({
        ...prev,
        [contactId]: true, // Set loading state to true when invitation starts
      }));

      setTimeout(() => {
        setInvitedContacts((prev) => [...prev, contact]);
        setLoadingStates((prev) => ({
          ...prev,
          [contactId]: false, // Set loading state to false after 2 seconds
        }));
        if (onInvite) {
          onInvite(contact);
        }
      }, 2000);
    }
  };

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => {
    const backgroundColor = getRandomLightColor();
    const textColor = getDarkerShade(backgroundColor);

    const isInvited = invitedContacts.some((c) => c.id === item.id);

    const loadingState = item.id ? loadingStates[item.id] : undefined;

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

        <RNBounceable
          hitSlop={{ right: 10, left: 10, bottom: 10, top: 10 }}
          style={styles.inviteButton}
          onPress={() => handleInvite(item)}
        >
          {loadingState ? (
            <ActivityIndicator size={8} color="black" />
          ) : isInvited ? (
            <Text style={{ fontSize: 10 }}>💌</Text>
          ) : (
            <MaterialIcons name="person-add" size={14} color="black" />
          )}
          <Text variant="text7" style={styles.inviteText}>
            Invite
          </Text>
        </RNBounceable>
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
    <View style={{ alignItems: "center" }}>
      <FormInput
        control={control}
        name={"search"}
        type={"input"}
        height={50}
        search
        placeholder={"Search contacts"}
        style={styles.formStyle}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredContacts}
        keyExtractor={(item) => item.id || ""}
        renderItem={renderContactItem}
        ListEmptyComponent={
          <ListEmptyCompontent
            title="No contacts found"
            description="Try adding some contacts to get started"
          />
        }
        contentContainerStyle={styles.listContainer}
        style={styles.listStyle}
      />
    </View>
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
    width: wp(87),
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
  formStyle: {
    paddingLeft: 45,
    borderRadius: 20,
    backgroundColor: theme.colors.bg5,
    height: 48,
    width: wp(90),

    ...Shadows.small,
    borderColor: theme.colors.border,
  },
});

export default ContactList;
