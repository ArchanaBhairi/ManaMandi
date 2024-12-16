import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [userdata,setUserdata] = useState('')

    useEffect(()=>{
        const checkLoginStatus = async()=>{
          try{
            const storedUserData = await EncryptedStorage.getItem('user');
            if (storedUserData){
              setUserdata(JSON.parse(storedUserData))
            }
          }catch(error){
            console.error('Error retrieving user data:', error);
          }
        }
        checkLoginStatus();
      },[])

      const login = async (user) => {
        try {
          await EncryptedStorage.setItem('user', JSON.stringify(user));
          setUserdata(user);
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      };
    
      const logout = async () => {
        try {
          await EncryptedStorage.removeItem('user');
          setUserdata('');
        } catch (error) {
          console.error('Error clearing user data:', error);
        }
      };
    
      return (
        <AuthContext.Provider value={{ userdata, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}