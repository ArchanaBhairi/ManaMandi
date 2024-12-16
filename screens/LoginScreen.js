import { ActivityIndicator, Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import EncryptedStorage from 'react-native-encrypted-storage'
import { AuthContext } from '../components/AuthContext'

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loader,setLoader] = useState(false)
  const {login} = useContext(AuthContext)

  const handleLogin = async() =>{
    // navigation.navigate('Home')
    const SignInAPI = 'http://43.204.111.82/mana-mandi/api/user-login'
    setLoader(true)
    try{
      const response = await(fetch(SignInAPI,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
            email:email,
            password:password,
        })
      }))

      const data = await response.json()
      console.log("Looged Person:",data)
      console.log('Request Payload:',{
        'Email':email,
        'Password':password
      })
      if (response.ok && data.message === 'success'){
        console.log('Login Successful')
        await login(data.user);
        Alert.alert(data.message)
        // navigation.navigate('Home')
      }else{
        Alert.alert(data.message)
        console.log('Login Failed')
      }
    }catch(error){
      Alert.alert('Login Failed',error)
      console.error('Login Failed:',error)
    }finally{
      setLoader(false);
    }
  }
  
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'}/>
              <View style={styles.header}>
                <Image source={require('../images/icon.png')} style={styles.image}/>
                <Text style={styles.signin}>Sign In</Text>
                <Text style={styles.descriptiontxt}>Please Login to your account</Text>
              </View>
              <Text style={styles.inputtxt}>Email</Text>
              <TextInput
              placeholder='@gmail.com'
              value={email}
              style={styles.input}
              onChangeText={text => setEmail(text)}
              />
              <Text style={styles.inputtxt}>Password</Text>
              <TextInput
              placeholder='*******'
              value={password}
              secureTextEntry
              style={styles.input}
              onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signinbtn} onPress={()=>{handleLogin()}}>
                <Text style={styles.signinbtntxt}>Sign In</Text>
              </TouchableOpacity>
              {loader ? (<ActivityIndicator size={'large'} color={'#253325'} style={{margin:10,alignItems:'center',justifyContent:'center'}}/>) : null}
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    paddingHorizontal:10
  },
  header:{
    alignItems:'center'
  },
  image:{
    height:203,
    width:173,
    resizeMode:'contain'
  },
  signin:{
    fontWeight:'bold',
    fontSize:32,
    marginBottom:10
  },
  descriptiontxt:{
    fontSize:18,
    color:'#637381',
    marginBottom:20
  },
  input:{
    height:50,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#D9D9D9',
    marginHorizontal:20,
    marginBottom:20
  },
  inputtxt:{
    fontSize:18,
    color:'#1E1E1E',
    marginHorizontal:20,
    marginBottom:8
  },
  forgot:{
    color:'#FF9F43',
    fontSize:16,
    marginHorizontal:20,
    marginBottom:20
  },
  signinbtn:{
    backgroundColor:'#FF9F43',
    marginHorizontal:20
  },
  signinbtntxt:{
    color:'white',
    fontWeight:'bold',
    fontSize:24,
    padding:8,
    textAlign:'center'
  }
})