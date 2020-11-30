import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Linking,
  Image,
} from 'react-native';

import getDirections from 'react-native-google-maps-directions';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import GlobalButton from '../components/GlobalButton';
import Loader from '../components/Loader';
import Toast from 'react-native-easy-toast';
import * as Animatable from 'react-native-animatable';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import Entypo from 'react-native-vector-icons/dist/Entypo';

class HomeScreen extends React.Component {
  state = {
    sendMessage: false,
    loading: false,
    coordinates: null,
    mapOverlay: false,
  };
  componentDidMount() {
    this.props.reduxActions.loadData();
  }

  activateLocation = (sendMessage, openMap) => {
    if (this.props.reduxState.emergencyData.number.length === 0) {
      if (sendMessage) {
        this.refs.toast.show('No Emergency Number Available', 1500);
      } else {
        this.refs.toast.show('No Emergency Destination Available', 1500);
      }
      return;
    }

    if (this.state.coordinates === null) {
      this.setState({loading: true});
      if (Platform.OS === 'android') {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(() => {
            Geolocation.getCurrentPosition(
              (position) => {
                this.setState({
                  coordinates: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  },
                  loading: false,
                });

                if (sendMessage === true) {
                  this.setState({
                    sendMessage: true,
                  });
                } else {
                  this.setState({
                    mapOverlay: true,
                  });
                }
              },
              () => {
                this.setState({loading: false});
                this.refs.toast.show('Slow Internet. Try Again', 2000);
              },
              {enableHighAccuracy: false, timeout: 5000},
            );
          })
          .catch(() => {
            this.setState({loading: false});
            this.refs.toast.show('Location not enabled', 1500);
          });
      }
    } else {
      if (sendMessage === true) {
        this.setState({
          sendMessage: true,
        });
      } else {
        this.setState({
          mapOverlay: true,
        });
      }
    }
  };

  openMap = (destination) => {
    const data = {
      source: {
        latitude: this.state.coordinates.lat,
        longitude: this.state.coordinates.lng,
      },
      destination: {
        latitude: destination.coordinate.lat,
        longitude: destination.coordinate.lng,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [],
    };
    getDirections(data);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <GlobalHeader
          backArrow={false}
          headingText={'HOME'}
          twoWords={true}
          drawerIcon={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <GlobalButton
            loading={
              this.props.reduxState.loading ||
              this.state.loading ||
              this.state.sendMessage ||
              this.state.mapOverlay
            }
            text={'Send Alert'}
            fontWeight="bold"
            message={true}
            navigation={this.props.navigation}
            marginBottom={10}
            submit={() => this.activateLocation(true, false)}
          />
          <GlobalButton
            loading={
              this.props.reduxState.loading ||
              this.state.loading ||
              this.state.sendMessage ||
              this.state.mapOverlay
            }
            text={'Exit Route'}
            map={true}
            fontWeight="bold"
            navigation={this.props.navigation}
            marginBottom={10}
            submit={() => this.activateLocation(false, true)}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <GlobalButton
              width="40%"
              fontSize={10}
              loading={
                this.props.reduxState.loading ||
                this.state.loading ||
                this.state.sendMessage ||
                this.state.mapOverlay
              }
              text={
                this.props.reduxState.userdata.avatar
                  ? this.props.reduxState.userdata.name.length === 0
                    ? 'Develop Profile'
                    : 'View Profile'
                  : null
              }
              person={true}
              fontWeight="bold"
              navigation={this.props.navigation}
              marginBottom={10}
              submit={() => {
                if (this.props.reduxState.userdata.name.length === 0) {
                  this.props.navigation.navigate('MakeProfile');
                } else this.props.navigation.navigate('Profile');
              }}
            />

            <GlobalButton
              fontSize={10}
              marginLeft="10%"
              width="40%"
              loading={
                this.props.reduxState.loading ||
                this.state.loading ||
                this.state.sendMessage ||
                this.state.mapOverlay
              }
              text={'911'}
              phone={true}
              fontWeight="bold"
              navigation={this.props.navigation}
              marginBottom={10}
              submit={() => {
                Linking.openURL(`tel:911`);
              }}
            />
          </View>
        </View>

        {this.state.sendMessage ? (
          <Animatable.View
            ref="searchResultView"
            duration={500}
            animation="fadeIn"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                width: '50%',
                height: 100,
                alignSelf: 'center',
                borderRadius: 15,
                padding: 17,
                paddingTop: 15,
                justifyContent: 'space-around',
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{height: 30, width: 30, overflow: 'hidden'}}
                onPress={() =>
                  Linking.openURL(
                    'whatsapp://send?text=' +
                      'I need urgent help, My current location is https://www.google.com/maps/search/?api=1&query=' +
                      this.state.coordinates.lat +
                      ',' +
                      this.state.coordinates.lng +
                      '&phone=' +
                      this.props.reduxState.emergencyData.number,
                  )
                }>
                <Image
                  source={require('../../assets/images/whatsapp.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{height: 30, width: 30, overflow: 'hidden'}}
                onPress={() =>
                  Linking.openURL(
                    `sms:${this.props.reduxState.emergencyData.number}?body=I need urgent help, My current location is https://www.google.com/maps/search/?api=1&query=${this.state.coordinates.lat},${this.state.coordinates.lng}`,
                  )
                }>
                <Image
                  source={require('../../assets/images/message.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{position: 'absolute', top: 5, right: 5}}
                onPress={() =>
                  this.setState({
                    sendMessage: false,
                  })
                }>
                <Entypo name="circle-with-cross" color="#08a4ff" size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : null}

        {this.state.mapOverlay ? (
          <Animatable.View
            ref="searchResultView"
            duration={500}
            animation="fadeIn"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                width: '80%',
                height: 100,
                alignSelf: 'center',
                borderRadius: 15,
                padding: 17,
                paddingTop: 15,
                justifyContent: 'space-around',
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{height: 40, width: 40, overflow: 'hidden'}}
                onPress={() =>
                  this.openMap(
                    this.props.reduxState.emergencyData.addresses.homeAddress,
                  )
                }>
                <Image
                  source={require('../../assets/images/homeblue.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{height: 40, width: 40, overflow: 'hidden'}}
                onPress={() =>
                  this.openMap(
                    this.props.reduxState.emergencyData.addresses
                      .hospitalAddress,
                  )
                }>
                <Image
                  source={require('../../assets/images/hospital.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{height: 40, width: 40, overflow: 'hidden'}}
                onPress={() =>
                  this.openMap(
                    this.props.reduxState.emergencyData.addresses
                      .policeStationAddress,
                  )
                }>
                <Image
                  source={require('../../assets/images/policeStation.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{position: 'absolute', top: 5, right: 5}}
                onPress={() =>
                  this.setState({
                    mapOverlay: false,
                  })
                }>
                <Entypo name="circle-with-cross" color="#08a4ff" size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : null}
        <Toast
          ref="toast"
          style={{
            backgroundColor: 'black',
            // justifyContent: 'center',
            width: '90%',
            alignSelf: 'center',
          }}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{
            color: 'white',
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 'bold',
          }}
        />
        {this.props.reduxState.loading || this.state.loading ? (
          <Loader />
        ) : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
