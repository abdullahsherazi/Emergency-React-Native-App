import React from 'react';
import {View, Animated, SafeAreaView, ImageBackground} from 'react-native';

export default class SplashScreen extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.4);
  }

  componentDidMount() {
    this.spring();
    let timeOutNavigate = setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
      clearTimeout(timeOutNavigate);
    }, 3000);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {/* <ImageBackground
          source={require('../../assets/images/ysplash.png')}
          style={{width: '100%', height: '100%'}}> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            style={{
              width: 100,
              height: 100,
              transform: [{scale: this.springValue}],
            }}
            source={require('../../assets/images/emergency.png')}
          />
        </View>
        {/* </ImageBackground> */}
      </SafeAreaView>
    );
  }
}
