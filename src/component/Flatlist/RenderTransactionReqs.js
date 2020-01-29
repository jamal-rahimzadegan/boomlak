import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator,Alert} from 'react-native';
import styles from "../../assets/css/RendeMainLists";
import Separator from "../main/Separator";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";


export default class RenderTransactionReqs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false
        };

    }

    render() {
        let item = this.props.item.item;
        // console.warn(item)
        return (
            <View style={{flex: 1, width: '100%',backgroundColor:'#fff'}}>
                <View style={styles.ReserveContainer}>
                    <View>
                        <Text style={[styles.DetailsText, {}]}>نام مشتری: {item.fName+' '+item.lName}</Text>
                        <Text style={[styles.DetailsText, {}]}>تلفن: {item.tell}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._ConfirmContract(item.id)}
                                      disabled={item.confirm==1}
                                      style={[styles.NotPaid, {width: '100%', alignSelf: 'center', margin: 10, height: 37}]}>
                        <ActivityIndicator color="#ffffff" style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                        <Text style={[styles.DetailsText, {color: '#fff',display: this.state.Loading ? 'none' : 'flex'}]}>{item.confirm==0?'تایید':'تایید شده'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _ConfirmContract(id) {
        // console.warn(id, userId);
        this.setState({Loading: true});
        Connect.SendPRequest(URLS.Link() + "confirmreq", {
            id: parseInt(id),
        }).then(res => {
            this.setState({Loading: false})
            console.warn('confirm req: ' + res.result);
            // console.warn(res);
            if (res.result===true) {
                console.warn('message: ' + res.message);
                Alert.alert('',res.message,)
                this.props._GetReq();
            } else {
                alert(res.message)
                Alert.alert('',res.message,)

            }
        });
        this.forceUpdate();
        this.props._GetReq();

    }
}


