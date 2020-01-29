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
import styles from "../../assets/css/Login";
import Icon from 'react-native-vector-icons/Entypo';
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import Header from "../main/Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles from "../../assets/css/Styles";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
            <View style={styles.LoginContainer}>
                <Header/>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View style={styles.SingupEachInp}>
                        <TextInput
                            value={this.state.username}
                            onChangeText={(username) => this.setState({username})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            // returnKeyType={"نام"}
                            placeholder={'نام کاربری'}
                            style={styles.SignupInputs}
                        />
                        <Icon color={'#000'} name={'user'} size={27}/>
                    </View>
                    <View style={styles.SingupEachInp}>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            // returnKeyType={"نام"}
                            placeholder={'کلمه عبور'}
                            style={styles.SignupInputs}/>
                        <Icon color={'#000'} name={'lock'} size={27}/>
                    </View>
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => this._ConfirmPhone()}>
                        <Text style={styles.ConfirmTxt}>ورود</Text>
                    </TouchableOpacity>
                    <Text onPress={() => this.props.navigation.navigate()}
                          style={[styles.ConfirmTxt, {color: '#444', fontSize:16,marginTop: 20}]}>رمز عبور خود را فراموش کرده
                        ام!</Text>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _ConfirmPhone() {
        console.warn({username: this.state.phone});
        if (/^09[\d]{9}$/.test(this.state.phone)) {
        } else {
            this.dropdown.alertWithType('error', 'خطا', "لطفا تلفن خود را به درستی وارد کنید");

        }
    }

    //    -------------------------GetRules -----------------------------------------------------------------------
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

    _ConfirmRules() {
        this.state.IsChecked ? this.setState({ShowRules: false}) : this.dropdown.alertWithType('error', 'خطا', "لطفا تیک موافقت با قوانین را بزنید.");
    }

}


