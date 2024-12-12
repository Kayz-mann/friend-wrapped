import { Platform } from "react-native"

export const isAndroid = Platform.OS === 'android'
export const isIOS = Platform.OS === 'ios'

export const Shadows = {
  small: {
    shadowColor: '#F1F1F1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,

    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.27,

    elevation: 4,
  }

}

// colorUtils.ts
export const getRandomLightColor = () => {
    const lightColors = [
      "#FFD1DC", // Light Pink
      "#FFE5B4", // Light Orange
      "#E6E6FA", // Lavender
      "#B0E0E6", // Powder Blue
      "#98FB98", // Pale Green
      "#FAFAD2", // Light Goldenrod Yellow
      "#F0FFF0", // Honeydew (very light green)
      "#E0FFFF", // Light Cyan
      "#FFE4E1", // Misty Rose
      "#F5DEB3", // Wheat (light brown)
    ];
  
    return lightColors[Math.floor(Math.random() * lightColors.length)];
  };
  
  export const getDarkerShade = (hex: string, factor: number = 0.6) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
  
    const darkerR = Math.floor(r * factor);
    const darkerG = Math.floor(g * factor);
    const darkerB = Math.floor(b * factor);
  
    return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
      .toString(16)
      .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
  };
  