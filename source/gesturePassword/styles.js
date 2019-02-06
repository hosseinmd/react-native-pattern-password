import { StyleSheet } from "react-native";
import {
  WIDTH,
  HEIGHT,
  isVertical
} from "../utils";
const Top = isVertical ? ((HEIGHT - WIDTH) / 2.0) * 1.25 : 10;
export default StyleSheet.create({
  frame: {
    backgroundColor: "#292B38"
  },
  board: {
    position: "absolute",
    left: isVertical ? 0 : WIDTH / 3.4,
    top: isVertical ? Top / 1.5 : 30,
    width: WIDTH,
    height: HEIGHT
  },
  message: {
    position: "absolute",
    left: 0,
    top: 20,
    width: WIDTH,
    height: Top / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  msgText: {
    fontSize: 14
  }
});
