// components/Products/ProductItem.js
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { productStyles } from "../../styles/productStyles";
import { useNavigation } from "@react-navigation/native";
import AppUrl from "../../API/AppUrl";

const formatNumber = (num) => {
  return num.toFixed(1).replace(/\.0$/, "");
};

const formatSold = (sold) => {
  if (sold >= 1e12) {
    return formatNumber(sold / 1e12) + "t";
  } else if (sold >= 1e9) {
    return formatNumber(sold / 1e9) + "b";
  } else if (sold >= 1e6) {
    return formatNumber(sold / 1e6) + "m";
  } else if (sold >= 1000) {
    return formatNumber(sold / 1000) + "k";
  }
  return sold.toString();
};

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  const handleShowDetail = () => {
    navigation.navigate("ProductDetail", { productId: item.id });
  };
  return (
    <View style={productStyles.productItem}>
      <TouchableOpacity onPress={handleShowDetail}>
        <Image
          source={{ uri: AppUrl.ImageURL+item.attributes.image.data[0].attributes.url }}
          style={productStyles.productImage}
        />
        {item.attributes.sale > 0 && (
          <View style={productStyles.saleBadge}>
            <Text style={productStyles.saleText}>{`-${item.sale}%`}</Text>
          </View>
        )}
        <View style={productStyles.productInfo}>
          <Text style={productStyles.productName}>
            {item.attributes.title.length > 40
              ? item.attributes.title.substring(0, 40) + "..."
              : item.attributes.title}
          </Text>

          <View style={productStyles.priceSoldRow}>
            <Text style={productStyles.productPrice}>{`₫${item.attributes.price.toFixed(
              0
            )}`}</Text>
            <Text style={productStyles.productSold}>Đã bán {formatSold(parseInt(item.attributes.sold))} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
