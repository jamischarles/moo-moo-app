import React from 'react';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';
import {Marker} from 'react-native-maps';
import {MapView} from 'expo';
import Geocoder from 'react-native-geocoding';
import debounce from 'lodash/debounce';
// import { GOOGLE_API } from 'react-native-dotenv'

Geocoder.init('AIzaSyBzHpB9P08KOrik2Y4oMg9ghcsEsjlblKU');

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      currentRegionName: '',
      region: {
        latitude: 11.5683972886659,
        longitude: 104.92227526802127,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialRegion: {
        latitude: 11.5683972886659,
        longitude: 104.92227526802127,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    Geocoder.from(region.latitude, region.longitude)
      .then(json => {
        this.props.screenProps.updateState(
          'location',
          json.results[0].address_components[0].long_name,
        );
      })
      .catch(error => console.warn(error));

    this.setState({region});
  }

  resetRegion() {
    Geocoder.from(
      this.state.initialRegion.latitude,
      this.state.initialRegion.longitude,
    )
      .then(json => {
        this.props.screenProps.updateState(
          'location',
          json.results[0].address_components[0].long_name,
        );
      })
      .catch(error => console.warn(error));

    this.setState({region: this.state.initialRegion});
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'black',
        }}>
        <MapView
          style={{
            flex: 3,
          }}
          region={this.state.region}
          onRegionChange={debounce(this.onRegionChange, 400)}>
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          />
          <Marker
            coordinate={{
              latitude: 11.568470353160166,
              longitude: 104.95745898407355,
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
          <Text style={{color: 'white'}}>
            `{this.props.screenProps.location}, Phnom Penh, Cambodia`
          </Text>
          <Button
            color={'white'}
            title="Reset Location"
            onPress={() => this.resetRegion()}
            style={{flex: 1}}
          />
          <Button
            color={'white'}
            style={{flex: 1}}
            title="Confirm"
            onPress={() => this.props.navigation.navigate('Confirm')}
          />
        </View>
      </View>
    );
  }
}
