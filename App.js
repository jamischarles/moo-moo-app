import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  ImageBackground,
  Picker,
} from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import {MapView} from 'expo';
import {withFormik} from 'formik';
import Map from './components/Map';
import {Icon} from 'react-native-elements';
import {SegmentedControls} from 'react-native-radio-buttons';

export default class Opening extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      bottleSize: '',
      quantity: '',
      street: '',
      coordinates: '',
    };
  }

  render() {
    const screenProps = {
      updateState: (stateVal, val) => {
        this.setState({[stateVal]: val});
      },
      name: this.state.name,
      phone: this.state.phone,
      bottleSize: this.state.bottleSize,
      quantity: this.state.quantity,
      location: this.state.location,
    };
    return <Nav screenProps={screenProps} />;
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground
          style={styles.carousel}
          source={{
            uri:
              'https://www.maxpixel.net/static/photo/1x/Cow-White-Black-Cows-Pasture-Nature-2306534.jpg',
          }}>
          <View style={styles.carouselContainer}>
            <Text style={{fontFamily: 'Georgia-Bold', color: 'white'}}>
              Welcome to Moo Moo farms.
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.startMilkOrderContainer}>
          <Button
            color="white"
            title="Start Milk order"
            onPress={() => this.props.navigation.navigate('Form')}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{flex: 1}}
              color={'white'}
              name="emoji-happy"
              type="entypo"
            />
            <Text style={{color: 'white', flex: 2}}>
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{flex: 1}}
              color={'white'}
              name="location-pin"
              type="entypo"
            />
            <Text style={{color: 'white', flex: 2}}>
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{flex: 1}}
              color={'white'}
              name="thumb-up"
              type="SimpleLineIcons"
            />
            <Text style={{color: 'white', flex: 2}}>
              This Milk is Fantastic
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Icon
              size={40}
              style={{flex: 1}}
              color={'white'}
              name="explore"
              type="MaterialCommunityIcons"
            />
            <Text style={{color: 'white', flex: 2}}>
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
      phone: '',
    };
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
    const {screenProps} = this.props;
    var props = this.props;
    return (
      <View style={styles.form}>
        <Text
          style={{color: 'white', fontFamily: 'Georgia-Bold', fontSize: 25}}>
          What is your name?{' '}
        </Text>
        <TextInput
          // onChangeText={name => props.setFieldValue('name', name)}
          onChangeText={name =>
            this.setState({name}, () => {
              screenProps.updateState('name', name);
            })
          }
          value={props.values.name}
          style={{
            color: 'white',
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <Text
          style={{color: 'white', fontFamily: 'Georgia-Bold', fontSize: 25}}>
          Phone number?{' '}
        </Text>
        <TextInput
          // onChangeText={phone => props.setFieldValue('phone', phone)}
          onChangeText={phone =>
            this.setState({phone}, () => {
              screenProps.updateState('phone', phone);
            })
          }
          value={props.values.phone}
          style={{
            color: 'white',
            width: 200,
            height: 44,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />

        <Button
          style={{flex: 1}}
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
      selectedOption: '',
      sizes: ['1 Liter', '2 Liter'],
      quantity: 1,
    };
    // this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }
  // submitFormViaEmail() {
  //   var url =
  //     'https://hooks.zapier.com/hooks/catch/3120953/an5a96?name=lamis&city=san jose';
  //   // var url = 'https://jsonplaceholder.typicode.com/posts/1'; // fake

  //   fetch(url, {})
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       this.props.navigation.navigate('Confirm');
  //     });
  // }

  setSelectedOption(screenProps, selectedOption) {
    this.setState(
      {
        selectedOption,
      },
      () => {
        screenProps.updateState('bottleSize', selectedOption);
      },
    );
  }

  renderOption(option, selected, onSelect, index) {
    const style = selected ? {fontWeight: 'bold'} : {};

    return (
      <Text
        onPress={onSelect}
        key={index}
        style={{color: 'white', fontSize: 30}}>
        {option}
      </Text>
    );
  }

  renderContainer(optionNodes) {
    return <View>{optionNodes}</View>;
  }

  render() {
    var props = this.props;
    var {screenProps} = this.props;
    return (
      <View style={styles.form}>
        <Text style={{color: 'white'}}>Bottle Size? </Text>

        <View style={{margin: 20}}>
          <SegmentedControls
            backgroundColor={'black'}
            selectedBackgroundColor={'#272727'}
            selectedTint={'#272727'}
            containerBorderTint={'#272727'}
            separatorTint={'#272727'}
            containerStyle={{width: '80%'}}
            optionContainerStyle={{padding: 10}}
            options={this.state.sizes}
            onSelection={selectedOption =>
              this.setSelectedOption(screenProps, selectedOption)
            }
            selectedOption={this.state.selectedOption}
            renderOption={this.renderOption}
            renderContainer={this.renderContainer}
          />
          <Text style={{color: 'white'}}>
            Selected option: {this.state.selectedOption || 'none'}
          </Text>
        </View>

        <Text style={{color: 'white'}}>Quantity?</Text>

        <Picker
          selectedValue={this.state.quantity}
          style={{height: 50, width: 100, backgroundColor: '#272727'}}
          itemStyle={{height: 50, color: 'white'}}
          onValueChange={(itemValue, i) =>
            this.setState({quantity: itemValue}, () => {
              screenProps.updateState('quantity', itemValue);
            })
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>

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
    var {screenProps} = this.props;
    return (
      <View style={styles.confirm}>
        <Text style={{color: 'white'}}>Is this right?</Text>
        <Text style={{color: 'white'}}>Name: {screenProps.name}</Text>
        <Text style={{color: 'white'}}>Phone: {screenProps.phone}</Text>
        <Text style={{color: 'white'}}>
          Bottle Size: {screenProps.bottleSize}
        </Text>
        <Text style={{color: 'white'}}>Quantity: {screenProps.quantity}</Text>
        <Text style={{color: 'white'}}>
          Street: {screenProps.location}, Phnom Penh, Cambodia
        </Text>

        <Button
          title="confirm"
          onPress={() => this.props.navigation.navigate('Success')}
        />
      </View>
    );
  }
}
class Success extends React.Component {
  render() {
    return (
      <View style={styles.thanks}>
        <Text style={{color: 'white'}}>
          Thank you for your order. We will call you at 123-123-1222 within 5
          minutes to confirm your order.
        </Text>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
    borderRadius: 25,
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
    padding: 10,
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
  },
  confirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  thanks: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

const Nav = createStackNavigator(
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
            backgroundColor: 'black',
          },
          tabStyle: {
            backgroundColor: '#272727',
          },
          labelStyle: {
            color: 'white',
          },
        },
      },
    ),
    Success: Success,
  },
  {
    initialRoute: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

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
