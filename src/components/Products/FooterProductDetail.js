import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalBottom from "../ModalBottom";
import ProductQuantity from "./ProductQuantity";

const FooterProductDetail = ({handleAddToCart}) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleShowAdd2Cart = () => {
    setIsVisible(true);
  };
  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.button, styles.buttonChat]} onPress={{}}>
        <Icon
          style={styles.button.icon}
          name="commenting-o"
          size={30}
          color="#900"
        />
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={[styles.button, styles.buttonAdd2Cart]}
        onPress={{}}
      >
        <Icon
          style={styles.button.icon}
          name="shopping-cart"
          size={30}
          color="#900"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonBuy]}
        onPress={handleShowAdd2Cart}
      >
        <Text style={styles.buttonBuy.text}>Mua Ngay</Text>
      </TouchableOpacity>

      <ModalBottom
      title="Thêm giỏ hàng"
        handleCloseModal={handleCloseModal}
        isVisible={isVisible}
      >
        <ProductQuantity handleAddToCart={handleAddToCart}/>
      </ModalBottom>
    </View>
  );
};

export default FooterProductDetail;

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    // height:'8%',
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#8e8e8e",
    opacity: 0.5,
    alignSelf: "flex-end",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    icon: {
      color: "#fff",
    },
  },
  buttonChat: {
    flex: 1,
    backgroundColor: "#69c541",
  },
  buttonAdd2Cart: {
    flex: 1,
    backgroundColor: "#69c541",
  },
  buttonBuy: {
    flex: 2,
    backgroundColor: "#ff3232",
    text: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "400",
    },
  },
});
