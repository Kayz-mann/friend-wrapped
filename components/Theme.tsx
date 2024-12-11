import { createTheme, createText, createBox } from "@shopify/restyle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const theme = createTheme({
  colors: {
    //background color
    bg: "#FFFFFF",
    bg1: "#EDEDED",
    bg2: "#E2F4FF",
    bg3: "#BAE1FF",
    bg4: "#00A854",
    bg5: "#EDEDED",

    primary: "#008BFF",

    error: "#D90000",
    black: "#000000",
    gray: "#9C9C9C",

    border: "#DBDBDB",
    border1: "#003861",
    border3: "#DFDFDF",

    //text color
    text: "#9C9C9C",
    text1: "#282828",
  },
  // fonts
  textVariants: {
    title1: {
      fontSize: 24,
      fontFamily: "Inter-Bold",
      fontWeight: "600",
      lineHeight: 32,
    },
    title2: {
      fontSize: 30,
      fontFamily: "Inter-Medium",
      fontWeight: "500",
      lineHeight: 40,
    },
    text1: {
      fontSize: 14,
      fontFamily: "Inter-Light",
      fontWeight: "400",
      lineHeight: 22,
    },
    text2: {
      fontSize: 20,
      fontFamily: "Inter-Bold",
      fontWeight: "600",
      lineHeight: 32,
    },
    text3: {
      fontSize: 14,
      fontFamily: "Inter-Bold",
      fontWeight: "600",
      lineHeight: 16.94,
    },
    text4: {
      fontSize: 12,
      fontFamily: "Inter-Medium",
      fontWeight: "500",
      lineHeight: 16,
    },
    text5: {
      fontSize: 14,
      fontFamily: "Inter-Medium",
      fontWeight: "500",
      lineHeight: 18,
    },
    text6: {
      fontSize: 16,
      fontFamily: "Inter-Medium",
      fontWeight: "500",
      lineHeight: 18,
    },
    text7: {
      fontSize: 16,
      fontFamily: "Inter-Medium",
      fontWeight: "600",
      lineHeight: 19.36,
    },

    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
  },
  layout: {
    screenWidth: wp(90),
  },

  spacing: {
    xs: 2.5,
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
    xxl: 30,
    xxxl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export default theme;
