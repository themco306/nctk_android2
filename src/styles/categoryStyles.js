// styles/productStyles.js
import { Dimensions, StyleSheet } from 'react-native';
const screenHeight = Dimensions.get('window').height;
export const categoryStyles = StyleSheet.create({
    categoryList:{
        height:'auto',
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor:"#FFA000",
        paddingVertical:5
    },
    categoryItem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        height: 80,
        width:80,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    categoryImage: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
    },
    title:{
        fontSize: 12,
    }
});
