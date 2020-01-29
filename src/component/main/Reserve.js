import React from 'react';
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text, ScrollView,
} from 'react-native';
import styles from "../../assets/css/DetailsFile";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor, PickerTitleColor,
    PickerToolBarBg
} from "../../assets/css/Styles";
import Header from "./Header";
import Picker from "react-native-picker";
import URLS from "../../core/URLS";
import {Connect} from "../../core/Connect";
import NavigationBar from "./NavigationBar";

export default class Reserve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Cat: [],
            Loading: false,
            LoadingPay: false,
            ShowBottom: false,
            StartTime: '',
            EndTime: '',
            Message: '',
            price: '',
        };
    }


    render() {
        // console.warn('userId: '+this.props.navigation.getParam('userId'))
        let userId = this.props.navigation.getParam('userId');
        // console.warn('id: '+this.props.navigation.getParam('id'))
        let id = this.props.navigation.getParam('id');
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'رزرو اتاق'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/*------------------reserve date Button---------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.ReserveBtnDate} onPress={() => this._FromReseveTime()}>
                        <Text
                            style={styles.ReserveSelectText}>{this.state.StartTime ? this.state.StartTime : 'تاریخ شروع رزرو'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ReserveBtnDate} onPress={() => this._ToReseveTime()}>
                        <Text
                            style={styles.ReserveSelectText}>{this.state.EndTime ? this.state.EndTime : 'تاریخ پایان رزرو'}</Text>
                    </TouchableOpacity>
                    {/*-------------------check reserve Button--------------------------------------------------------------------------------*/}
                    <TouchableOpacity onPress={() => this._CheckDate(id)}
                                      style={[styles.PayBtn, {}]}>
                        <Text style={[styles.PayText, {display: this.state.Loading ? "none" : "flex"}]}>
                            نمایش قیمت</Text>
                        <ActivityIndicator color="#ffffff" style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                    </TouchableOpacity>
                    {/*---------------------------------------------------------------------------------------------------------------*/}
                    <View style={{display: this.state.ShowBottom ? 'flex' : 'none'}}>
                        <Text style={styles.ReserveSelectText}>هزینه رزور برای این بازه: </Text>
                        <Text style={styles.ReserveSelectText}>{Connect.FormatNumber(parseInt(this.state.price))}</Text>
                        <Text style={styles.ReserveSelectText}>{this.state.Message}</Text>
                        <TouchableOpacity onPress={() => this._Pay(id,userId)}
                                          style={[styles.PayBtn, {}]}>
                            <Text style={[styles.PayText, {display: this.state.LoadingPay ? "none" : "flex"}]}>
                               پرداخت</Text>
                            <ActivityIndicator color="#ffffff" style={{display: this.state.LoadingPay ? 'flex' : 'none'}}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    //----------ToReseveTime----------------------------------------------------------------------------------------------------------
    _ToReseveTime() {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1398; i < 1400; i++) {
            data[0].push(i)
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerFontColor: PickerFontColor,
            pickerToolBarBg: PickerToolBarBg,
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
            // EndTime
            onPickerConfirm: date => {
                console.warn(date.toString());
                this.setState({
                    EndTime: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                }, () => null);
            }
        });
        Picker.show();
    }

    //----------_FromReseveTime----------------------------------------------------------------------------------------------------------
    _FromReseveTime() {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1398; i < 1400; i++) {
            data[0].push(i)
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerFontColor: PickerFontColor,
            pickerToolBarBg: PickerToolBarBg,
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
            // EndTime
            onPickerConfirm: date => {
                console.warn(date.toString());
                this.setState({
                    StartTime: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                }, () => null);
            }
        });
        Picker.show();
    }

    //-----------------CheckDate-------------------------------------------------------------------------------
    _CheckDate(id) {
        let {StartTime, EndTime} = this.state
        if (StartTime !== '' &&
            EndTime !== '') {
            // console.warn('from: ' + this.state.StartTime)
            // console.warn('To: ' + this.state.EndTime)
            this.setState({Loading: true})
            Connect.SendPRequest(URLS.Link() + "displayprice", {
                startTime: StartTime,
                endTime: EndTime,
                id: parseInt(id),
            }).then(res => {
                console.warn('displayprice ');
                console.warn(res);
                if (res.result === true) {
                    this.setState({
                        Message: res.message,
                        price: res.price,
                        Loading: false,
                        ShowBottom: true
                    })
                } else {
                    this.setState({Loading: false, price: '-'});
                    this.dropdown.alertWithType('warn', '', res.message);
                }
            }).catch(() => this.setState({Loading: false}));
        } else {
            this.dropdown.alertWithType('warn', '', "لطفا تاریخ ها را وارد کنید");
        }
    }

    //-----------------Reserve-------------------------------------------------------------------------------
    _Pay(id,userId) {
        let {StartTime, EndTime} = this.state;
        if (StartTime !== '' &&
            EndTime !== '') {
            // console.warn('from: ' + this.state.StartTime)
            // console.warn('To: ' + this.state.EndTime)
            this.setState({LoadingPay: true});
            Connect.SendPRequest(URLS.Link() + "payroom", {
                startTime: StartTime,
                endTime: EndTime,
                id: parseInt(id),
                price:this.state.price,
                userId:parseInt(userId)
            }).then(res => {
                console.warn('pay room ');
                console.warn(res);
                if (res.result === true) {
                    this.dropdown.alertWithType('success', '', res.message);
                    this.setState({
                        LoadingPay: false
                    })
                } else {
                    this.setState({LoadingPay: false, price: '-'});
                    this.dropdown.alertWithType('error', '', res.message);
                }
            }).catch(() => this.setState({LoadingPay: false}));
        } else {
            this.dropdown.alertWithType('warn', '', "لطفا تاریخ ها را وارد کنید");
        }
    }
}




