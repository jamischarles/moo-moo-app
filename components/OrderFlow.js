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
  ActivityIndicator,
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

// FIXME: put this somewhere else?

class Order extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.i18n('navOne'),
    };
  };

  constructor() {
    super();

    this.bottleCost = 4.3;

    this.state = {
      // bottleSize: '',
      // selectedOption: '',
      // sizes: ['1 Liter', '2 Liter'],
      // selectedIndex: 0,
      quantity: 2,
      totalCost: 0,
    };

    this.state.totalCost = (this.bottleCost * this.state.quantity).toFixed(2);

    // this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // this.setSelectedOption = this.setSelectedOption.bind(this);
    // this.updateBottleSizeIndex = this.updateBottleSizeIndex.bind(this);
  }

  // setSelectedOption(screenProps, selectedOption) {
  //   this.setState(
  //     {
  //       selectedOption,
  //     },
  //     () => {
  //       screenProps.updateState('bottleSize', selectedOption);
  //     },
  //   );
  // }

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
  // updateBottleSizeIndex(selectedIndex) {
  //   var {screenProps} = this.props;
  //
  //   this.setState(
  //     {
  //       selectedIndex: selectedIndex,
  //       totalCost: this.state.quantity * (selectedIndex + 1),
  //       selectedImage: this['img' + selectedIndex],
  //     },
  //     () => {
  //       screenProps.updateState('bottleSize', selectedIndex + 1);
  //       screenProps.updateState('totalCost', this.state.totalCost);
  //     },
  //   );
  // }

  render() {
    var props = this.props;
    var {screenProps} = this.props;
    var {i18n} = this.props.screenProps;
    var {selectedIndex} = this.state;
    var buttons = ['1 liter - $1', '2 liter - $2'];

    return (
      <View style={{...styles.form, padding: 10, top: 0}}>
        <ImageBackground
          style={styles.bottleImage}
          source={require('../images/moo_bottle_2l.png')}
        />
        <Text style={styles.formLabel}>{i18n('orderBottleSize')}</Text>

        <Text style={styles.formLabel}>{i18n('orderQuantity')}</Text>

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
                totalCost: (itemValue * this.bottleCost).toFixed(2),
              },
              () => {
                screenProps.updateState('quantity', itemValue);
                screenProps.updateState('totalCost', this.state.totalCost);
              },
            )
          }>
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

        <Text style={styles.formLabel}>{i18n('orderTotalCost')}</Text>
        <Text style={{fontSize: 16}}>${this.state.totalCost}</Text>

        <Button
          large
          containerViewStyle={styles.formNextButton}
          backgroundColor={styles.ctaBGColor}
          title={i18n('ctaNext')}
          onPress={() => this.props.navigation.navigate('Name')}
        />
      </View>
    );
  }
}

class PersonalInfo extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.i18n('navTwo'),
    };
  };
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      hasErrors: false,
    };
  }

  isFormValid() {
    var {screenProps} = this.props;
    if (screenProps.name == '') {
      this.setState({hasErrors: true});
      return false;
    }
    if (screenProps.phone == '') {
      this.setState({hasErrors: true});
      return false;
    }

    this.setState({hasErrors: false});
    return true;
  }
  render() {
    var {screenProps} = this.props;
    var {i18n} = screenProps;
    var props = this.props;
    return (
      <View style={styles.form}>
        <Text style={styles.formLabel}>{i18n('personalName')}</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={text => screenProps.updateState('name', text)}
          // value={this.state.text}
        />

        <Text style={styles.formLabel}>{i18n('personalPhone')}</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.formInput}
          onChangeText={text => screenProps.updateState('phone', text)}
          // value={this.state.phone}
        />

        {this.state.hasErrors && (
          <Text style={styles.formError}>{i18n('personalError')}</Text>
        )}

        <Button
          large
          backgroundColor={styles.ctaBGColor}
          containerViewStyle={styles.formNextButton}
          title={i18n('personalCTA')}
          onPress={() => {
            Keyboard.dismiss();
            this.isFormValid() && this.props.navigation.navigate('Location');
          }}
        />
      </View>
    );
  }
}

class Confirm extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: screenProps.i18n('navFour'),
    };
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.submitFormViaEmail = this.submitFormViaEmail.bind(this);
  }

  submitFormViaEmail() {
    var {screenProps} = this.props;

    var {name, phone, bottleSize, quantity, location, totalCost} = screenProps;

    // TODO: add phone number for them to call?
    // Any questions? Call #arstarsta
    var data = {
      name,
      phone,
      quantity,
      bottleSize, // can we have mixed orders? later...
      location,
      totalCost,
    };
    var url = 'https://hooks.zapier.com/hooks/catch/3120953/gqmer9/';

    this.setState({isLoading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({isLoading: false});
        this.props.navigation.navigate('Success');
      })
      .catch(e => {
        screenProps.updateState('hasOrderFailed', true, () => {
          this.props.navigation.navigate('Success');
        });
      });
  }

  render() {
    var {screenProps, isSuccessPage} = this.props;
    var {i18n} = screenProps;
    var boldStyle = {
      fontWeight: 'bold',
      fontSize: 18,
    };

    if (this.state.isLoading) {
      return (
        <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
          <ActivityIndicator size="large" color="#2096f3" />
        </View>
      );
    }
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
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
          {i18n('confirmTitle')}
        </Text>
        <Text style={{fontSize: 18}}>
          {i18n('confirmP1', {
            name: <Text style={boldStyle}>{screenProps.name}</Text>,
            phone: <Text style={boldStyle}>{screenProps.phone}</Text>,
          })}
        </Text>
        <Text style={{marginTop: 15, fontSize: 18}}>
          <Text style={boldStyle}>{screenProps.quantity}</Text>{' '}
          {i18n('confirmP2')}{' '}
        </Text>
        <Text style={boldStyle}>{screenProps.location}</Text>
        <Text
          style={{
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          {i18n('confirmTotal')} ${screenProps.totalCost}
        </Text>

        {!isSuccessPage && (
          <Button
            large
            backgroundColor={styles.ctaBGColor}
            containerViewStyle={styles.formNextButton}
            title={i18n('confirmCTA')}
            onPress={() => this.submitFormViaEmail()}
          />
        )}
      </View>
    );
    // onPress={() => this.props.navigation.navigate('Success')}

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
  // before mount, make the ajax call...
  //
  // FIXME: remove some of this duplication with confirmation page?
  render() {
    var {screenProps, isSuccessPage} = this.props;
    var {hasOrderFailed} = screenProps;
    var {i18n} = screenProps;
    var boldStyle = {
      fontWeight: 'bold',
      fontSize: 18,
    };

    var successMsg = (
      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          {i18n('successTitle')}
        </Text>
        <Text style={{fontSize: 18, marginTop: 10}}>
          {i18n('successP1', {
            phone: (
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {screenProps.phone}
              </Text>
            ),
          })}
        </Text>
      </View>
    );

    var failureMsg = (
      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          {i18n('failureTitle')}
        </Text>
        <Text style={{fontSize: 18, marginTop: 10}}>
          {i18n('failureP1', {
            phone: (
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {'098978410'}
              </Text>
            ),
          })}
        </Text>
      </View>
    );

    return (
      <View style={styles.form}>
        {hasOrderFailed ? failureMsg : successMsg}

        <View
          style={{
            backgroundColor: 'white',
            borderColor: '#666',
            borderWidth: 1,
            marginTop: 45,
            padding: 10,
          }}>
          <Text style={{fontSize: 24, fontWeight: '400', marginBottom: 15}}>
            {i18n('successOrderTitle')}
          </Text>
          <Text style={{marginTop: 15, fontSize: 18}}>
            <Text style={boldStyle}>{screenProps.quantity}</Text>{' '}
            {i18n('confirmP2')}{' '}
          </Text>
          <Text style={boldStyle}>{screenProps.location}</Text>
          <Text
            style={{
              marginTop: 15,
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            {i18n('confirmTotal')} ${screenProps.totalCost}
          </Text>
        </View>
        <Button
          large
          containerViewStyle={styles.formNextButton}
          backgroundColor={styles.ctaBGColor}
          title={i18n('successCTA')}
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

const spinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

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
  bottleImage: {
    flex: 4,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: -10,
    paddingRight: -10,
  },
  formError: {
    color: 'red',
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
