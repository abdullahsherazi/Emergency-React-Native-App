import * as actionTypes from './types';
import AsyncStorage from '@react-native-community/async-storage';
import {googleMapsApiKey} from '../../constants/googleMapsApiKey';
import axios from 'axios';

export const loadData = () => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});

  let userdataAsync = await AsyncStorage.getItem('userdata');
  let userdata = JSON.parse(userdataAsync);
  if (userdata) {
    dispatch({
      type: actionTypes.SET_USER_DATA,
      payload: userdata,
    });
  } else {
    let userdata = {
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG-GWp9R0p9UrshUAZRiOiH-62eKWwyBOlInissnsMS3PeiPp0',
      name: '',
      address: '',
      mobileNumber: '',
      DOB: '',
      bloodGroup: '',
      disease: '',
    };
    dispatch({
      type: actionTypes.SET_USER_DATA,
      payload: userdata,
    });
  }

  let emergencyDataAsync = await AsyncStorage.getItem('emergencyData');
  let emergencyData = JSON.parse(emergencyDataAsync);
  if (emergencyData) {
    dispatch({
      type: actionTypes.SET_EMERGENCY_DATA,
      payload: emergencyData,
    });
  } else {
    dispatch({
      type: actionTypes.SET_EMERGENCY_DATA,
      payload: {
        number: '',
        addresses: {
          hospitalAddress: {address: '', coordinate: {}},
          policeStationAddress: {address: '', coordinate: {}},
          homeAddress: {address: '', coordinate: {}},
        },
      },
    });
  }

  dispatch({
    type: actionTypes.NOT_LOADING,
  });
};

export const updateUserInformation = (
  userdata,
  navigation,
  toast,
) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});
  AsyncStorage.setItem('userdata', JSON.stringify(userdata)).then(() => {
    dispatch({
      type: actionTypes.SET_USER_DATA,
      payload: userdata,
    });
    dispatch({
      type: actionTypes.NOT_LOADING,
    });
    navigation.navigate('HomeScreen');
  });
};

export const updateEmergencyData = (
  emergencyData,
  navigation,
  toast,
  onlyNumberChanged,
  reduxEmergencyData,
) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});

  if (onlyNumberChanged) {
    let newEmergencyData = {
      ...reduxEmergencyData,
      number: emergencyData.number,
    };
    AsyncStorage.setItem(
      'emergencyData',
      JSON.stringify(newEmergencyData),
    ).then(() => {
      dispatch({
        type: actionTypes.SET_EMERGENCY_DATA,
        payload: newEmergencyData,
      });
      dispatch({
        type: actionTypes.NOT_LOADING,
      });
      navigation.navigate('HomeScreen');
    });
  } else {
    axios
      .all([
        axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            emergencyData.homeAddress +
            '&key=' +
            googleMapsApiKey,
        ),
        axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            emergencyData.policeStationAddress +
            '&key=' +
            googleMapsApiKey,
        ),
        axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            emergencyData.hospitalAddress +
            '&key=' +
            googleMapsApiKey,
        ),
      ])
      .then(
        axios.spread(
          (homeAddressRes, policeStationAddressRes, hospitalAddressRes) => {
            let newEmergencyData = {
              number: emergencyData.number,
              addresses: {
                hospitalAddress: {
                  address: emergencyData.hospitalAddress,
                  coordinate:
                    hospitalAddressRes.data.results[0].geometry.location,
                },
                policeStationAddress: {
                  address: emergencyData.policeStationAddress,
                  coordinate:
                    policeStationAddressRes.data.results[0].geometry.location,
                },
                homeAddress: {
                  address: emergencyData.homeAddress,
                  coordinate: homeAddressRes.data.results[0].geometry.location,
                },
              },
            };
            AsyncStorage.setItem(
              'emergencyData',
              JSON.stringify(newEmergencyData),
            ).then(() => {
              dispatch({
                type: actionTypes.SET_EMERGENCY_DATA,
                payload: newEmergencyData,
              });
              dispatch({
                type: actionTypes.NOT_LOADING,
              });
              navigation.navigate('HomeScreen');
            });
          },
        ),
      )
      .catch(err => {
        // console.warn(err);
        dispatch({
          type: actionTypes.NOT_LOADING,
        });
        toast.show('Some Problem Occured, Kindly Write Generalized Addresses');
      });
  }
};
