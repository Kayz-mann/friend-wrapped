import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";
import { Box, Text } from "@/components/Theme";
import theme from "@/components/Theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addInvitedContact } from "@/store/global";
import InviteProgressButton from "@/components/InviteProgressButton";
import Pulse from "@/components/Pulse";
import CustomLockButton from "@/components/CustomLockButton";
import FriendListHolder from "@/components/FriendListHolder";
import ContactList from "@/components/ContactList";
import { isIOS } from "@/constants/constants";

const Invite = () => {
  const dispatch = useAppDispatch();
  const { signIn, signOut, user } = useGoogleSignIn();
  const [initializing, setInitializing] = useState(true);
  const { invitedContacts, customLockButtonIsOpen } = useAppSelector(
    (state) => state.global
  );
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const titleText = "Wrapped only works\nwith friends";

  const placeholderData = Array(5)
    .fill(null)
    .map((_, index) => {
      return invitedContacts[index] || null;
    });

  const handleInviteContact = (contact: any) => {
    if (invitedContacts.length <= 5) {
      dispatch(addInvitedContact(contact));
    }
  };

  // Function to share the app link via iMessage
  const shareAppLink = (contact: any) => {
    if (isIOS && contact?.phoneNumber) {
      const message =
        "Get this app: https://get.friendwrapped.com/invite?code=ZCWQ85PV";
      const url = `sms:${contact.phoneNumber}?body=${encodeURIComponent(
        message
      )}`;
      Linking.openURL(url).catch((err) =>
        console.error("An error occurred opening iMessage", err)
      );
    }
  };

  useEffect(() => {
    setInitializing(false);
  }, []);

  if (initializing) return null;

  return (
    <View style={styles.container}>
      {isLoggedIn && (
        <RNBounceable
          hitSlop={{ right: 10, left: 10, bottom: 10, top: 10 }}
          style={styles.signOutButton}
          onPress={signOut}
        >
          <Box style={styles.signOutFlex}>
            <MaterialIcons name="logout" size={16} color="black" />
            <Text style={{ fontSize: 8, fontWeight: "800" }}>Sign Out</Text>
          </Box>
        </RNBounceable>
      )}

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
                      contactName: `${item.firstName} ${item.lastName}`,
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

      <TouchableOpacity
        style={styles.flexText}
        onPress={() => {
          if (isIOS) {
            const infoUrl =
              "https://apps.apple.com/gb/app/friend-wrapped/id6475646063";
            Linking.openURL(infoUrl).catch((err) =>
              console.error("An error occurred opening the store link", err)
            );
          }
        }}
      >
        <MaterialIcons name="info" size={16} color={theme.colors.bg4} />
        <Text ml="s" variant="text5" color="bg4">
          Why 5 friends?
        </Text>
      </TouchableOpacity>

      {/* Main Content with Overlay */}
      <View style={styles.content}>
        <Box mt="s">
          <ContactList onInvite={handleInviteContact} />
        </Box>

        <InviteProgressButton
          invitedContacts={invitedContacts.length}
          onPress={() => shareAppLink(invitedContacts[0])}
        />

        {isLoggedIn && (
          <Text
            style={{ marginTop: hp(2), textAlign: "center" }}
            variant="text10"
            color="text2"
          >
            🎉 Invited by {user?.displayName || "unknown"}
          </Text>
        )}

        {/* Login Overlay */}
        {!isLoggedIn && (
          <View style={styles.overlayContainer}>
            <BlurView style={styles.blurOverlay} intensity={10} tint="light">
              <View style={styles.pulseWrapper}>
                <Pulse
                  backgroundColor={theme.colors.bg1}
                  dotBackgroundColor={theme.colors.bg1}
                  icon={
                    <CustomLockButton
                      googleSignInAction={signIn}
                      emailSignInAction={() => {}}
                    />
                  }
                />
              </View>

              {!customLockButtonIsOpen && (
                <Box style={{ marginTop: hp(8) }}>
                  <Text
                    style={styles.overlayText}
                    variant="title1"
                    color="text1"
                  >
                    Welcome to Friendly Wrapped
                  </Text>

                  <Text
                    style={styles.overlayText}
                    variant="text3"
                    color="black"
                  >
                    {
                      "Click the Lock Icon to Login\nand Unlock Invite Friends Features"
                    }
                  </Text>
                </Box>
              )}
            </BlurView>
          </View>
        )}
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
    paddingTop: hp(11),
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
    marginTop: hp(1),
  },
  content: {
    alignItems: "center",
    marginTop: hp(4),
    width: wp(90),
    position: "relative", // Important for absolute positioning of overlay
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
    marginTop: hp(1),
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  blurOverlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pulseWrapper: {
    position: "absolute", // Ensure it stays fixed in place
    top: hp(8), // Adjust this value as needed for vertical alignment
    left: wp(0), // Ensure it's aligned to the left
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    textAlign: "center",
    marginTop: hp(2),
  },
  signOutButton: {
    width: wp(90),
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: -hp(3),
  },
  signOutFlex: {
    flexDirection: "column",
    alignItems: "center",
  },
});
