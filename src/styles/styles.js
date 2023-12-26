import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    loading:{
        flex:1,
        backgroundColor:'#f0f8ff',
        justifyContent:'center',
        alignItems:'center'
    },
  container: {
    flex:1,
    flexDirection: 'column',
  },
  header: {
    flex:1.5,
    backgroundColor: 'skyblue',
  },
  body: {
    flex: 12.5,
    backgroundColor:'powderblue',
    alignItems:'center',

  },
  footer: {
    flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#ddd'
  },
  button: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
  },
  separator: {
    height:'80%',
    width: 1,
    backgroundColor: '#ddd',
    opacity:0.5,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  // Thêm các styles khác của bạn ở đây
});
