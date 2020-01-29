import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
} from 'react-native';
import styles from "../../assets/css/Login";
import {Connect} from "../../core/Connect";
import Header from "../main/Header";
import DropdownAlert from "react-native-dropdownalert";
import Styles, {AppColorRed} from "../../assets/css/Styles";
import CodeConfirmation, {InpCode} from "../main/CodeConfirmation";


export default class CheckCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Code: ''
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("id").then(id => {
            console.log("check id ", id);
            if (id) this.props.navigation.replace("AmlakList");
        });
    }

    render() {
        let LoginData = this.props.navigation.getParam('LoginData');
        return (
            <View style={styles.LoginContainer}>
                <Header navigation={this.props.navigation} PageTitle={'کد دریافتی را وارد کنید'}/>
                <View style={styles.SentCodeMesage}>
                    <Text style={[styles.ConfirmTxt, {textAlign: 'center'}]}>
                        کد تایید برای شماره {LoginData.tell} ارسال شد</Text>
                    <Text onPress={() => this.props.navigation.goBack()}
                          style={[styles.ConfirmTxt, {textAlign: 'center', color: AppColorRed}]}>ویرایش شماره
                        موبایل</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {/*<Text style={styles.LoginTexts}>کد دریافتی را وارد کنید</Text>*/}
                    <CodeConfirmation/>
                    {/*<CodeInput inactiveColor={'#999'}*/}
                    {/*           activeColor={AppColorRed}*/}
                    {/*           codeLength={4}*/}
                    {/*           cellBorderWidth={1.5}*/}
                    {/*           variant={'border-b'}*/}
                    {/*           space={15}*/}
                    {/*           onFulfill={(Code) => this.setState({Code})}/>*/}
                    <TouchableOpacity style={styles.ConfirmBtn} onPress={() => this._ConfirmPhone(LoginData)}>
                        <Text style={styles.ConfirmTxt}>تایید</Text>
                    </TouchableOpacity>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    _ConfirmPhone(LoginData) {
        // console.warn({Code: this.state.Code});
        // console.warn('InpCode: '+InpCode);
        // console.warn(LoginData.profile.userId);
        if (InpCode == LoginData.code) {
        // if (this.state.Code == LoginData.code) {
            Connect.GetFcmToken();
            if (LoginData.user) {
                AsyncStorage.setItem('id', LoginData.profile.userId.toString())
                    .then(() => {
                        this.props.navigation.replace('AmlakList')
                    })
            } else {
                this.props.navigation.replace('SignUp', {
                    LoginData: LoginData
                })
            }
        } else {
            this.dropdown.alertWithType('error', 'خطا', "لطف کد را به درستی وارد کنید");
        }
    }
}
