import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import PlaceholderIcon from "@/assets/svgs/PlaceholderIcon";
import theme, { Box, Text } from "./Theme";
import UngroupedPlaceholderIcon from "@/assets/svgs/UngroupedPlaceholderIcon";

interface PlaceholderProps {
  withDescriptions?: boolean;
  image?: { uri: string } | null;
}

const ProfileImageHandler = ({ withDescriptions, image }: PlaceholderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    if (image) {
      setLoading(true);
      const timer = setTimeout(() => {
        setImageUri(image);
        setLoading(false);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    } else {
      setImageUri(null);
    }
  }, [image]);

  const placeholderTip = "Add a photo so your friends\ncan find you";

  return (
    <View style={{ alignItems: "center" }}>
      {imageUri ? (
        <Image
          style={styles.image}
          source={{ uri: imageUri.uri }}
          resizeMode="cover"
        />
      ) : (
        <View>
          <Box style={styles.plus}>
            <FontAwesome6 name="plus" size={14} color="white" />
          </Box>

          <View style={styles.roundedContainer}>
            <View style={styles.placeholder}>
              <Box style={styles.ungroupedPiece}>
                <UngroupedPlaceholderIcon />
              </Box>
              <PlaceholderIcon />
              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                    style={{ marginTop: -12 }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Only show description if no image is selected */}
      {!imageUri && withDescriptions && (
        <Box mt="l">
          <Text variant="text1" color="text" style={styles.placeholderText}>
            {placeholderTip}
          </Text>
        </Box>
      )}
    </View>
  );
};

export default ProfileImageHandler;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    height: 144,
    width: 144,
    borderRadius: 100,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 90,
    borderRadius: 100,
  },
  roundedContainer: {
    backgroundColor: theme.colors.bg2,
    height: 144,
    width: 144,
    borderRadius: 100,
    overflow: "hidden",
  },
  placeholder: {
    marginTop: 27,
    marginLeft: 10,
    position: "relative",
  },
  plus: {
    height: 22,
    width: 22,
    borderRadius: 50,
    backgroundColor: theme.colors.bg3,
    position: "absolute",
    right: 14,
    top: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  placeholderText: {
    textAlign: "center",
  },
  image: {
    backgroundColor: theme.colors.bg2,
    height: 144,
    width: 144,
    borderRadius: 100,
  },
  ungroupedPiece: {
    position: "absolute",
    zIndex: 20,
    top: 46,
    left: 36,
  },
});
