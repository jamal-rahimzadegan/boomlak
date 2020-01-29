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
import NavigationBar from "../main/NavigationBar";

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default class ForgetPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass: '',
            newpass: '',
            newpassre: '',
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
                    <TextInput
                        value={this.state.FullName}
                        onChangeText={(FullName) => this.setState({FullName})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        placeholder={'رمز عبور قدیم'}
                        style={[styles.SingupEachInp, {textAlign: 'center'}]}
                    />
                    <TextInput
                        value={this.state.FullName}
                        onChangeText={(FullName) => this.setState({FullName})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        placeholder={'رمز عبور جدید'}
                        style={[styles.SingupEachInp, {textAlign: 'center'}]}
                    />
                    <TextInput
                        value={this.state.FullName}
                        onChangeText={(FullName) => this.setState({FullName})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        placeholder={'تکرار رمز عبور جدید'}
                        style={[styles.SingupEachInp, {textAlign: 'center'}]}
                    />
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => this._UpdatePassword()}>
                        <Text style={styles.ConfirmTxt}> ثبت </Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _UpdatePassword() {
        let {
            oldpass,
            newpass,
            newpassre,
        } = this.state;
        console.warn({username: oldpass});
        console.warn({phone: newpass});
        console.warn({password: newpassre});
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
}


