import { Dimensions } from "react-native";
import { fontPixel } from "../styles/Responsive";
const FullWidth = Dimensions.get("window").width;
const FullHeight = Dimensions.get("window").height;

const COLORS = {
  primary: "#1B51BB",
  Secondary: "#F5F9FF",
  white: "#FFFFFF",
  PrimaryText: "#1B2436",
  PlaceHolderText: "#D3DCE5",
  SecondaryText: "#8493B2",
  BorderColor: "#D5E8FF",
  DoneGreen: "#18A915",
  DeclineRed: "#FF0000",
  PendingYellow: "#F0BE0E",
  blurBlack: "#000000",
  ErrorRed: "#F21313",
  Added: "#E6F0FF",
  preBid: "#F0BE0E",
  openBids: "#FCAE1E",
  inWareHouse: "#F18501",
  bidding: "#FF601F",
  secondaryBlue: "#E8EFFF",
  dot: "#A3BFF5",
  //  'open-bid',
  //  'pre-bid',
  //  'bidding', '
  //  post-bid',
  //  'payment',
  //  'in-APMC',
  //  'in-transit',
  //  'in-warehouse',
  //  'decline-bid'
};

const FONT = {
  EuclidBold: "EuclidBold",
  EuclidSemiBold: "EuclidSemiBold",
  EuclidMedium: "EuclidMedium",
  EuclidRegular: "EuclidRegular",
  EuclidLight: "EuclidLight",
  EuclidBoldItalic: "EuclidBoldItalic",
  EuclidSemiBoldItalic: "EuclidSemiBoldItalic",
  EuclidMediumItalic: "EuclidMediumItalic",
  EuclidItalic: "EuclidItalic",
  EuclidLightItalic: "EuclidLightItalic",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  size13: 13,
  size14: 14,
  size15: 15,
  medium: 16,
  xmedium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  LetterSpacing: -0.5,
};
const WEIGHT = {
  weight4: 400,
  weight5: 500,
  weight6: 600,
  weight7: 700,
  weight8: 800,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const ASPECTRADIO = {
  width: FullWidth,
  height: FullHeight,
};

const CENTERSCREEN = {
  Horizontal: FullWidth / 2,
  Vertical: FullHeight / 2,
};

const UNIQUEWIDTH = {
  wid: ASPECTRADIO.width * 0.92,
};

export {
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  WEIGHT,
  ASPECTRADIO,
  CENTERSCREEN,
  UNIQUEWIDTH,
};
