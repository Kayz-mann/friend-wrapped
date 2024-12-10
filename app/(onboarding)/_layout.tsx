import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, StyleSheet } from "react-native";

import theme, { Box, Text } from "../../components/Theme";
import ProfileImageHandler from "@/components/ProfileImageHandler";
import Button from "@/components/Button";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAppDispatch } from "@/store/hooks";
import { setUserProfileImage } from "@/store/global";

export default function OnboardingScreen() {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(null);
  const titleText = "Add a profile photo";

  console.log(image);

  const pickImage = async () => {
    // Request permission (if not already granted)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="title1" color="black">
        {titleText}
      </Text>

      <Box style={styles.flex}>
        {/* user profile photo */}
        <Box mt="xl">
          <ProfileImageHandler
            withDescriptions
            image={image ? { uri: image } : null}
          />
        </Box>

        <Box style={{ flexDirection: "column", gap: 18 }}>
          <Button
            radius={true}
            type="secondary"
            label={image ? "Change photo" : "Choose a photo"}
            onPress={pickImage}
          />

          <Button
            radius={true}
            type="primary"
            label={image ? "Next" : "Take a photo"}
            onPress={
              !image
                ? takePhoto
                : () => {
                    dispatch(setUserProfileImage(image));
                  }
            }
          />
        </Box>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingTop: hp(10),
  },
  flex: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: hp(70),
  },
});
