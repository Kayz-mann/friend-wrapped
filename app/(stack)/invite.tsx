import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Box, Text } from "@/components/Theme";
import theme from "@/components/Theme";
import FriendListHolder from "@/components/FriendListHolder";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Shadows } from "@/constants/constants";
import ContactList from "@/components/ContactList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addInvitedContact } from "@/store/global";

const Invite = () => {
  const dispatch = useAppDispatch();
  const { control, watch } = useForm();
  const { invitedContacts } = useAppSelector((state) => state.global);
  // const [invitedContacts, setInvitedContacts] = useState<any[]>([]); // State to hold invited contacts

  const titleText = "Wrapped only works\nwith friends";

  const placeholderData = Array(5)
    .fill(null)
    .map((_, index) => {
      return invitedContacts[index] || null;
    });

  const handleInviteContact = (contact: any) => {
    // Add contact to invitedContacts if there is space (maximum 5 contacts)
    if (invitedContacts.length <= 5) {
      // setInvitedContacts((prevContacts) => [...prevContacts, contact]);
      dispatch(addInvitedContact(contact));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="title2" color="text1">
        {titleText}
      </Text>

      <Box style={styles.subTitle}>
        <Text color="bg" variant="text3">
          Invite 5 best friends
        </Text>
      </Box>

      <View style={styles.contactPlaceholder}>
        <FlatList
          data={placeholderData}
          renderItem={({ item }) => (
            <FriendListHolder
              contactInfo={
                item
                  ? {
                      contactImage: item.image?.uri,
                      contactName: item
                        ? `${item.firstName} ${item.lastName}`
                        : undefined,
                    }
                  : undefined
              }
            />
          )}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : `placeholder-${index}`
          }
          horizontal
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.flexText}>
        <MaterialIcons name="info" size={16} color={theme.colors.bg4} />
        <Text ml="s" variant="text5" color="bg4">
          Why 5 friends?
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <FormInput
          control={control}
          name={"search"}
          type={"input"}
          height={50}
          search
          placeholder={"Search contacts"}
          style={styles.formStyle}
        />

        <Box mt="s">
          <ContactList onInvite={handleInviteContact} />
        </Box>
      </View>
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingTop: hp(10),
  },
  title: {
    textAlign: "center",
  },
  subTitle: {
    width: 176,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    backgroundColor: theme.colors.bg4,
    marginTop: 8,
  },
  contactPlaceholder: {
    marginTop: 25,
    height: hp(12),
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  separator: {
    width: 28,
  },
  flexText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
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
  content: {
    alignItems: "center",
    marginTop: hp(4),
    width: wp(90),
  },
});
