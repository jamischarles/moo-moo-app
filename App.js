import React from 'react';
import { StyleSheet, Button, View, Text, TextInput, ImageBackground, Picker } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { MapView } from 'expo';
import { withFormik } from 'formik';
import Map from './components/Map';
import { Icon } from 'react-native-elements';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground style={styles.carousel}
          source={{ uri: 'https://www.maxpixel.net/static/photo/1x/Cow-White-Black-Cows-Pasture-Nature-2306534.jpg' }}
        >
          <View style={styles.carouselContainer}>
            <Text style={{ fontFamily: 'Georgia-Bold', color: 'white' }}>Welcome to Moo Moo farms.</Text>

          </View>
        </ImageBackground>
        <View style={styles.startMilkOrderContainer}>
          <Button
            color="white"
            title="Start Milk order"
            onPress={() => this.props.navigation.navigate('Form')}
          />
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{ flex: 1 }}
              color={'white'}
              name='emoji-happy'
              type='entypo'
            />
            <Text
              style={{ color: 'white', flex: 2 }}
            >
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{ flex: 1 }}
              color={'white'}
              name='location-pin'
              type='entypo'
            />
            <Text
              style={{ color: 'white', flex: 2 }}
            >
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{ flex: 1 }}
              color={'white'}
              name='thumb-up'
              type='SimpleLineIcons'
            />
            <Text
              style={{ color: 'white', flex: 2 }}
            >
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{ flex: 1 }}
              color={'white'}
              name='explore'
              type='MaterialCommunityIcons'
            />
            <Text
              style={{ color: 'white', flex: 2 }}
            >
              This Milk is Fantastic
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

class FormScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: ''
    }
    // this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
  }
  // submitFormViaEmail() {
  //   var url =
  //     'https://hooks.zapier.com/hooks/catch/3120953/an5a96?name=lamis&city=san jose';
  //   // var url = 'https://jsonplaceholder.typicode.com/posts/1'; // fake

  //   fetch(url, {})
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       this.props.navigation.navigate('Success');
  //     });
  // }
  render() {
    var props = this.props;
    return (
      <View style={styles.form}>

        <Text style={{ color: 'white', fontFamily: 'Georgia-Bold', fontSize: 25 }}>What is your name? </Text>
        <TextInput
          // onChangeText={name => props.setFieldValue('name', name)}
          onChangeText={name => this.setState({ name })}
          value={props.values.name}
          style={{
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <Text style={{ color: 'white', fontFamily: 'Georgia-Bold', fontSize: 25 }}>Phone number? </Text>
        <TextInput
          // onChangeText={phone => props.setFieldValue('phone', phone)}
          onChangeText={phone => this.setState({ phone })}
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
          style={{ flex: 1 }}
          color={'white'}
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
    this.state = {
      bottleSize: '',
      sizes: [
        {
          label: '1 Liter',
          value: '1 Liter'
        },
        {
          label: '2 Liter',
          value: '2 Liter'
        },
      ]
    }
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
      <View style={styles.form}>
        <Text style={{ color: 'white' }}>Bottle Size? </Text>
        <View style={{ flexDirection: 'row' }}>
          {/* Would like to use a switch here or some other option */}
          <Button
            style={{ flex: 1 }}
            title="1 Liter"
            onPress={() => this.setState({ bottleSize: '1 Liter' })}
          />
          <Button
            style={{ flex: 1 }}
            title="2 Liter"
            onPress={() => this.setState({ bottleSize: '2 Liter' })}
          />
        </View>

        <Text style={{ color: 'white' }}>Quantity?</Text>
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
  constructor() {
    super()
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Is this right?
        </Text>
        <Button
          title='confirm'
          onPress={() => this.props.navigation.navigate('Success')}
        />
      </View>
    );
  }
}
class Success extends React.Component {
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
  carousel: {
    flex: 4,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    backgroundColor: '#272727',
    padding: '5%',
    borderRadius: 25
  },
  title: {
    color: 'white',
  },
  startMilkOrderContainer: {
    width: '100%',
    backgroundColor: '#272727',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  infoBox: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#272727',
    padding: 10
  },
  form: {
    flex: 1,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }
});

export default createStackNavigator(
  {
    Home: HomeScreen,
    Form: createMaterialTopTabNavigator(
      {
        Form: wrapForm(FormScreen),
        Order: wrapForm(Order),
        LocationPicker: Map,
        Confirm: Confirm,
      },
      {
        initialRouteName: 'Form',
        tabBarOptions: {
          style: {
            backgroundColor: 'black'
          },
          tabStyle: {
            backgroundColor: '#272727'
          },
          labelStyle: {
            color: 'white'
          }
        }
      },
    ),
    Success: Success,

  },
  {
    initialRoute: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },

)

// export default createMaterialTopTabNavigator(
//   {
//     Home: HomeScreen,
//     Form: wrapForm(FormScreen),
//     Order: wrapForm(Order),
//     LocationPicker: Map,
//     Confirm: Confirm,
//   },
//   {
//     initialRouteName: 'Home',
//   },
// );

// helpful for more control
// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }
