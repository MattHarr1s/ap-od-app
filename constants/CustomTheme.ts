import {
  MD3LightTheme as DefaultTheme, 
} from "react-native-paper";

const CustomTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ea5b3a', // Red Orange
    accent: '#4caad8', // Blue
    background: '#60155e', // Purple
    surface: '#fcb41c', // Yellow
    text: '#a3cc27', // Green
    backdrop: '#f79731', // Orange
  },
};

export default CustomTheme;
