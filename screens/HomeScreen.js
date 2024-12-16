import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import filter from "lodash.filter"
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContext } from '../components/AuthContext';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.8; // 80% of the screen width

const stockData = [
   {
      lotNumber: '01',
      farmerName: 'Riya',
      mobileNumber: '9848367102',
      createdDate: '2024-11-19',
      place: 'Tirupati',
      vehicleInfo: 'TN 83 M9446',
    },
    {
      lotNumber: '02',
      farmerName: 'Vasu',
      mobileNumber: '9848367102',
      createdDate: '2024-11-19',
      place: 'Tirupati',
      vehicleInfo: 'TN 83 M9446',
    },
];

const HomeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-drawerWidth)).current;
  const navigation = useNavigation()
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState('')
  const [fulldata,setFulldata] = useState('')
  const {userdata,logout} = useContext(AuthContext)

  console.log('Stock Details:',stocks)
  // console.log(userdata)
  // console.log(stocks.stock_id,userdata.id,userdata.login_token)
  const fetchStockDetails = async () => {
    const API_URL = "http://43.204.111.82/mana-mandi/api/get-stock-list";
    const login_user_id = userdata.login_user_id; // Replace with actual user ID

    try {
      setLoading(true);

      // API call using fetch
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login_user_id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data)
      // console.log("Stocks data:",data.stock.data)
      // Handle API response
      if (response.ok) {
        setFulldata(data.stock.data)
        setStocks(data.stock.data || []); // Adjust based on actual response structure
      } else {
        setError("Failed to fetch stock details.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) =>{
    setSearch(query);
    const formattedquery = query
    const filterData = filter(fulldata,(user) => {
      return contains(user,formattedquery)
    })
    setStocks(filterData)
  }

  const contains = ({farmer_name,place},query) =>{
    if (farmer_name.includes(query)||
        place.includes(query)){
          return true;
        }
      return false;
  }
  useEffect(() => {
    fetchStockDetails();
  }, []);

  const removeStock = async(Stock_id) =>{
    const url = `http://43.204.111.82/mana-mandi/api/remove-stock/${Stock_id}`
    try{
      const response = await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          login_user_id:userdata.login_user_id,
          login_token:userdata.login_token
        })
      })
      const data = await response.json()
      if (response.ok){
        const updatedStocks = stocks.filter((stock) => stock.stock_id !== Stock_id);
        setStocks(updatedStocks); // Update state to re-render with the updated stock list
        console.log('Stock removed successfully:', data);
        Alert.alert(data.message)
      }else{
        console.error('Failed to remove stock:', data.message || 'Unknown error');
        Alert.alert(data.message)
      }
    }catch(error){
      console.error('Error removing stock:', error);
      Alert.alert(data.message)
    }
  }
  const handlelogout = () =>{
    logout
    navigation.navigate('Login')
  }

  // if (loading) {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#253325" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'}/>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Toggle Drawer
  const toggleDrawer = () => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      setIsDrawerOpen(true);
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Close Drawer
  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        {/* Header */}
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
          <Image source={require('../images/icon.png')}
          style={{height:40,width:40}}/>
          <Text style={{fontWeight:'bold',fontSize:20,color:'#637381'}}>Mana Mandi</Text>
        </View>
        <View style={styles.headercontainer}>
          {/* Menu Icon */}
          <TouchableOpacity onPress={toggleDrawer} style={styles.menu}>
            <Ionicons name="menu" size={30} color="#637381"  />
          </TouchableOpacity>
          <TextInput style={styles.input} 
          value={search}
          onChangeText={(query) => handleSearch(query)}
          placeholder="Search" />
          <Ionicons name="search-sharp" color="white" size={30} style={styles.search} />
        </View>

        <Text style={styles.header}>Stock Details</Text>

        {/* Stock List */}
        <FlatList
        showsVerticalScrollIndicator={false}
          data={stocks}
          keyExtractor={(item) => item.lot_number}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
              <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Lot Number:</Text>
                    <Text style={styles.value}>{item.lot_number}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Place:</Text>
                    <Text style={styles.value}>{item.place}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Farmer's Name:</Text>
                    <Text style={styles.value}>{item.farmer_name}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Created Date:</Text>
                    <Text style={styles.value}>{item.created_at}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Mobile Number:</Text>
                    <Text style={styles.value}>{item.mobile_number}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Vehicle Info:</Text>
                    <Text style={styles.value}>{item.vehicle_info}</Text>
                  </View>
                </View>
                
              </View>
              <TouchableOpacity onPress={()=>(removeStock(item.stock_id))}>
                {/* <Text>{item.stock_id}</Text> */}
                <Ionicons name="trash-outline" size={24} color="red" style={styles.trash} />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Drawer */}
        {isDrawerOpen && (
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: drawerAnimation }],
            },
          ]}
        >
          {/* Drawer Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.drawerHeader}>
              {/* <Text style={styles.drawerTitle}>Menu</Text> */}
              <TouchableOpacity onPress={closeDrawer}>
                <Ionicons name="close-circle-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{position:'relative'}}>
              <View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Manage Stock')}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/box.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Add Stock</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Generate Receipt')}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/auction.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Auction Entry</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Payment Receipt')}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/Group.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Payment Receipt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Manage Farmer')}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/people.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Manage Farmer</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.border}></View> */}
              <View>
                {/* <TouchableOpacity onPress={()=>{}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/notification.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/settings.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Settings</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={logout} style={styles.draweritemwrapper}>
                  <Image source={require('../images/arrow.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.draweritemwrapper}>
                  <Image source={require('../images/Avatar.png')} style={styles.draweritemimg} />
                  <Text style={styles.drawerItem}>{userdata.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal:10
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom:20
  },
  menu: {
    borderWidth:1,
    borderColor:'#DFE4EA',
    borderRadius:10,
    padding:10
  },
  input: {
    height:50,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#D9D9D9',
    marginHorizontal:10,
    flex:1
  },
  search: {
    backgroundColor:'#FF9F43',
    padding:10,
    borderRadius:10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#637381',
    marginHorizontal:20
  },
  card: {
    margin:5,
    borderRadius: 5,
    padding:5,
    borderWidth:1,
    borderColor:'#D9D9D9'
  },
  cardcontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    textAlign:'left',
    width:Dimensions.get('screen').width/2
  },
  cardContent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    padding:5
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: '#555',
  },
  trash: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: drawerWidth,
    backgroundColor: '#fff',
    zIndex: 2,
    padding: 20,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItem: {
    fontSize: 16,
    fontWeight:'bold',
    marginLeft:10
    // marginVertical: 10,
  },
  draweritemwrapper:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:15
  },
  draweritemimg:{
    height:24,
    width:24,
    resizeMode:'contain',
  },
  border:{
    borderWidth:1,
    borderColor:'#DFE4EA',
    marginVertical:90
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default HomeScreen;
