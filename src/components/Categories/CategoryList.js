import React, { useEffect, useState } from 'react'
import { FlatList, View, Dimensions } from 'react-native'
import CategoryItem from './CategoryItem'
import { categoryStyles } from '../../styles/categoryStyles';
import categoryApi from '../../API/categoryApi';
import Loading from '../Loading';

const CategoryList = ({data}) => {
  const [categories,setCategories]=useState([])
  const [loading,setLoading]=useState(true)

  var params={
    populate:'*',
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll(params);
        // console.log(response.data)
        setCategories(response.data.data); // Sửa ở đây
        setLoading(false)
      } catch (error) {
        console.error(error);
        console.error('Error Details:', error.response);
        setCategories([]);
        setLoading(false)
      }
    };
  
    fetchData();
  }, []);
  const numColumns = 4; // Set the number of columns
  const numRows = 2; // Set the number of rows
  const itemsPerPage = numColumns * numRows;
  // // Split data into pages
  // console.log('image',categories[0].attributes.image.data.attributes.url);

  const pages = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) { // Sửa ở đây
    pages.push(categories.slice(i, i + itemsPerPage)); // Sửa ở đây
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={categoryStyles.categoryList}>
<FlatList 
  data={pages}
  horizontal={true}
  pagingEnabled={false}
  keyExtractor={(item, index) =>  item[0].id?.toString()}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <View key={item.id}>
      <FlatList
        data={item}
        numColumns={numColumns}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <CategoryItem item={item}/>
        )}
      />
    </View>
  )}
/>

    </View>
  )
}

export default CategoryList
