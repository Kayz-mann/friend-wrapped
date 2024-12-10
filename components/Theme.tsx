import { createTheme, createText, createBox } from "@shopify/restyle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const theme = createTheme({
  colors: {
    //background color
    bg: "#FFFFFF",
    bg1: "#EDEDED",
    bg2: "#E2F4FF",
    bg3: "#BAE1FF",

    primary: "#008BFF",

    error: "#D90000",
    black: "#000000",

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
