import { createTheme, createText, createBox } from "@shopify/restyle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const theme = createTheme({
  colors: {
    //background color
    bg: "#FFFFFF",
    bg1: "#EDEDED",

    primary: "#008BFF",

    error: "#D90000",
    black: "#000000",

    border: "#DBDBDB",
    border1: "#003861",
    border3: "#DFDFDF",

    //text color
    text: "#4F4F4F",
    text1: "#282828",
  },
  // fonts
  textVariants: {
    title1: {
      fontSize: 26,
      fontFamily: "Gilroy-Bold",
      fontWeight: "700",
      lineHeight: 35.57,
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
