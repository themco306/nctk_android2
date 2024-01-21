import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ModalBottom = ({ children, isVisible, handleCloseModal ,title=" ",height='40%',center=false}) => {
  const modalViewStyle = {
    ...styles.modalView,
    height: height, // Sử dụng giá trị height từ props
  };
  const detailScrollView = {
    ...styles.detailScrollView,
  }
  
  

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={handleCloseModal}
  >
    <View style={styles.centeredView}>
      <View style={modalViewStyle}>
        <View style={styles.modalLabel}>
          <Text style={styles.modalText}>{title}</Text>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.modalClose}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={detailScrollView} showsVerticalScrollIndicator={false} scrollEnabled={false}
                  contentContainerStyle={{ 
                    flexGrow: 1, 
                    justifyContent: center ? 'center' : 'flex-start', 
                    // alignItems: center ? 'center' : 'stretch' 
                  }}
        >
         {children}
        </ScrollView>
      </View>
    </View>
    </Modal>
  );
};

export default ModalBottom;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalClose: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
    paddingHorizontal: 5,
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    textAlign: 'center',
  },
  detailScrollView: {
    flex: 1,
    width: '100%',
    marginTop: 10,

  },
  detail: {
    // Your styles for the detail text
  },
});
