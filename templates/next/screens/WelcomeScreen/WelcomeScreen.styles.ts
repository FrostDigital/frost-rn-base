import {StyleSheet} from "react-native";
import {vw} from "../../utils/style-utils";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 15,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  buttonContainer: {
    alignItems: "center",
    width: vw(90),
  },

  button: {
    marginVertical: 10,
  },
});
