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
import ImagePicker from 'react-native-image-crop-picker';

class MakeProfile extends React.Component {
  state = {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG-GWp9R0p9UrshUAZRiOiH-62eKWwyBOlInissnsMS3PeiPp0',
    name: '',
    address: '',
    mobileNumber: '',
    DOB: '',
    bloodGroup: '',
    disease: '',
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
            headingText="Develop Profile"
          />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 15,
              flexDirection: 'row',
              marginVertical: 10,
              flex: 1,
              elevation: 5,
              backgroundColor: 'white',
              opacity: 30,
              justifyContent: 'center',
              paddingLeft: 20,
              paddingVertical: 12,
            }}>
            <View style={{width: '70%', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  style={{
                    tintColor: '#08a4ff',
                    width: 20,
                    height: 20,
                    borderWidth: 0,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    fontSize: 17,
                    color: '#08a4ff',
                    fontWeight: '500',
                    marginLeft: 15,
                  }}>
                  Welcome
                </Text>
              </View>
              {/* <Text style={{ fontSize: 22,color:'#61b1ff'  }}> Peter Malark  </Text> */}

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // elevation: 3,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingVertical: 12,
                  width: '95%',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  ImagePicker.openPicker({
                    cropping: true,
                    compressImageQuality: 0.5,
                  })
                    .then((image) => {
                      this.setState({avatar: image.path});
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  style={{
                    tintColor: '#08a4ff',
                    width: 20,
                    height: 20,
                    borderWidth: 0,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    fontSize: 15,
                    color: '#717171',
                    fontWeight: '500',
                    marginLeft: 15,
                  }}>
                  Upload from gallery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  // elevation: 3,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingVertical: 12,
                  width: '95%',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  ImagePicker.openCamera({
                    cropping: true,
                    compressImageQuality: 0.5,
                  })
                    .then((image) => {
                      this.setState({avatar: image.path});
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  style={{
                    tintColor: '#08a4ff',
                    width: 20,
                    height: 20,
                    borderWidth: 0,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    fontSize: 15,
                    color: '#717171',
                    fontWeight: '500',
                    marginLeft: 15,
                  }}>
                  Take a photo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '30%', justifyContent: 'center'}}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                  borderWidth: 0.5,
                  borderColor: '#dcdcdc',
                  backgroundColor: '#d9d9d9',
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: this.state.avatar}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

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
                source={require('../../assets/images/user.png')}
                style={{height: 15, width: 15, marginLeft: 10}}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 16,
                  color: '#08a4ff',
                  fontWeight: 'bold',
                  marginLeft: 15,
                }}>
                Your Information{' '}
              </Text>
            </View>
            <View
              style={{
                width: '88%',
                alignSelf: 'center',
                borderWidth: 0,
                paddingVertical: 10,
              }}>
              <TextInput
                placeholder="Full Name"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 5,
                  fontSize: 12,
                  paddingRight: 10,
                }}
                placeholderTextColor="#595959"
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                multiline={true}
              />

              <TextInput
                placeholder="Mobile Number"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                keyboardType="phone-pad"
                onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                value={this.state.mobileNumber}
                placeholderTextColor="#595959"
                maxLength={35}
              />

              <TextInput
                placeholder="Address"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
                multiline={true}
              />
              <TextInput
                placeholder="Date Of Birth"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(DOB) => this.setState({DOB})}
                value={this.state.DOB}
              />
              <TextInput
                placeholder="Blood Group"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(bloodGroup) => this.setState({bloodGroup})}
                value={this.state.bloodGroup}
              />
              <TextInput
                placeholder="Disease"
                style={{
                  paddingLeft: 10,
                  borderWidth: 1.5,
                  marginTop: 7,
                  fontWeight: '200',
                  borderColor: '#74ccff',
                  borderRadius: 10,
                  height: 45,
                  paddingVertical: 0,
                  fontSize: 12,
                }}
                placeholderTextColor="#595959"
                onChangeText={(disease) => this.setState({disease})}
                value={this.state.disease}
                multiline={true}
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
                this.state.avatar.length === 0 ||
                this.state.name.length === 0 ||
                this.state.address.length === 0 ||
                this.state.mobileNumber.length === 0 ||
                this.state.DOB.length === 0 ||
                this.state.bloodGroup.length === 0 ||
                this.state.disease.length === 0
              ) {
                this.refs.toast.show('Kindly Fill All The Fields', 1500);
              } else {
                let userdata = {
                  avatar: this.state.avatar,
                  name: this.state.name,
                  address: this.state.address,
                  mobileNumber: this.state.mobileNumber,
                  DOB: this.state.DOB,
                  bloodGroup: this.state.bloodGroup,
                  disease: this.state.disease,
                };
                this.props.reduxActions.updateUserInformation(
                  userdata,
                  this.props.navigation,
                  this.refs.toast,
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeProfile);
