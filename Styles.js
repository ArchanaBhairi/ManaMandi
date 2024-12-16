import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        paddingHorizontal:10
    },
    header:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:30
    },
    input:{
        height:40,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#D9D9D9',
        marginTop:10,
        // width:'80%',
        marginBottom:10
    },
    dropdown:{
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'#D9D9D9',
    padding:10,
    marginBottom:20
  },
  btnwrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // marginTop:30,
    marginBottom:60,
    // position:'absolute',
    // bottom:0,
    width:'100%',
    backgroundColor:'#fff'
  },
  savebtn:{
    backgroundColor:'#FF9F43',
    // borderRadius:10,
    width:'50%'
  },
  btntxt:{
    color:'#FFFFFF',
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    padding:5
  },
  cancelbtn:{
    backgroundColor:'#092C4C',
    // borderRadius:10,
    width:'50%'
  }
})

export {styles}