import React from 'react';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Picker,
} from 'react-native';

import {
  Button,
  ButtonGroup,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

import {SegmentedControls} from 'react-native-radio-buttons';
import {withFormik} from 'formik';

import Map from './Map';

var wrapForm = withFormik({});

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      bottleSize: '',
      selectedOption: '',
      sizes: ['1 Liter', '2 Liter'],
      quantity: 1,
      selectedIndex: 0,
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

  // FIXME: redo this? Hard to navigate which view does what...
  renderContainer(optionNodes) {
    return <View>{optionNodes}</View>;
  }

  render() {
    var props = this.props;
    var {screenProps} = this.props;
    var {selectedIndex} = this.state;
    var buttons = ['Hello', 'World', 'Buttons'];
    return (
      <View style={styles.form}>
        <Text style={{color: 'white'}}>Bottle Size </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 100}}
        />

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
          title="Next"
          onPress={() => this.props.navigation.navigate('Form')}
        />
      </View>
    );
  }
}

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
          style={{
            color: 'white',
            fontFamily: 'Georgia',
            fontSize: 25,
          }}>
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
          style={{
            color: 'white',
            fontFamily: 'Georgia',
            fontSize: 25,
          }}>
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
          title="Set Delivery Location "
          onPress={() => this.props.navigation.navigate('LocationPicker')}
        />
        {/* <Button onPress={this.submitFormViaEmail} title="Place Order" /> */}
      </View>
    );
  }
}

export class OrderSuccess extends React.Component {
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

export default (Form = createMaterialTopTabNavigator(
  {
    Order: wrapForm(Order),
    Form: wrapForm(FormScreen),
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
));

// TODO: use createStylesheet?
var styles = {
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
};
