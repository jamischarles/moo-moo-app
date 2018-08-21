import React from 'react';
import {Platform, StyleSheet, Image, View, Text, TextInput} from 'react-native';

import {Button} from 'react-native-elements';
import {Marker, Circle} from 'react-native-maps';
import {MapView, Constants, Location, Permissions} from 'expo';
import Geocoder from 'react-native-geocoding';
import debounce from 'lodash/debounce';
import MarkerIcon from './../images/MarkerIcon.svg';
import CowIcon from './../images/CowIcon.png';
// import { GOOGLE_API } from 'react-native-dotenv'

Geocoder.init('AIzaSyDOo_sZchy4F55UcoTjeQo4GssOb0ldpMw');

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      currentRegionName: '',
      // region: {
      // latitude: 11.5683972886659,
      // longitude: 104.92227526802127,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // },
      initialRegion: {
        // latitude: 11.5683972886659,
        // longitude: 104.92227526802127,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };

    // console.log('CONSTRUCTOR!!!');

    // short debounce on map center pin changing more responsive
    // this.onRegionChange = debounce(this._onRegionChange, 120).bind(this);
    this.onRegionChange = this._onRegionChange.bind(this);
    // longer debounce on address showing up
    this.fetchGeoAddress = debounce(this._fetchGeoAddress, 400).bind(this);
  }

  // taken from Expo docs
  // https://docs.expo.io/versions/latest/sdk/location
  componentWillMount() {
    // console.log('WILL MOUNT!!!');
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log('*LOCATION RECEIVED!');
    this.setState({
      initialRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
    // console.log('location', location);
  };

  // FIXME: add provisions for no location permission
  getStartLocation() {
    return this.state.initialRegion;
  }

  _fetchGeoAddress(region) {
    Geocoder.from(region.latitude, region.longitude)
      .then(json => {
        console.log(
          'json.formatted_address',
          json.results[0].formatted_address,
        );

        // console.log('LAST', json.results[0].address_components[0]);
        this.props.screenProps.updateState(
          'location',
          json.results[0].formatted_address,
          // json.results[0].address_components[0].long_name,
        );
      })
      .catch(error => console.warn(error));
  }

  _onRegionChange(region) {
    // console.log('REGION CHANGE*', region);
    // needed for marker location only...
    this.setState({
      region: {
        ...region, // ensures immutability. Needed?
      },
    });
    this.fetchGeoAddress(region);
  }

  resetRegion() {
    Geocoder.from(
      this.state.initialRegion.latitude,
      this.state.initialRegion.longitude,
    )
      .then(json => {
        this.props.screenProps.updateState(
          'location',
          json.results[0].formatted_address,
          // json.results[0].address_components[0].long_name,
        );
      })
      .catch(error => console.warn(error));

    // this.setState({region: this.state.initialRegion});

    // reset the map back to the inital region
    this.map.animateToRegion(this.state.initialRegion);
  }

  // Fixes to weird map glitches
  // https://stackoverflow.com/questions/49779482/react-native-maps-google-map-turns-back-to-initial-location-after-on-region-cha
  // using onRegionChangeComplete is also MUCH MUCH smoother

  // LEARNING:
  // RN maps: don't make region controlled. Makes it very very glitchy.
  // Just get it initally and then let the map handle it...
  render() {
    var {i18n} = this.props.screenProps;
    // is this even needed?
    if (!this.state.region) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // backgroundColor: 'black',
          }}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>LOADING...</Text>
            <Button
              color={'#666'}
              style={{flex: 1}}
              title="Use this location"
              onPress={() => this.props.navigation.navigate('Confirm')}
            />
          </View>
        </View>
      );
    }

    // TODO: fix the reset button... Use refs?
    // <Button
    //   color={'#666'}
    //   title="Reset Location"
    //   onPress={() => this.resetRegion()}
    //   style={{flex: 1}}
    // />

    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          // backgroundColor: 'black',
        }}>
        <MapView
          ref={ref => (this.map = ref)}
          style={{
            flex: 3,
          }}
          initialRegion={this.getStartLocation()}
          showsUserLocation={true}
          // region={this.state.region}
          onRegionChangeComplete={this.onRegionChange}>
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}>
            <Image source={MarkerIcon} style={{height: 50, width: 50}} />
          </Marker>
          <Marker
            coordinate={{
              latitude: 11.568470353160166,
              longitude: 104.95745898407355,
            }}>
            <Image source={CowIcon} style={{height: 35, width: 30}} />
          </Marker>
          <Circle
            radius={6000}
            center={{
              latitude: 11.549441,
              longitude: 104.918148,
              // latitude: 11.568470353160166,
              // longitude: 104.95745898407355,
            }}
          />
        </MapView>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#666',
              fontWeight: 'bold',
              marginBottom: 20,
              marginTop: -20,
            }}>
            {this.props.screenProps.location}
          </Text>
          <Button
            containerViewStyle={{
              height: 60,
              backgroundColor: '#666',
              width: '100%',
            }}
            large
            backgroundColor="#666"
            color={'#eee'}
            style={{flex: 1}}
            title={i18n('mapCTA')}
            onPress={() => this.props.navigation.navigate('Confirm')}
          />
        </View>
      </View>
    );
  }
}

// <Button
//   color={'#666'}
//   title="Reset Location"
//   onPress={() => this.resetRegion()}
//   style={{flex: 1}}
// />
