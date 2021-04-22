
import * as React from 'react';
import { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, useNavigation,Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { WebView } from 'react-native-webview'
import { MaterialIcons } from '@expo/vector-icons'

import api from './services/api'
import { connect, disconnect } from './services/socket'


function Main({navigation: {navigate}}) {
  
  const [currentRegion, setCurrentRegion] = useState(0)
  const [devs, setDevs] = useState([])
  const [inpTechs, setInpTechs] = useState()
  const navigation = useNavigation();

  useEffect(() => {
    async function loadPosition() {

      const {granted} = await requestPermissionsAsync();
      
      const location = await getCurrentPositionAsync()
      
       setCurrentRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      })
      
    }
    loadPosition()
  }, [])

  function RegionChanged(region){
    setCurrentRegion(region)
  }
  function setSocket() {
    const { latitude, longitude } = currentRegion;
    connect(
      latitude,
      longitude,
      techs,
    )
  }

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;
    const response = await api.get('/search', {
      params:{
        latitude,
        longitude,
        techs: inpTechs,
      }
    })
    setDevs(response.data);
      setSocket()
  }

  if(!currentRegion){
    return null;
  }

  return(
    <>
      <MapView 
        onRegionChangeComplete={RegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
        >

        {devs.map(dev => (
          <Marker 
          key={dev._id}
          coordinate={{
            longitude: dev.location.coordinates[0],
            latitude: dev.location.coordinates[1]
          }}
        >
          <Image style={styles.avatar}
           source={{uri: dev.avatar_url}} 
          />
          <Callout onPress={() => {
            //criar função para navegar para page Profile
            navigation.navigate('Profile', {username: dev.username})
          }}>
            <View style={styles.callout}>
              <Text style={styles.DevName}>{dev.name}</Text>
              <Text style={styles.DevBio}>{dev.bio}</Text>
              <Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
        ))}

      </MapView>
      
      <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder= 'buscar Devs Por Techs'
            placeholderTextColor="#333"
            autoCapitalize='words'
            autoCorrect={false}
            onChangeText={setInpTechs}
          />
          <TouchableOpacity onPress={loadDevs} style={styles.buttonOp} >
            <MaterialIcons name="my-location" size={30} color="#fff" />
          </TouchableOpacity>
      </View>

    </>
  )

}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260,
  },
  DevName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  DevTechs: {
    marginTop: 5,
    color: '#666'
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    color:'#333',
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    elevation: 2,

  },
  buttonOp: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: '#4d0000'
  },
})

function Profile({route, navigation}) {

  const {username} = route.params;

  return <WebView style={{flex: 1}} source={{uri: `https://github.com/${username}`}} />
}

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor: '#7159c8'
        },
        headerTintColor: '#fff'
        
      }}>

      <Stack.Screen 
        name="Main" 
        options={{title: 'Perfil GitHub'}} 
        component={Main} 
        />

      <Stack.Screen 
        name="Profile" 
        options={{title: 'Profile'}} 
        component={Profile} 
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default Routes;
