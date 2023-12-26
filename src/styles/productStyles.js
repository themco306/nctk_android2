// styles/productStyles.js
import { StyleSheet } from 'react-native';

export const productStyles = StyleSheet.create({
  productList: {
    flex: 1,
    width:'100%',
    padding:5,
    backgroundColor:'#fff',
    label:{
      fontSize:20,
      color:'#ee4d2d',
      textTransform:'uppercase',
    },
    labelBox:{
      padding:5,
      backgroundColor:"#fafafa"
    }

  },

  productItem: {
    marginHorizontal:2,
    padding: 8,
    width:'48.8%',
    backgroundColor: '#fff',
    marginBottom: 4,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  saleBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'yellow',
    paddingHorizontal:6,
    paddingVertical:2,
  },
  saleText: {
    color: 'red',
    fontWeight: 'normal',
    fontSize:12
  },
  productName: {
    minHeight:35,
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 4,
  },
  priceSoldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productSold: {
    color: 'gray', // Change this to the color you want
    fontSize:10,
    padding:2
  },

  productPrice: {
    fontSize: 16,
    color: '#e74c3c', // You can set the color based on your design
  },
  // Add more styles as needed
});
