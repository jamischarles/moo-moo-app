import React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
import { Marker } from 'react-native-maps';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MapView } from 'expo';
import { withFormik } from 'formik';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from 'react-native-dotenv'

Geocoder.init(GOOGLE_API);

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to Moo Moo farms.</Text>
        <Text>You will love our milk. </Text>
        <Button
          title="Start Milk order"
          onPress={() => this.props.navigation.navigate('Form')}
        />
      </View>
    );
  }
}

class FormScreen extends React.Component {
  constructor() {
    super();
    this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
  }
  submitFormViaEmail() {
    var url =
      'https://hooks.zapier.com/hooks/catch/3120953/an5a96?name=lamis&city=san jose';
    // var url = 'https://jsonplaceholder.typicode.com/posts/1'; // fake

    fetch(url, {})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.props.navigation.navigate('Success');
      });
  }
  render() {
    var props = this.props;
    return (
      <View>
        <Text>What is your name? </Text>
        <TextInput
          onChangeText={name => props.setFieldValue('name', name)}
          value={props.values.name}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <Text>Phone number? </Text>
        <TextInput
          onChangeText={phone => props.setFieldValue('phone', phone)}
          value={props.values.phone}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />


        <Button
          title="Create Order"
          // onPress={() => this.props.navigation.navigate('LocationPicker')}
          onPress={() => this.props.navigation.navigate('Order')}
        />

        {/* <Button onPress={this.submitFormViaEmail} title="Place Order" /> */}
      </View>
    );
  }
}

var wrapForm = withFormik({});


//Second Order Form as requested by Kenfo

class Order extends React.Component {
  constructor() {
    super();
    this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
  }
  submitFormViaEmail() {
    var url =
      'https://hooks.zapier.com/hooks/catch/3120953/an5a96?name=lamis&city=san jose';
    // var url = 'https://jsonplaceholder.typicode.com/posts/1'; // fake

    fetch(url, {})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.props.navigation.navigate('Confirm');
      });
  }
  render() {
    var props = this.props;
    return (
      <View>
        <Text>Bottle Size? </Text>
        <TextInput
          onChangeText={bottleSize => props.setFieldValue('bottleSize', bottleSize)}
          value={props.values.bottleSize}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <Text>Quantity?</Text>
        <TextInput
          onChangeText={quantity => props.setFieldValue('quantity', quantity)}
          value={props.values.quantity}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <Button
          title="Choose delivery location"
          onPress={() => this.props.navigation.navigate('LocationPicker')}
        />

      </View>
    );
  }
}

var wrapForm = withFormik({});





class Confirm extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Thank you for your order. We will call you at 123-123-1222 within 5
          minutes to confirm your order.
        </Text>
      </View>
    );
  }
}

class Map extends React.Component {
  constructor() {
    super()
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
    }
  }



  onRegionChange(region) {

    this.setState({ region }, () => {
      setTimeout(() => {
        
        Geocoder.from(region.latitude, region.longitude)
          .then(json => {
            var addressComponent = json.results[0].address_components[0];
            this.setState({ currentRegionName: addressComponent.long_name });
          })
          .catch(error => console.warn(error));
      }, 500);})
  }

  resetRegion() {
    this.setState({
      region: this.state.initialRegion
    }, () => {
      Geocoder.from(this.state.initialRegion.latitude, this.state.initialRegion.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components[0];
          this.setState({ currentRegionName: addressComponent.long_name });
        })
        .catch(error => console.warn(error));
    })
  }

  confirmCoordinates(){

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
        }}
      >
        <MapView
          style={{
            flex: 3
          }}
          region={this.state.region}
          onRegionChange={(region) => this.onRegionChange(region)}
        >
          <Marker
            coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
          />
          <Marker
            coordinate={{ latitude: 11.568470353160166, longitude: 104.95745898407355 }}
          />

        </MapView>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <Text >
            `{this.state.currentRegionName}, Phnom Penh, Cambodia`
          </Text>
          <Button
            title="Reset Location"
            onPress={() => this.resetRegion()}
            style={{ flex: 1 }}
          />
          <Button
            style={{ flex: 1 }}
            title="Confirm"
            onPress={() => this.props.navigation.navigate('Confirm')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Form: wrapForm(FormScreen),
    Order: wrapForm(Order),
    LocationPicker: Map,
    Confirm: Confirm,
  },
  {
    initialRouteName: 'Home',
  },
);

// helpful for more control
// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }
