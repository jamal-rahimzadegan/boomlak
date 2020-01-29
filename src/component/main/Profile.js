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
import Header from "./Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles, {
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import Picker from "react-native-picker";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Loading: '',
            lName: '',
            Name: '',
            phone: '',
            NIDN: '',
            bDate: '',
            Identify: '',
            Details: [],
            province: [],
            city: [],
            SelectedPro: '',
            SelectedProID: '',
            SelectedCity: '',
            SelectedCityID: '',
            FatherName: '',
            shomare_cart: '',
            shomare_shaba: '',
            shomare_hesab: '',
            sadereh: '',
            address: '',
            token: '',

        };
    }

    componentWillMount() {
        this._GetProvince();
        AsyncStorage.multiGet(['id', 'token']).then((keys) => {
            // console.warn(keys[0][1])
            this.setState({ID: keys[0][1], token: keys[1][1]})
            this._GetProfile(keys[0][1]);
        });
    }

    render() {
        return (
            <View style={styles.LoginContainer}>
                <Header navigation={this.props.navigation} PageTitle={'پروفایل'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.TitleText}>نام:</Text>
                    <TextInput
                        value={this.state.Name}
                        onChangeText={(Name) => this.setState({Name})}
                        underlineColorAndroid={"transparent"}
                        placeholder={'نام'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>نام خانوادگی:</Text>
                    <TextInput
                        value={this.state.lName}
                        onChangeText={(lName) => this.setState({lName})}
                        underlineColorAndroid={"transparent"}
                        placeholder={'نام خانوادگی'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>تلفن:</Text>
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({phone})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        maxLength={11}
                        placeholder={'شماره تلفن'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>تاریخ تولد:</Text>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._BDate()}>
                        <Text
                            style={styles.CityProText}>{this.state.bDate}</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>کدملی:</Text>
                    <TextInput
                        value={this.state.NIDN}
                        onChangeText={(NIDN) => this.setState({NIDN})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        maxLength={10}
                        placeholder={'کدملی'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>شماره شناسنامه:</Text>
                    <TextInput
                        value={this.state.Identify}
                        onChangeText={(Identify) => this.setState({Identify})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'شماره شناسنامه'}
                        maxLength={10}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>نام پدر:</Text>
                    <TextInput
                        value={this.state.FatherName}
                        onChangeText={(FatherName) => this.setState({FatherName})}
                        underlineColorAndroid={"transparent"}
                        placeholder={'نام پدر'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>شماره کارت:</Text>
                    <TextInput
                        value={this.state.shomare_cart}
                        onChangeText={(shomare_cart) => this.setState({shomare_cart})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'شماره کارت'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>شماره شبا:</Text>
                    <TextInput
                        value={this.state.shomare_shaba}
                        onChangeText={(shomare_shaba) => this.setState({shomare_shaba})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'شماره شبا'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>شماره حساب:</Text>
                    <TextInput
                        value={this.state.shomare_hesab}
                        onChangeText={(shomare_hesab) => this.setState({shomare_hesab})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'شماره حساب'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>صادره:</Text>
                    <TextInput
                        value={this.state.sadereh}
                        onChangeText={(sadereh) => this.setState({sadereh})}
                        underlineColorAndroid={"transparent"}
                        placeholder={'صادره'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <Text style={styles.TitleText}>استان:</Text>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectProvince()}>
                        <Text
                            style={styles.CityProText}>{this.state.SelectedPro ? this.state.SelectedPro : 'انتخاب استان'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>شهر:</Text>
                    <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectCity()}>
                        <Text
                            style={styles.CityProText}>{this.state.SelectedCity ? this.state.SelectedCity : 'انتخاب شهر'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>آدرس:</Text>
                    <TextInput
                        value={this.state.address}
                        onChangeText={(address) => this.setState({address})}
                        underlineColorAndroid={"transparent"}
                        placeholder={'آدرس'}
                        style={[styles.SingupEachInp, {textAlign: 'right'}]}
                    />
                    <TouchableOpacity style={[styles.ConfirmBtn,{marginTop:25}]} onPress={() => this._UpdateProfile()}>
                        <Text
                            style={[styles.ConfirmTxt, {
                                display: !this.state.Loading ? 'flex' : 'none'
                            }]}>ثبت تغییرات</Text>
                        <ActivityIndicator size={30} color={'#fff'}
                                           display={this.state.Loading ? 'flex' : 'none'}/>
                    </TouchableOpacity>
                </ScrollView>
                {/*<View style={styles.ButtomNav}>*/}
                {/*    <NavigationBar navigation={this.props.navigation}/>*/}
                {/*</View>*/}
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    // -------------------------porfile -----------------------------------------------------------------------
    _GetProfile(ID) {
        Connect.SendPRequest(URLS.Link() + 'profile', {userId: parseInt(ID)})
            .then(res => {
                // console.warn('profile: ' + res);
                console.log(res.profile);
                if (res) {
                    let det = res.profile;
                    this.setState({
                        Details: res.profile,
                        Name: det.fName,
                        lName: det.lName,
                        phone: det.tell,
                        SelectedPro: det.pName,
                        SelectedCity: det.cName,
                        NIDN: det.NIDN,
                        SelectedProID: det.provinceId,
                        SelectedCityID: det.cityId,
                        FatherName: det.father,
                        shomare_cart: det.shomare_cart,
                        shomare_shaba: det.shomare_shaba,
                        shomare_hesab: det.shomare_hesab,
                        sadereh: det.sadereh,
                        address: det.address,
                        Identify: det.identity,
                        bDate: det.bdate,

                    })
                }
            }).catch((e) => {
        });
    }

    // -------------------------Edit porfile -----------------------------------------------------------------------
    _UpdateProfile() {
        let {
            ID, lName, phone, Name, SelectedProID, NIDN, SelectedCityID, FatherName,
            shomare_cart,
            shomare_shaba,
            shomare_hesab,
            sadereh,
            bDate,
            Identify,
            token,
            address,
        } = this.state;
        console.warn('phone: '+phone)
        console.warn('token: '+token)
        this.setState({Loading:true})
        Connect.SendPRequest(URLS.Link() + 'editprofile', {
            userId: parseInt(ID),
            fName: Name,
            lName: lName,
            NIDN: NIDN,
            provinceId: parseInt(SelectedProID),
            cityId: parseInt(SelectedCityID),
            tell: phone,
            father: FatherName,
            shomare_cart: shomare_cart,
            shomare_shaba: shomare_shaba,
            shomare_hesab: shomare_hesab,
            sadereh: sadereh,
            address: address,
            identity: Identify,
            bdate: bDate,
            token: token,
        }).then(res => {
            this.setState({Loading:false})
            // console.warn(res);
            if (res) {
                if (res.result) {
                    this.dropdown.alertWithType('success', '', "اطلاعات با موفقیت ویرایش شدند.");
                }
            }
        }).catch((e) => {
            this.setState({Loading:false})
        });
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
                    SelectedProID: pros.indexOf(data.toString()) + 1,
                    // SelectedProID: (data.indexOf(data.toString()))+1,
                    // CityID: this.state.CityIdList[this.state.CityList.indexOf(data.toString())]
                }, () => this._GetCity(this.state.SelectedProID));
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
                    SelectedCityID: this.state.city[cities.indexOf(data.toString())].id
                }, () => null);
            }
        });
        Picker.show();
    }

    _BDate() {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1380; i > 1310; i--) {
            data[0].push(i)
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
            pickerTitleText: '',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['لبب','بیسل'],
            pickerData: data,
            onPickerConfirm: date => {
                console.warn(date.toString());
                this.setState({
                    bDate: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                }, () => null);


            }
        });
        Picker.show();
    }
}


