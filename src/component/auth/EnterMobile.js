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
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import Header from "../main/Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles from "../../assets/css/Styles";


export default class EnterMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            Loading: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("id").then(id => {
            console.log("check id ", id);
            if (id) this.props.navigation.replace("AmlakList");
        });
    }

    render() {
        return (
            <View style={styles.LoginContainer}>
                <Header navigation={this.props.navigation} PageTitle={'لطفا شماره تلفن خود را وارد کنید'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <TextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({phone})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        // returnKeyType={"نام"}
                        maxLenght={2}
                        placeholder={'09'}
                        style={styles.Inputs}
                    />
                    <TouchableOpacity style={[styles.ConfirmBtn, {marginTop: 25}]} onPress={() => this._ConfirmPhone()}>
                        <Text style={[styles.ConfirmTxt, {display: this.state.Loading ? 'none' : 'flex'}]}>ارسال</Text>
                        <ActivityIndicator color={'#fff'} size={30}
                                           style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                    </TouchableOpacity>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _ConfirmPhone() {
        if (/^09[\d]{9}$/.test(this.state.phone)) {
            this.setState({Loading: true})
            Connect.SendPRequest(URLS.Link() + 'addphone', {
                // tell:'09216312329'
                tell: this.state.phone
            }).then(res => {
                this.setState({Loading: false})
                console.warn(res);
                if (res.result) {
                    this.props.navigation.navigate('CheckCode', {
                        LoginData: res
                    })
                }
            }).catch((e) => {
                this.setState({Loading: false})
                this.dropdown.alertWithType('error', 'خطا', "متاسفانه خطایی رخ داده، لطفا دوباره تلاش کنید");
            });
        } else {
            this.setState({Loading: false})
            this.dropdown.alertWithType('warn', '', "لطفا تلفن خود را به درستی وارد کنید");
        }
    }
}


