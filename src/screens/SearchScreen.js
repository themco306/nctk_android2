import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Search from '../components/Search'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

function SearchScreen() {
  const [reSearchText, setReSearchText] = useState([]);
  const [reSearchProducts, setReSearchProducts] = useState([]);
  const [clear,setClear]=useState(false)
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const handleGoBack=()=>{
    navigation.goBack()
  }
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const searchJSON = await AsyncStorage.getItem('search');
        const search = searchJSON != null ? JSON.parse(searchJSON) : [];
        const reSearchJSON = await AsyncStorage.getItem('reSearch');
        const reSearch = reSearchJSON != null ? JSON.parse(reSearchJSON) : [];
        
        setReSearchProducts(reSearch)
        setReSearchText(search);
        setClear(false)
      } catch (e) {
        console.log(e);
      }
    };
  
    fetchSearchData();
  }, [clear,isFocused]);
  const handleClearSearch = async () => {
    try {
      await AsyncStorage.removeItem('search');
      setClear(true)
    } catch (e) {
      console.log(e);
    }
  }
  const handleReSearch = async (text) => {
    try {
      const searchJSON = await AsyncStorage.getItem('search');
      let search = searchJSON != null ? JSON.parse(searchJSON) : [];
  
      // Xóa tìm kiếm cũ nếu nó tồn tại
      const index = search.indexOf(text);
      if (index > -1) {
        search.splice(index, 1);
      }
  
      // Thêm tìm kiếm mới vào đầu danh sách
      search.unshift(text);
  
      // Nếu số lượng tìm kiếm vượt quá 8, xóa tìm kiếm cũ nhất
      if (search.length > 8) {
        search.pop();
      }
  
      // Lưu lại danh sách tìm kiếm
      await AsyncStorage.setItem('search', JSON.stringify(search));
      navigation.navigate("SearchResult", { textSearch: text });
    } catch (e) {
      console.log(e);
    }
  }
  
 
  console.log('re'+reSearchProducts)
  return (
    <View style={styles.container}>
        <View style={styles.boxTop}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Icon name="arrow-left" size={25} color="gray" />
        </TouchableOpacity>
        <View style={styles.boxSearch}>
          <Search/>
        </View>
        </View>
        
        <View style={styles.boxTextResearch}>
          <ScrollView>
          {reSearchText&&reSearchText.map((item)=>{
            return(
              <TouchableOpacity style={styles.itemResearch} key={item} onPress={()=>(handleReSearch(item))}>
              <Text style={styles.textResearch}>{item}</Text>
            </TouchableOpacity>
            )
          })}
          </ScrollView>
          <TouchableOpacity style={styles.itemResearch} onPress={handleClearSearch}>
            <Text style={styles.textDelete}>Xóa lịch sử tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.boxProductResearch}>
          <Text style={{ fontSize:15,fontWeight:'700' }}>Sản phẩm đã tìm</Text>
          <View>
            {reSearchProducts.length===0?<Text>Chưa có</Text>:
             <FlatList
             data={reSearchProducts}
             keyExtractor={(item) => (item.id+'r')}
             renderItem={({ item }) => (
               <TouchableOpacity style={styles.itemProductReSearch} onPress={()=>(
                navigation.navigate("ProductDetail", { productId: item.id,reSearch:true })
               )}>
                 <Image style={styles.image} source={{ uri:item.image }}/>
                 <View style={styles.boxTitle}>
                 <Text style={styles.title}>{item.title}</Text>
                 </View>
               </TouchableOpacity>
              
             )}
             numColumns={2}
             showsVerticalScrollIndicator={false}
           />
            }
         
          </View>
        </View>
       
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    height:'100%',
      backgroundColor:'#F3f3ec'
  },
  boxTop:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding:18,
    backgroundColor:'#fff'
  },
  goBackButton:{

  },
  boxSearch:{ 
    backgroundColor:'#fff0',
  },
  itemResearch:{
    paddingHorizontal:15,
    // borderBottomColor:'#bebeb6',
    borderTopColor:'#bebeb6',
    // borderBottomWidth:1,
    borderTopWidth:1,
  
  },
  textResearch:{
    padding:13,
    fontSize:16
  },
  textDelete:{
    textAlign:'center',
    padding:10,
    color:'#bebeb6'
  },
  boxTextResearch:{
    maxHeight:'30%',
    width:'100%',
    backgroundColor:'#fff',

    marginBottom:5
  },
  boxProductResearch:{
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:5,
    height:'60%',
  },
  itemProductReSearch:{
    width:'50%',
    height:80,
    marginVertical:10,
    flexDirection:'row',
  },
  image:{
    width:'50%',
    height:'100%'
  },
  boxTitle:{
    flex:1,
    justifyContent:'center'
  },
  title:{
    marginLeft:8,
    flexWrap:'wrap-reverse'
  }
})
export default SearchScreen


