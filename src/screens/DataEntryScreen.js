import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import GlobalButton from '../components/GlobalButton';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Loader from '../components/Loader';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';

class DataEntryScreen extends React.Component {
  state = {
    number: this.props.reduxState.emergencyData.number,
    homeAddress: this.props.reduxState.emergencyData.addresses.homeAddress
      .address,
    policeStationAddress: this.props.reduxState.emergencyData.addresses
      .policeStationAddress.address,
    hospitalAddress: this.props.reduxState.emergencyData.addresses
      .hospitalAddress.address,
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
        <ScrollView>
          <GlobalHeader
            twoWords={true}
            backArrow={true}
            navigation={this.props.navigation}
            backgroundColor="white"
            headingText="Emergency Data"
          />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 10,
              paddingVertical: 20,
              elevation: 5,
              backgroundColor: 'white',
              padding: 8,
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 0,
                alignItems: 'center',
                paddingLeft: 10,
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/emergency.png')}
                style={{height: 15, width: 15, marginLeft: 10}}
                resizeMode="contain"
                tintColor={'#08a4ff'}
              />

              <Text
                style={{
                  fontSize: 16,
                  color: '#08a4ff',
                  fontWeight: 'bold',
                  marginLeft: 15,
                }}>
                Emergency Data
              </Text>
            </View>
            <View
              style={{
                width: '88%',
                alignSelf: 'center',
                borderWidth: 0,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: 'red',
                  fontWeight: 'bold',
                  marginLeft: 4,
                  marginTop: 10,
                }}>
                Emergency Number:
              </Text>
              <TextInput
                placeholder="Emergency Number Along With Country Code"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  // marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 10,
                }}
                keyboardType="phone-pad"
                onChangeText={(number) => this.setState({number})}
                value={this.state.number}
                placeholderTextColor="#595959"
                maxLength={35}
              />

              <Text
                style={{
                  fontSize: 10,
                  color: 'red',
                  fontWeight: 'bold',
                  marginLeft: 4,
                  marginTop: 10,
                }}>
                Home Address:
              </Text>
              <TextInput
                placeholder="Home Address"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  // marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 85,
                  justifyContent: 'flex-start',
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(homeAddress) => this.setState({homeAddress})}
                value={this.state.homeAddress}
                multiline={true}
              />

              <Text
                style={{
                  fontSize: 10,
                  color: 'red',
                  fontWeight: 'bold',
                  marginLeft: 4,
                  marginTop: 10,
                }}>
                Nearest Hospital Address:
              </Text>
              <TextInput
                placeholder="Nearest Hospital Address"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  // marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 85,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(hospitalAddress) =>
                  this.setState({hospitalAddress})
                }
                value={this.state.hospitalAddress}
              />

              <Text
                style={{
                  fontSize: 10,
                  color: 'red',
                  fontWeight: 'bold',
                  marginLeft: 4,
                  marginTop: 10,
                }}>
                Nearest Police Station Address:
              </Text>
              <TextInput
                placeholder="Nearest Police Station Address"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  // marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 85,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(policeStationAddress) =>
                  this.setState({policeStationAddress})
                }
                value={this.state.policeStationAddress}
              />
            </View>
          </View>
          <GlobalButton
            text={' Save Changes'}
            EditImage={true}
            navigation={this.props.navigation}
            marginBottom={10}
            submit={() => {
              if (
                this.state.number.length === 0 ||
                this.state.homeAddress.length === 0 ||
                this.state.policeStationAddress.length === 0 ||
                this.state.hospitalAddress.length === 0
              ) {
                this.refs.toast.show('Kindly Fill All The Fields', 1500);
              } else if (
                this.state.number ===
                  this.props.reduxState.emergencyData.number &&
                this.state.homeAddress ===
                  this.props.reduxState.emergencyData.addresses.homeAddress
                    .address &&
                this.state.policeStationAddress ===
                  this.props.reduxState.emergencyData.addresses
                    .policeStationAddress.address &&
                this.state.hospitalAddress ===
                  this.props.reduxState.emergencyData.addresses.hospitalAddress
                    .address
              ) {
                this.refs.toast.show('Kindly Update Some Information', 1500);
              } else {
                let onlyNumberChanged = false;
                if (
                  this.state.homeAddress ===
                    this.props.reduxState.emergencyData.addresses.homeAddress
                      .address &&
                  this.state.policeStationAddress ===
                    this.props.reduxState.emergencyData.addresses
                      .policeStationAddress.address &&
                  this.state.hospitalAddress ===
                    this.props.reduxState.emergencyData.addresses
                      .hospitalAddress.address
                ) {
                  onlyNumberChanged = true;
                }
                let emergencyData = {
                  number: this.state.number,
                  homeAddress: this.state.homeAddress,
                  policeStationAddress: this.state.policeStationAddress,
                  hospitalAddress: this.state.hospitalAddress,
                };
                this.props.reduxActions.updateEmergencyData(
                  emergencyData,
                  this.props.navigation,
                  this.refs.toast,
                  onlyNumberChanged,
                  this.props.reduxState.emergencyData,
                );
              }
            }}
          />
        </ScrollView>
        <Toast
          ref="toast"
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            width: '90%',
            alignSelf: 'center',
          }}
          position="center"
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
        {this.props.reduxState.loading ? <Loader /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(DataEntryScreen);
