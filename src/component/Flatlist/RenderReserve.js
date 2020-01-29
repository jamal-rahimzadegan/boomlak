import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import styles from "../../assets/css/RendeMainLists";
import Separator from "../main/Separator";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import {AppColorRed} from "../../assets/css/Styles";

export default class RenderReserve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false
        };
    }

    render() {
        let item = this.props.item.item;
        let index = this.props.item.index;
        let All = this.props.All;
        // console.warn('resIntTime: '+this.props.resultInt[index].time)
        return (
            <View style={{flex: 1, width: '100%',backgroundColor:'#fff'}}>
                <View style={[styles.ReserveContainer]}>
                        <Text style={[styles.DetailsText, {fontSize: 18,color:AppColorRed}]}>{item.name}</Text>
                        <Text style={[styles.DetailsText, {}]}>نام: {item.fName + ' ' + item.lName}</Text>
                        <Text style={[styles.DetailsText, {}]}>تلفن: {item.phone}</Text>
                        <Text style={[styles.DetailsText, {}]}>وضعیت: {item.accept == 0 ? 'لغو شده' : 'رزرو شده'}</Text>
                        <Text style={[styles.DetailsText, {}]}>شروع رزرو: {item.startTime}</Text>
                        <Text style={[styles.DetailsText, {}]}>پایان رزرو: {item.endTime}</Text>
                        <Text style={[styles.DetailsText, {}]}>تاریخ رزرو: {item.time}</Text>
                    <TouchableOpacity onPress={() => this._CancelReserve(item.id, this.props.userId)}
                                      style={[styles.NotPaid, {
                                          width: '100%', alignSelf: 'center', marginVertical: 20, height: 40,
                                          display: All == 1 ? (item.accept == 1 && this.props.currentTime < this.props.resultInt[index].endTime ? 'flex' : 'none') : 'none'
                                      }]}>
                        <ActivityIndicator color="#ffffff" style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                        <Text style={[styles.DetailsText, {color: '#fff', display: this.state.Loading ? "none" : "flex"}]}>لغو
                            رزرو</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _CancelReserve(id, userId) {
        // console.warn(id, userId);
        this.setState({Loading: true});
        Connect.SendPRequest(URLS.Link() + "delres", {
            id: parseInt(id),
        }).then(res => {
            console.warn('del reserve: ' + res.result);
            // console.warn(res);
            if (res.result) {
                this.props._GetReserves(userId);
                this.setState({Loading: false});
                this.dropdown.alertWithType('success', '', 'رزرو با موفقیت حذف شد');
            } else {
                this.setState({Loading: false});
                this.dropdown.alertWithType('error', '', 'خطا در حذف رزرو');

            }
        });
    }
}


