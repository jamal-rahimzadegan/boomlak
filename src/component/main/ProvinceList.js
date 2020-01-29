import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    StyleSheet, Image, Animated,
    Dimensions, Platform
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {
    AppColorGrey,
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import {
    Connect,

} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import Picker from "react-native-picker";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default class ProvinceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            province: [],
            city: [],
            SelectedPro: '',
            SelectedProID: '',
            SelectedCity: '',
            SelectedCityID: '',
            Empty: false
        };
    }

    componentWillMount() {
        this._GetProvince();
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'فیلتر استان و شهر'}/>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectProvince()}>
                        <Text
                            style={styles.TitleText}>{this.state.SelectedPro ? this.state.SelectedPro : 'انتخاب استان'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectCity()}>
                        <Text
                            style={styles.TitleText}>{this.state.SelectedCity ? this.state.SelectedCity : 'انتخاب شهر'}</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../assets/Images/proSelectBack.jpg')}
                       style={styles.LogoImg}/>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={3000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    //---------------------Get Province --------------------------------------------------------------------------------------
    _GetProvince() {
        Connect.SendPRequest(URLS.Link() + "province", {})
            .then(res => {
                console.log('province: ')
                console.log(res)
                if (res) {
                    this.setState({province: res, Empty: false});
                } else {
                    this.setState({Empty: true});
                }
            });
    }


    //---------------------GetCity --------------------------------------------------------------------------------------
    _GetCity(id) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "city", {id: parseInt(id)})
            .then(res => {
                // console.log('city: ');
                // console.warn(res);
                if (res) {
                    this.setState({city: res});
                } else {
                }
            });
    }

//---------------------_SelectProvince--------------------------------------------------------------------------------------
    _SelectProvince() {
        // console.warn('province: ')
        // console.warn(this.state.province)
        let data = [];
        for (let i = 0; i < this.state.province.length; i++) {
            data.push(this.state.province[i].name)
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerToolBarBg: PickerToolBarBg,
            pickerFontColor: PickerFontColor,
            pickerConfirmBtnColor: PickerConfirmBtnColor,
            pickerCancelBtnColor: PickerCancelBtnColor,
            pickerTitleColor: PickerTitleColor,
            pickerBg: PickerBg,
            pickerTextEllipsisLen: 20,
            pickerConfirmBtnText: 'تایید',
            pickerTitleText: 'استان',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['لبب','بیسل'],
            pickerData: this.state.province.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let pros = [];
                for (let i = 0; i < this.state.province.length; i++) {
                    pros.push(this.state.province[i].name)
                }
                AsyncStorage.setItem('idpro', (pros.indexOf(data.toString()) + 1).toString());
                this.dropdown.alertWithType('success', '', `  استان مورد نظر شما به  ${data.toString()} تغییر یافت  `);
                // console.warn('Pro id: ' + pros.indexOf(data.toString()));
                this.setState({
                    SelectedPro: data.toString(),
                    SelectedProID: pros.indexOf(data.toString()) + 1,
                    SelectedCity: '',
                    SelectedCityID: '',
                }, () => this._GetCity(this.state.SelectedProID));
            }
        });
        Picker.show();
    }

    //---------------------_SelectCity--------------------------------------------------------------------------------------
    _SelectCity() {
        // console.warn('CityIdList: ')
        // console.warn(this.state.CityIdList)
        let data = [];
        for (let i = 0; i < this.state.city.length; i++) {
            data.push(this.state.city[i].name)
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerToolBarBg: PickerToolBarBg,
            pickerFontColor: PickerFontColor,
            pickerConfirmBtnColor: PickerConfirmBtnColor,
            pickerCancelBtnColor: PickerCancelBtnColor,
            pickerTitleColor: PickerTitleColor,
            pickerBg: PickerBg,
            pickerTextEllipsisLen: 20,
            pickerConfirmBtnText: 'تایید',
            pickerTitleText: 'شهر',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['لبب','بیسل'],
            pickerData: this.state.city.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let cities = [];
                for (let i = 0; i < this.state.city.length; i++) {
                    cities.push(this.state.city[i].name)
                }
                this.dropdown.alertWithType('success', '', `  شهر مورد نظر شما به  ${data.toString()} تغییر یافت  `);
                AsyncStorage.setItem('idcity', (this.state.city[cities.indexOf(data.toString())].id).toString());
                this.setState({
                    SelectedCity: data.toString(),
                    SelectedCityID: this.state.city[cities.indexOf(data.toString())].id
                }, () => null);
            }
        });
        Picker.show();
    }
}
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    SelectProBtn: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: 'red',
                shadowOffset: {height: 0, width: 0},
            },
            android: {
                elevation: 8,
            }
        }),
        borderRadius: 3,
        backgroundColor: '#eee',
        padding: 10,
        marginHorizontal: 15,
        marginTop:22,
    },
    TitleText: {
        fontFamily: 'BYekan',
        color: '#333',
        fontSize: 16
    },
    LogoImg: {
        opacity: .75,
        width: '100%',
        height: H > W ? 160 : 130,
        marginBottom: 0,
        resizeMode: 'stretch'
    }
});


