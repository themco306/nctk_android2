// components/Layout.js
import React from 'react';
import { View } from 'react-native';
import HeaderCustom from './HeaderCustom';
import Footer from './Footer';
import { styles } from '../styles/styles';
import Body from './Body';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* <HeaderCustom /> */}
      <Body>
        {children}
      </Body>
      <Footer />
    </View>
  );
};

export default Layout;
