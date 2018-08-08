import React from 'react';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  Keyboard,
  StyleSheet,
  View,
  // Text,
  TextInput,
  ImageBackground,
  Picker,
} from 'react-native';

import {
  Text,
  Divider,
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
      totalCost: 1,
    };
    // this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.updateBottleSizeIndex = this.updateBottleSizeIndex.bind(this);
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

  // FIXME: combine this logic in one place (update form?)
  updateBottleSizeIndex(selectedIndex) {
    var {screenProps} = this.props;
    this.setState(
      {
        selectedIndex: selectedIndex,
        totalCost: this.state.quantity * (selectedIndex + 1),
      },
      () => {
        screenProps.updateState('bottleSize', selectedIndex + 1);
        screenProps.updateState('totalCost', this.state.totalCost);
      },
    );
  }

  render() {
    var props = this.props;
    var {screenProps} = this.props;
    var {selectedIndex} = this.state;
    var buttons = ['1 liter - $1', '2 liter - $2'];

    // start array with 10 el and fill with Picker items
    var quantityPickerItems = Array.from('x'.repeat(10));
    quantityPickerItems.map((item, key) => {
      return <Picker.Item label={'1'} value={'1'} />;
    });

    return (
      <View style={styles.form}>
        <Text style={styles.formLabel}>Bottle Size </Text>

        <ButtonGroup
          buttonStyle={{backgroundColor: '#eee'}}
          selectedButtonStyle={{backgroundColor: 'white'}}
          onPress={this.updateBottleSizeIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 100, marginBottom: 20}}
        />

        <Text style={styles.formLabel}>Quantity</Text>

        <Picker
          selectedValue={this.state.quantity}
          style={{
            height: 65,
            paddingTop: 8,
            width: '100%',
            backgroundColor: 'white',
            marginBottom: 20,
          }}
          itemStyle={{height: 50}}
          onValueChange={(itemValue, i) =>
            this.setState(
              {
                quantity: itemValue,
                totalCost: itemValue * (this.state.selectedIndex + 1),
              },
              () => {
                screenProps.updateState('quantity', itemValue);
                screenProps.updateState('totalCost', this.state.totalCost);
              },
            )
          }>
          <Picker.Item label={'1'} value={'1'} />
          <Picker.Item label={'2'} value={'2'} />
          <Picker.Item label={'3'} value={'3'} />
          <Picker.Item label={'4'} value={'4'} />
          <Picker.Item label={'5'} value={'5'} />
          <Picker.Item label={'6'} value={'6'} />
          <Picker.Item label={'7'} value={'7'} />
          <Picker.Item label={'8'} value={'8'} />
          <Picker.Item label={'9'} value={'9'} />
          <Picker.Item label={'10'} value={'10'} />
        </Picker>

        <Text style={styles.formLabel}>Total Cost</Text>
        <Text style={{fontSize: 16}}>${this.state.totalCost}</Text>

        <Button
          large
          containerViewStyle={styles.formNextButton}
          backgroundColor={styles.ctaBGColor}
          title="Next"
          onPress={() => this.props.navigation.navigate('Name')}
        />
      </View>
    );
  }
}

class PersonalInfo extends React.Component {
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
        <Text style={styles.formLabel}>Name</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={text => screenProps.updateState('name', text)}
          // value={this.state.text}
        />

        <Text style={styles.formLabel}>Phone Number</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.formInput}
          onChangeText={text => screenProps.updateState('phone', text)}
          // value={this.state.text}
        />

        <Button
          large
          backgroundColor={styles.ctaBGColor}
          containerViewStyle={styles.formNextButton}
          title="Set dropoff location"
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.navigate('Location');
          }}
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
    var {screenProps, isSuccessPage} = this.props;
    var boldStyle = {
      fontWeight: 'bold',
      fontSize: 18,
    };
    // var dividerStyleA = {
    //   backgroundColor: '#999',
    //   marginTop: 20,
    //   // marginBottom: 10,
    // };
    // var dividerStyleB = {
    //   backgroundColor: '#666',
    //   // marginTop: 15,
    //   marginBottom: 10,
    // };
    return (
      <View style={styles.form}>
        <Text style={Object.assign({}, styles.formLabel, {fontSize: 22})}>
          Confirmation
        </Text>
        <Text style={{fontSize: 18}}>
          After you place your order, we will call{' '}
          <Text style={boldStyle}>{screenProps.name}</Text> at{' '}
          <Text style={boldStyle}>{screenProps.phone}</Text> to confirm the
          following order:
        </Text>
        <Text style={{marginTop: 15, fontSize: 18}}>
          <Text style={boldStyle}>{screenProps.quantity}</Text>{' '}
          <Text style={boldStyle}>{screenProps.bottleSize}liter</Text> bottles
          will be delivered to{' '}
        </Text>
        <Text style={boldStyle}>
          {screenProps.location}, Phnom Penh, Cambodia
        </Text>
        <Text
          style={{
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          Total Cost: ${screenProps.totalCost}
        </Text>

        {!isSuccessPage && (
          <Button
            large
            backgroundColor={styles.ctaBGColor}
            containerViewStyle={styles.formNextButton}
            title="Place Order"
            onPress={() => this.props.navigation.navigate('Success')}
          />
        )}
      </View>
    );
    // return (
    //   <View style={styles.form}>
    //     <Text style={styles.formLabel}>Confirmation</Text>
    //     <Text>Name: {screenProps.name}</Text>
    //     <Text>Name: {screenProps.name}</Text>
    //     <Text>Phone: {screenProps.phone}</Text>
    //     <Text>Bottle Size: {screenProps.bottleSize}</Text>
    //     <Text>Quantity: {screenProps.quantity}</Text>
    //     <Text>Total Cost: ${screenProps.totalCost}</Text>
    //     <Text>Street: {screenProps.location}, Phnom Penh, Cambodia</Text>
    //
    //     <Button
    //       large
    //       backgroundColor={styles.ctaBGColor}
    //       containerViewStyle={styles.formNextButton}
    //       title="Place Order"
    //       onPress={() => this.props.navigation.navigate('Success')}
    //     />
    //   </View>
    // );
  }
}
export class OrderSuccess extends React.Component {
  // FIXME: remove some of this duplication with confirmation page?
  render() {
    var {screenProps, isSuccessPage} = this.props;
    var boldStyle = {
      fontWeight: 'bold',
      fontSize: 18,
    };
    return (
      <View style={styles.form}>
        <Text h4>Order completed</Text>
        <Text>
          Thank you for your order. We will call you at {screenProps.phone}{' '}
          within 10 minutes to confirm your order.
        </Text>

        <View>
          <Text style={{fontSize: 22, marginTop: 45, fontWeight: 'bold'}}>
            Order details:
          </Text>
          <Text style={{fontSize: 18}}>
            <Text style={boldStyle}>{screenProps.quantity}</Text>{' '}
            <Text style={boldStyle}>{screenProps.bottleSize}liter</Text> bottles
            will be delivered to{' '}
          </Text>
          <Text style={boldStyle}>
            {screenProps.location}, Phnom Penh, Cambodia
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            Total Cost: ${screenProps.totalCost}
          </Text>
        </View>
        <Button
          large
          containerViewStyle={styles.formNextButton}
          backgroundColor={styles.ctaBGColor}
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
    Name: wrapForm(PersonalInfo),
    Location: Map,
    Confirm: Confirm,
  },
  {
    initialRouteName: 'Order',
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
    // backgroundColor: '#e8e8e8',
    display: 'flex',
    // justifyContent: 'left',
    // alignItems: 'center',
    position: 'absolute',
    top: 30,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
  },
  formLabel: {
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  formInput: {
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  ctaBGColor: '#2096f3',
  formNextButton: {
    // backgroundColor: '#2096f3',
    marginTop: 20,
    // padding: '-10px',
    paddingTop: 25,
    paddingBottom: 25,
    position: 'relative',
    left: -15, // hack to compensate for view padding
    width: '100%',
  },

  textForm: {
    padding: 20,
  },

  successScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'top',
    marginTop: '20%',
    padding: 10,
  },
};