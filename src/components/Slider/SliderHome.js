import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';

const SliderHome = () => {
  const images = [
    'https://cf.shopee.vn/file/vn-50009109-4dd93b637d295f52eb9a9c04abe07025_xxhdpirl-1.com',
    'https://cf.shopee.vn/file/vn-50009109-d9bef246aeef09a8d54a87304df3e29c_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-32b657ab46fe8a558a29489a3b23fb6c_xxhdpi',
    // Thêm các URL hình ảnh khác của bạn vào đây
  ];

  return (
    <Swiper autoplay={true} autoplayTimeout={5.5} 
    style={{ height:220 }}

     >
      {images.map((imageUrl, index) => (
        <View key={index} style={{ flex: 1 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%',height:220 }}
          />
        </View>
      ))}
    </Swiper>
  );
};

export default SliderHome;
