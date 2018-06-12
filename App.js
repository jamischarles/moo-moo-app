import React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MapView } from 'expo';
import { withFormik } from 'formik';
import Map from './components/Map';


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
