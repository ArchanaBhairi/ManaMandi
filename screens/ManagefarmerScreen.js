import { Platform, SafeAreaView, TouchableOpacity,ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const ManagefarmerScreen = () => {
    const navigation = useNavigation()
    const [farmername,setFarmername] = useState('')
    const [place,setPlace] = useState('')
    const [mobilenumber,setMobilenumber] = useState('')
    const [freeboxes,setFreeboxes] = useState('')
    const [auctionboxes,setAuctionboxes] = useState('')
    const [vehicleinfo,setVehicleinfo] = useState('')

    const addFarmer = async() =>{
        url = 'http://43.204.111.82/mana-mandi/api/save-farmer'
        try{
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    
                    farmer_name:farmername,
                    place:place,
                    mobile_number:mobilenumber,
                    free_boxes:freeboxes,
                    auction_boxes:auctionboxes,
                    vehicle_info:vehicleinfo
                })
            })
            const data = await response.json()
            console.log(data)
            if (data.status === 'true'&& response.ok){
                Alert.alert(data.message)
                console.log(data.message)
            }
            else{
                Alert.alert(data.message)
            }
        }catch(error){
            Alert.alert(error)
            console.log(error)
        }finally{

        }
    }
    // console.log('farmername:',farmername)
    // console.log('place:',place)
    // console.log('mobilenumber:',mobilenumber)
    // console.log('freeboxes:',freeboxes)
    // console.log('auctionboxes:',auctionboxes)
    // console.log('vehicleinfo:',vehicleinfo)
  return (
    <>
    <SafeAreaView style={styles.container}>
       
        <ScrollView>
            <View style={{marginLeft:15}}>
                {/* <Text style={styles.header}>Manage Farmer</Text> */}
                <Text style={[styles.header,{marginBottom:20}]}>Add Farmer</Text>
                <Text>Farmers Name<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={farmername}
                onChangeText={setFarmername}
                />
                <Text>Place<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={place}
                onChangeText={setPlace}
                />
                <Text>MobileNumber<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={mobilenumber}
                onChangeText={setMobilenumber}
                />
                {/* <Text>Free Boxes<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={freeboxes}
                onChangeText={setFreeboxes}
                />
                <Text>Auction Boxes<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={auctionboxes}
                onChangeText={setAuctionboxes}
                /> */}
                <Text>Vehicle info<Text style={{color:'red'}}>*</Text></Text>
                <TextInput
                style={styles.input}
                value={vehicleinfo}
                onChangeText={setVehicleinfo}
                />
            </View>
            
        </ScrollView>
        
        
    </SafeAreaView>
    <View style={styles.btnwrapper}>
    <TouchableOpacity style={styles.savebtn} onPress={addFarmer}>
    <Text style={styles.btntxt}>Save</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelbtn} onPress={()=>{navigation.goBack()}}>
    <Text style={styles.btntxt}>Cancel</Text>
    </TouchableOpacity>
</View>
</>
  )
}

export default ManagefarmerScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:10,
        // paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
        marginTop:5,
        // width:'80%',
        marginBottom:10
    },
    btnwrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // marginTop:50,
        marginBottom:65,
        // width:'100%',
        // paddingHorizontal:0
    },
    btntxt:{
        color:'#FFFFFF',
        fontSize:24,
        fontWeight:'800',
        textAlign:'center',
        paddingVertical:5,
    },
    cancelbtn:{
        backgroundColor:'#092C4C',
        // borderRadius:10,
        width:'50%',
    },
    savebtn:{
        backgroundColor:'#FF9F43',
        // borderRadius:10,
        width:'50%',
    }
})