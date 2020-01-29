import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    AsyncStorage,
    ScrollView, ActivityIndicator,
} from 'react-native';
import styles from "../../assets/css/Login";
import {
    Connect
} from "../../core/Connect";
import URLS from "../../core/URLS";
import Header from "../main/Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles, {
    AppColorGrey, AppColorRed,
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import Picker from "react-native-picker";



export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lName: '',
            Loading:false,
            fName: '',
            NIDN: '',
            cityId: '',
            SelectedPro: '',
            SelectedCity: '',
            provinceId: '',
            city: [],
            province: [],
        };
    }

    componentWillMount() {
        this._GetProvince()
    }

    render() {
        let LoginData = this.props.navigation.getParam('LoginData')
        return (
            <View style={styles.LoginContainer}>
                <Header navigation={this.props.navigation} PageTitle={'ثبت نام'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center',paddingTop:15}}>
                    <TextInput
                        value={this.state.fName}
                        onChangeText={(fName) => this.setState({fName})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        placeholder={'نام'}
                        style={[styles.SingupEachInp, {}]}
                    />
                    <TextInput
                        value={this.state.lName}
                        onChangeText={(lName) => this.setState({lName})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        placeholder={'نام خانوادگی'}
                        style={[styles.SingupEachInp, {}]}
                    />
                    <TextInput
                        value={this.state.NIDN}
                        onChangeText={(NIDN) => this.setState({NIDN})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'کد ملی'}
                        style={[styles.SingupEachInp, {}]}
                    />
                    <View style={styles.SingupEachInp}>
                        <TextInput
                            value={LoginData.tell}
                            editable={false}
                            style={styles.SignupInputs}
                        />
                    </View>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectProvince()}>
                        <Text
                            style={styles.SelectProText}>{this.state.SelectedPro ? this.state.SelectedPro : 'انتخاب استان'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectCity()}>
                        <Text
                            style={styles.SelectProText}>{this.state.SelectedCity ? this.state.SelectedCity : 'انتخاب شهر'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.ConfirmBtn,{display:this.state.Loading?'none':'flex'}]} onPress={() => this._SignUpBtn(LoginData)}>
                        <Text style={styles.ConfirmTxt}> ثبت نام </Text>
                        <ActivityIndicator color={'#fff'} size={27}
                                           display={this.state.Loading ? 'flex' : 'none'}/>
                    </TouchableOpacity>
                    <Text style={[styles.ConfirmTxt,{color:AppColorGrey, margin:10}]}>ورود به منزله موافقت با قوانین است</Text>
                    <Text onPress={()=>this.props.navigation.navigate('Rules')} style={[styles.ConfirmTxt,{color:AppColorGrey}]}>مشاهده قوانین</Text>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _SignUpBtn(LoginData) {
        this.setState({Loading:true})
        let {lName, fName, cityId, provinceId, NIDN} = this.state;
        if (lName !== '' && fName !== '' && cityId !== '' && provinceId !== '' && NIDN !== '') {
            // console.warn({phone: LoginData.tell});
            // console.warn({lName: lName});
            // console.warn({fName: fName});
            // console.warn({NIDN: NIDN});
            // console.warn({cityId: cityId});
            // console.warn({provinceId: provinceId});
            Connect.SendPRequest(URLS.Link() + 'signup', {
                tell: LoginData.tell,
                fName: lName,
                lName: fName,
                NIDN: NIDN,
                cityId: parseInt(cityId),
                provinceId: parseInt(provinceId)
            }).then(res => {
                this.setState({Loading:false})
                // console.warn('rules: ' + res);
                console.warn(res);
                if (res.result) {
                    AsyncStorage.setItem('id', res.profile.userId.toString()).then(() => {
                        this.props.navigation.replace('AmlakList')
                        console.warn('userId: '+res.profile.userId.toString())
                    })
                }
            }).catch((e) => {
                this.setState({Loading:false})
                this.dropdown.alertWithType('error', 'خطا', "مشکل در ثبت ثبت نام");
            });
        } else {
            this.setState({Loading:false})
            this.dropdown.alertWithType('error', 'خطا', "لطفا موارد خالی را کامل کنید");
        }
    }

//---------------------Get Province --------------------------------------------------------------------------------------
    _GetProvince() {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "province", {})
            .then(res => {
                // console.log('province: ');
                // console.warn(res);
                if (res) {
                    this.setState({province: res,});
                } else {
                    this.setState({Empty: true});
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
                // console.warn('Pro id: ' + pros.indexOf(data.toString()));
                this.setState({
                    SelectedPro: data.toString(),
                    provinceId: pros.indexOf(data.toString()) + 1,
                    // SelectedProID: (data.indexOf(data.toString()))+1,
                    // CityID: this.state.CityIdList[this.state.CityList.indexOf(data.toString())]
                }, () => this._GetCity(this.state.provinceId));
            }
        });
        Picker.show();
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
                // console.warn('city: ' + data.toString());
                // console.warn('cityID: ' + this.state.city[cities.indexOf(data.toString())].id);
                // console.warn(this.state.city[cities.indexOf(data.toString())]);
                this.setState({
                    SelectedCity: data.toString(),
                    cityId: this.state.city[cities.indexOf(data.toString())].id
                }, () => null);
            }
        });
        Picker.show();
    }
}


