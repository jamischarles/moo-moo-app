import React from 'react';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {MapView} from 'expo';
import {withFormik} from 'formik';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
          onChangeText={text => props.setFieldValue('email', text)}
          value={props.values.email}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <Text>Phone number ? </Text>
        <TextInput
          onChangeText={text => props.setFieldValue('email', text)}
          value={props.values.email}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <Button
          title="Choose deliviery location "
          onPress={() => this.props.navigation.navigate('LocationPicker')}
        />

        <Button onPress={this.submitFormViaEmail} title="Place Order" />
      </View>
    );
  }
}

var wrapForm = withFormik({});

class SuccessScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Thank you for your order. We will call you at 123-123-1222 witin 5
          minutes to confirm your order.
        </Text>
      </View>
    );
  }
}

class Map extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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

export default createStackNavigator(
  {
    Home: HomeScreen,
    LocationPicker: Map,
    Form: wrapForm(FormScreen),
    Success: SuccessScreen,
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
