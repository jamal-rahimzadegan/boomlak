import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    AsyncStorage,
    Button,
    ScrollView,
    Dimensions
} from 'react-native';
import styles from "../../assets/css/IntroCityTourism";
import Icon from 'react-native-vector-icons/Entypo';
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import Header from "./Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import Picker from "react-native-picker";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default class IntroCityTourism extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedProvince: '',
            SelectedCity: '',
            username: '',
        };
    }

    componentWillMount() {
        this._GetRoles();
        AsyncStorage.getItem("id").then(id => {
            console.log("check id ", id);
            if (id) this.props.navigation.replace("Main");
        });
    }

    render() {
        return (
            <View style={styles.IntroCityTourismContainer}>
                <Header/>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View style={styles.EachRowIntro}>
                        <TouchableOpacity  onPress={()=>this._SetPro()} style={styles.SelectBtn}>
                            <Text style={styles.IntroText}>{this.state.SelectedProvince===''?'استان':this.state.SelectedProvince}</Text>
                        </TouchableOpacity>
                        <Text style={styles.IntroText}>استان</Text>
                    </View>
                    <View style={styles.EachRowIntro}>
                        <TouchableOpacity onPress={()=>this._SetCity()} style={styles.SelectBtn}>
                            <Text style={styles.IntroText}>{this.state.SelectedCity===''?'شهر':this.state.SelectedCity}</Text>
                        </TouchableOpacity>
                        <Text style={styles.IntroText}>شهر</Text>
                    </View>
                    <View style={styles.EachRowIntro}>
                        <TextInput
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({phone})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'نام مکان'}
                            style={[styles.IntroCityInp, {}]}
                        />
                        <Text style={styles.IntroText}>نام مکان</Text>
                    </View>
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => this._UpdateProfile()}>
                        <Text style={styles.IntroText}> ویرایش </Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={Styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _UpdateProfile() {
        let {
            FullName,
            phone,
            username,
        } = this.state;
        console.warn({FullName: FullName});
        console.warn({phone: phone});
        console.warn({username: username});
        this.dropdown.alertWithType('error', 'خطا', "لطفا تلفن خود را به درستی وارد کنید");
    }

    // -------------------------GetRules -----------------------------------------------------------------------
    _GetRoles() {
        AsyncStorage.getItem('host').then((url) => {
            // console.warn('host: '+URLS.Link(url))
            Connect.SendPRequest(URLS.Link() + 'rules', {}).then(res => {
                // console.warn('rules: ' + res);
                console.warn(res);
                if (res) {
                    this.setState({Rules: res.value})
                }
            }).catch((e) => {
                // this.dropdown.alertWithType('error', 'خطا', "مشکل در ثبت سرویس ها");
            });
        })
    }
    //-------SelectCity--------------------------------------------------------------------------------------------------
    _SetCity() {
        // console.warn('CityIdList: ')
        // console.warn(this.state.CityIdList)
        // let data = [];
        // for (let i = 0; i < this.state.ProvinceList.length; i++) {
        //     data.push(this.state.CityIdList)
        // }
        Picker.init({
            pickerFontFamily:'BYekan',
            pickerFontColor: [36, 37, 42, 1],
            pickerToolBarBg: [242, 38, 19, 1],
            pickerConfirmBtnColor: [228, 241, 254, 6],
            pickerCancelBtnColor:  [228, 241, 254, 6],
            pickerTitleColor: [228, 241, 254, 6],
            pickerBg:  [255, 148, 120, .3],
            pickerTextEllipsisLen: 20,
            pickerConfirmBtnText: 'تایید',
            pickerTitleText: 'شهر',
            pickerCancelBtnText: 'انصراف',
            pickerData: ['لبب','بیسل'],
            // pickerData: this.state.CityList.length !== 0 ? this.state.CityList : [''],
            onPickerConfirm: data => {
                // console.warn('city:'+ data.toString());
                this.setState({
                    City: data.toString(),
                    CityID: this.state.CityIdList[this.state.CityList.indexOf(data.toString())]
                }, () => null);
            }
        });
        Picker.show();
    }

    _SetPro() {

    }
}


