// components/Body.js
import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../styles/styles";

const Body = ({ children }) => {
  return (
    <View style={styles.body}>
        {children}
    </View>
  );
};

export default Body;
