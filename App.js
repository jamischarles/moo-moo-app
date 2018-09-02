import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Picker,
} from 'react-native';
import {Button} from 'react-native-elements';
import {MapView} from 'expo';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

import OrderFlow, {OrderSuccess} from './components/OrderFlow';
import {Icon} from 'react-native-elements';

class HomeScreen extends React.Component {
  render() {
    var {i18n, updateState} = this.props.screenProps;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar />
        <ImageBackground
          style={styles.carousel}
          source={require('./images/cow_black_white.jpg')}
        />
        <View style={styles.carouselContainer}>
          <Text style={styles.homeGreetingText}>{i18n('homeGreeting')}</Text>
          <Text style={styles.homeSubtitle}>{i18n('homeSubtitle')}</Text>
          <Text style={styles.homeSubtitle}>{i18n('homeCall')}</Text>
        </View>
        <View style={styles.languageBtnContainer}>
          <Button
            // containerViewStyle={{width: '100%'}}
            // backgroundColor="#2096f3"
            color="white"
            raised
            title="English"
            onPress={() => updateState('language', 'en')}
          />
          <Button
            // containerViewStyle={{width: '100%'}}
            // backgroundColor="#2096f3"
            color="white"
            raised
            title="ភាសាខ្មែរ"
            onPress={() => updateState('language', 'km')}
          />
        </View>
        <View style={styles.startMilkOrderContainer}>
          <Button
            containerViewStyle={{width: '100%'}}
            large
            backgroundColor="#2096f3"
            color="white"
            raised
            titleStyle={{lineHeight: 24}}
            buttonStyle={{padding: 0, height: 60}}
            title={i18n('homeCTA')}
            onPress={() => this.props.navigation.navigate('Order')}
          />
        </View>

        <View style={styles.valuePropRows}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.valuePropRowsTitle}>
              {i18n('homePropTitle')}
            </Text>
          </View>
          // First Bullet item
          <View style={{flexDirection: 'row'}}>
            <Icon
              size={20}
              style={{flex: 1}}
              color={'white'}
              name="location-pin"
              type="entypo"
            />
            <Text style={styles.valuePropText}>{i18n('homeSub1')}</Text>
          </View>
          // Second Bullet item
          <View style={{flexDirection: 'row'}}>
            <Icon
              size={20}
              style={{flex: 1}}
              color={'white'}
              name="location-pin"
              type="entypo"
            />
            <Text style={styles.valuePropText}>{i18n('homeSub2')}</Text>
          </View>
          // Third Bullet item
          <View style={{flexDirection: 'row'}}>
            <Icon
              size={20}
              style={{flex: 1}}
              color={'white'}
              name="location-pin"
              type="entypo"
            />
            <Text style={styles.valuePropText}>{i18n('homeSub3')}</Text>
          </View>
          // Fourth Bullet item
          <View style={{flexDirection: 'row'}}>
            <Icon
              size={20}
              style={{flex: 1}}
              color={'white'}
              name="location-pin"
              type="entypo"
            />
            <Text style={styles.valuePropText}>{i18n('homeSub4')}</Text>
          </View>
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
  carousel: {
    flex: 4,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    // alignItems: 'flex-start',
    position: 'absolute',
    top: '5%',
    // backgroundColor: '#272727',
    backgroundColor: 'rgba(39, 39, 39, 0.7)',
    // padding: '5%',
    padding: 10,
    borderRadius: 5,
    zIndex: 10000,
  },
  // phoneNumberContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // alignItems: 'flex-start',
  //   position: 'absolute',
  //   top: '30%',
  //   // backgroundColor: '#272727',
  //   backgroundColor: 'rgba(39, 39, 39, 0.7)',
  //   // padding: '5%',
  //   padding: 10,
  //   borderRadius: 5,
  //   zIndex: 10000,
  // },
  languageBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    position: 'absolute',
    top: '23%',
    // backgroundColor: '#272727',
    backgroundColor: 'rgba(39, 39, 39, 0.7)',
    // padding: '5%',
    padding: 10,
    borderRadius: 5,
    zIndex: 10000,
  },
  homeGreetingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  homeSubtitle: {
    color: 'white',
    // fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
  },

  title: {
    color: 'white',
  },

  // section above valuePropRows
  // FIXME: get rid of it?
  valuePropRowsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 8,
  },

  valuePropRows: {
    backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    width: '100%',
  },

  valuePropText: {
    color: 'white',
    lineHeight: 24,
    fontSize: 14,
  },

  startMilkOrderContainer: {
    width: '100%',
    backgroundColor: '#272727',
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-start',
    padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // marginTop: -350,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#272727',
    padding: 10,
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

// main wrapper with main state
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      language: 'en', // OR khmer? 'km'
      // FIXME: move these? Change them?
      name: '',
      phone: '',
      bottleSize: '1',
      quantity: '1',
      street: '',
      coordinates: '',
      totalCost: 1,
      orderHasFailed: false,
    };

    this.i18n = this.i18n.bind(this);
  }

  i18n(key, data) {
    var contentStr = content[this.state.language][key];

    if (!data) return contentStr;

    // if data, then return array instead of string
    var contentArr = contentStr.split(/(\${\w+})/);

    var contentReady = contentArr.map((item, i) => {
      // if placeholder, return interpolated value, else return raw string
      var match = item.match(/\${(\w+)}/);
      if (!match) return item;
      // FIXME: consider adding error handling for missing keys
      var value = data[match[1]];

      return React.createElement(Text, {key: item + i}, value);
      // return value;
    });

    // return React.createElement(Text, {key: '1231'}, contentReady);
    return contentReady;
  }

  render() {
    // FIXME: this is fugly. Fix it...
    // passes props to all the screens
    const screenProps = {
      i18n: this.i18n,
      updateState: (stateVal, val, cb = function() {}) => {
        this.setState({[stateVal]: val}, cb);
      },
      // FIXME: Can I remove all these?
      // FIXME: fetch all these from this.state? Just spread / obj.assign?
      name: this.state.name,
      phone: this.state.phone,
      bottleSize: this.state.bottleSize,
      quantity: this.state.quantity,
      location: this.state.location,
      totalCost: this.state.totalCost,
      hasOrderFailed: this.state.hasOrderFailed,
    };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <RootStack screenProps={screenProps} />;
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    OrderFlow: OrderFlow,
    Success: OrderSuccess,
  },
  {
    initialRoute: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

var content = {
  en: {
    ctaNext: 'Next',
    homeGreeting: 'Welcome to Moo Moo farms.',
    homeSubtitle: 'Delivering fresh, local milk in Phnom Penh, Cambodia.',
    homeCall: 'Any questions? Call 098978410.',
    homeCTA: 'Start Milk order',
    homePropTitle: 'Why our milk is great!',
    homeSub1: 'Fresh Cambodian Product',
    homeSub2: 'No Chemicals or Additives',
    homeSub3: 'American Standard and quality',
    homeSub4: 'Healthy and Delicious',
    orderBottleSize: 'Bottle Size is 2 liters',
    orderQuantity: 'Quantity',
    orderTotalCost: 'Total Cost',
    personalName: 'Name',
    personalPhone: 'Phone Number',
    personalCTA: 'Set dropoff location',
    personalError:
      'Please fill in Name and Phone Number so we can call you to confirm the order.',
    mapCTA: 'Set dropoff location',
    confirmTitle: 'Confirmation',
    confirmP1:
      'After you place your order, we will call ${name} at ${phone} to confirm the following order:',
    confirmP2: 'bottles will be delivered to',
    confirmTotal: 'Total cost: ',
    confirmCTA: 'Place Order',
    successTitle: 'Order completed',
    failureTitle: 'There has been a problem.',
    successP1:
      'Thank you for your order. We will call you at ${phone} within 10 minutes to confirm your order.',
    failureP1:
      'There has been a problem. Please call us at ${phone} to complete your order.',
    successOrderTitle: 'Order details',
    successCTA: 'Home',
    navOne: 'Order',
    navTwo: 'Name',
    navThree: 'Location',
    navFour: 'Confirm',
  },

  km: {
    ctaNext: 'បន្ទាប់',
    homeGreeting: 'សូមស្វាគមន៍មកកាន់កសិដ្ឋានមូមូ',
    homeSubtitle:
      'ផ្តល់ជូនទឹកដោះគោស្រស់ នៅក្នុងរាជធានីភ្នំពេញ នៃប្រទេសកម្ពុជា ',
    homeCall: 'តើអ្នកមានសំណួរទេ? សូមទូរស័ព្ទមកលេខនេះ 098978410',
    homeCTA: 'ចាប់ផ្តើមបញ្ជាទិញ ទឹកដោះគោ',
    homePropTitle: 'ហេតុអ្វីបានជាទឹកដោះរបស់យើងអស្ចារ្យ?',
    homeSub1: 'ផលិតផលថ្មី របស់កម្ពុជា',
    homeSub2: 'មិនមានសារធាតុគីមី ឬសារធាតុបន្ថែមផ្សេងៗ',
    homeSub3: 'ស្តង់ដារអាមេរិក និងមានគុណភាព',
    homeSub4: 'មានសុខភាពល្អ និងរសជាតិឈ្ងុយឆ្ងាញ់',
    orderBottleSize: 'ទំហំដបគឺ 2 លីត្រ',
    orderQuantity: 'បរិមាណ',
    orderTotalCost: 'ចំណាយសរុប',
    personalName: 'ឈ្មោះ',
    personalPhone: 'លេខទូរស័ព្ទ',
    personalCTA: 'កំណត់ទីតាំងដឹកជញ្ជូន',
    personalError:
      'សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទរបស់លោកអ្នក ដូច្នេះក្រុមការងារយើងខ្ញុំអាចទំនាក់ទំនង ដើម្បីបញ្ជាក់ពីការបញ្ជាទិញ របស់លោកអ្នក',
    mapCTA: 'កំណត់ទីតាំងដឹកជញ្ជូន',
    confirmTitle: 'ការបញ្ជាក់',
    confirmP1:
      'បន្ទាប់ពីលោកអ្នកដាក់ការបញ្ជាទិញ យើងខ្ញុំនឹងទំនាក់ទំនងទៅកាន់លោក${name} តាមរយៈ ទូរស័ព្ទ ${phone} ដើម្បីបញ្ជាក់ពីលំដាប់ដូចខាងក្រោម:',
    confirmP2: 'ដប នឹងត្រូវបានបញ្ជូន',
    confirmTotal: 'ចំណាយសរុប :',
    confirmCTA: 'ដាក់ការបញ្ជាទិញ',
    successTitle: 'ការបញ្ជាទិញបានបញ្ចប់',
    failureTitle: 'មានបញ្ហា',
    successP1:
      'សូមអរគុណចំពោះការបញ្ជាទិញរបស់លោកអ្នក ។ យើងខ្ញុំនឹងទំនាក់ទំនង ទៅកាន់លោកអ្នក ${phone} ក្នុងរយៈពេល 10 នាទី ដើម្បីបញ្ជាក់ពីការបញ្ជាទិញរបស់លោកអ្នក។',
    failureP1:
      'មានបញ្ហា។ សូមទូរស័ព្ទមកលេខនេះដើម្បីបំពេញការបញ្ជាទិញរបស់អ្នក ${phone}',
    successOrderTitle: 'ព័ត៌មានលម្អិតសម្រាប់ការបញ្ជាទិញ',
    successCTA: 'អេក្រង់ដើម',
    navOne: 'បញ្ជាទិញ',
    navTwo: 'ឈ្មោះ',
    navThree: 'ទីតាំង',
    navFour: 'បញ្ជាក់',
  },
};

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
