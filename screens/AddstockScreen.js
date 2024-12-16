import { Platform, SafeAreaView,FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, View ,TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {styles} from '../Styles'

const AddstockScreen = () => {
  const navigation = useNavigation()
  const [farmerName,setFarmername] = useState('')
  const [place,setPlace] = useState('')
  const [mobileNumber,setMobilenumber] = useState('')
  const [vehicleinfo,setVehicleinfo] = useState('')
  const [numberofboxes,setNumberofboxes] = useState('')
  const [selectedtype,setSelectedtype] = useState('')
  const [clicked, setClicked] = useState(false);
  const [numberofboxes1,setNumberofboxes1] = useState('')
  const [selectedtype1,setSelectedtype1] = useState('')
  const [clicked1, setClicked1] = useState(false);
  const [freeboxes,setFreeboxes] = useState('')
  const [auctionboxes,setAuctionboxes] = useState('')
  const scrollRef = React.useRef(null);

  const data = ['Small','Big']

  const addStock = async() =>{
    url = 'http://43.204.111.82/mana-mandi/api/save-stock'
    try{
      const response = await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          login_user_id:"1",
          farmer_name:farmerName,
          place:place,
          mobile_number:mobileNumber,
          free_boxes:freeboxes,
          number_of_boxes:numberofboxes,
          type_of_box:selectedtype,
          number_of_boxes_1:numberofboxes1,
          type_of_box_1:selectedtype1,
          auction_boxes:auctionboxes,
          vehicle_info:vehicleinfo
        })
      })
      const data = await response.json()
      if (response.ok){
        Alert.alert(data.message)
        console.log('added Successfully')
      }
      else{
        Alert.alert(data.message)
      }
    }catch(error){
      console.log(error)
      Alert.alert(error)
    }finally{

    }
  }

  const scrollToDropdown = (index) => {
    scrollRef.current?.scrollTo({
      y: index * 200,
      animated: true,
    });
  };

  return(
    <SafeAreaProvider>
      <View style={{ flex: 2 }}>
      <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Form Fields */}
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'}/>
        <Text style={[styles.header,{marginBottom:10}]}>Add Stock</Text>
        <Text>Farmers Name <Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={farmerName} 
        onChangeText={text => setFarmername(text)}/>
        <Text>Place<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={place}
        onChangeText={setPlace} />
        <Text>Mobile Number<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobilenumber} />
        <Text>Vehicle info<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={vehicleinfo}
        onChangeText={setVehicleinfo} />
        <Text>Free Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={freeboxes}
        onChangeText={setFreeboxes} />
        <Text>Auction Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={auctionboxes}
        onChangeText={setAuctionboxes} />
        <Text style={[styles.header,{marginBottom:10}]}>Grade 1</Text>
        <Text>Number of Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={numberofboxes}
        onChangeText={setNumberofboxes} />
        <Text>Type of Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TouchableOpacity
        style={styles.dropdown}
        onPress={() => {
          setClicked(!clicked);
        }}>
          <Text style={{fontWeight:'600'}}>
            {selectedtype == '' ? 'Select Your Size' : selectedtype}
          </Text>
          <Ionicons name={clicked?'chevron-up-sharp':'chevron-down-sharp'} color={'#ccc'} size={20} />
        </TouchableOpacity>
        {clicked ? (
        <View
        style={{
          elevation: 5,
          // marginTop: 10,
          // height: 300,
          // alignSelf: 'center',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
          {
            data.map((item,index)=>(
              <TouchableOpacity
              key={index}
              style={{
                width: '85%',
                alignSelf: 'center',
                height: 50,
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderColor: '#D9D9D9',
              }}
              onPress={() => {
                setSelectedtype(item)
                setClicked(!clicked);
              }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
    ):null}
        <Text style={[styles.header,{marginBottom:10}]}>Grade 2</Text>
        <Text>Number of Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TextInput
        style={styles.input}
        value={numberofboxes1} 
        onChangeText={setNumberofboxes1}/>
        <Text>Type of Boxes<Text style={{color:'red'}}>*</Text></Text>
        <TouchableOpacity
        style={styles.dropdown}
        onPress={() => {
          setClicked1(!clicked1);
        }}>
        <Text style={{fontWeight:'600'}}>
          {selectedtype1 == '' ? 'Select Your Size' : selectedtype1}
        </Text>
        <Ionicons name={clicked1?'chevron-up-sharp':'chevron-down-sharp'} color={'#ccc'} size={20} />
      </TouchableOpacity>
      {clicked1 ? (
          <View
          style={{
            elevation: 5,
            // marginTop: 10,
            // height: 300,
            // alignSelf: 'center',
            // width: '80%',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom:10
          }}>
            {
              data.map((item,index)=>(
                <TouchableOpacity
                key={index}
                style={{
                  width: '85%',
                  alignSelf: 'center',
                  height: 50,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#D9D9D9',
                }}
                onPress={() => {
                  setSelectedtype1(item)
                  setClicked1(!clicked1);
                }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
      ):null}
      
        </ScrollView>
        </KeyboardAwareScrollView>
        
      
      </View>
      <View style={[styles.btnwrapper]}>
        <TouchableOpacity style={styles.savebtn} onPress={()=>addStock()}>
          <Text style={styles.btntxt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelbtn} onPress={()=>{navigation.goBack()}}>
          <Text style={styles.btntxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaProvider>
  )
}

export default AddstockScreen

// const styles = StyleSheet.create({
  
//   header:{
//     fontSize:24,
//     fontWeight:'bold',
//     marginBottom:30
//   },
//   input:{
//     height:40,
//     borderWidth:1,
//     borderRadius:10,
//     borderColor:'#D9D9D9',
//     marginTop:5,
//     width:'80%',
//     marginBottom:10
//   },
//   dropdown:{
//     width: '100%',
//     height: 40,
//     borderRadius: 10,
//     borderWidth: 1,
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderColor:'#D9D9D9',
//     padding:10,
//     marginBottom:20
//   },
//   btnwrapper:{
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-between',
//     marginTop:30,
//     marginBottom:100
//   },
//   savebtn:{
//     backgroundColor:'#FF9F43',
//     borderRadius:10,
//     width:'48%'
//   },
//   btntxt:{
//     color:'#FFFFFF',
//     fontSize:24,
//     fontWeight:'bold',
//     textAlign:'center',
//     padding:5
//   },
//   cancelbtn:{
//     backgroundColor:'#092C4C',
//     borderRadius:10,
//     width:'48%'
//   }
// })