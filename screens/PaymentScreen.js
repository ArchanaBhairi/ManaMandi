import { SafeAreaView, ScrollView, StyleSheet, Text, View,TextInput,StatusBar,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const PaymentScreen = () => {
  const navigation = useNavigation()
  const [lotNumber,setLotnumber] = useState('')
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [clicked,setClicked] = useState(false)
  
  const searchReceipt = async() =>{
      const url = 'http://43.204.111.82/mana-mandi/api/get-payment-recept'
      try{
        const response = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            lot_number:lotNumber
          })
        })
        const data = await response.json()
        if (response.ok){
          // Alert.alert("Generated Successfully")
          console.log(data)
        }else{
          Alert.alert(data.message)
        }
      }catch(error){
        console.log(error)
      }finally{
  
      }
    }

  return (
    <SafeAreaView style={{backgroundColor:'#ffffff'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{marginLeft:10}}>
          {/* <Text style={styles.header}>Payment Receipt</Text> */}
          <Text>Lot Number<Text style={{color:'red'}}>*</Text></Text>
          <TextInput
          value={lotNumber}
          onChangeText={text => setLotnumber(text)}
          style={styles.input}
          />
          <Text>Date<Text style={{color:'red'}}>*</Text></Text>
          <TouchableOpacity style={styles.dropdown}
            onPress={() => {
              setClicked(!clicked);
            }}>
            <Text style={{fontWeight:'600'}}>{date == '' ? (<Text style={{color:'#D9D9D9'}}>yyyy-mm-dd</Text>) : date}</Text>
            <MaterialCommunityIcons name={'calendar-today'} size={20} color={'#ccc'} />
          </TouchableOpacity>
          {
          clicked ? 
          <Calendar
          markedDates={{
            [date]: {date: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
          onDayPress={day => {
            setDate(day.dateString);
          }}
          theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#00adf5',
              monthTextColor: '#00adf5',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
          }}
      />: null
        }
        </View> 
        
        
      </ScrollView>
      <View style={styles.btnwrapper}>
        <TouchableOpacity style={styles.generatebtn} onPress={searchReceipt}>
          <Text style={styles.btntxt}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelbtn} onPress={()=>{navigation.goBack()}}>
          <Text style={styles.btntxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container:{
    // flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:10,
    paddingTop:10
  },
  header:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:30,
  },
  input:{
    height:40,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#D9D9D9',
    marginTop:5,
    // width:'80%',
    marginBottom:10,
  },
  dropdown:{
    // width: '80%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor:'#D9D9D9',
    padding:10,
    marginBottom:20,
  },
  btnwrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:30
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
  generatebtn:{
    backgroundColor:'#FF9F43',
    // borderRadius:10,
    width:'50%',
  }
})