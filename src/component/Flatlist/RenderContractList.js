import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator, Alert} from 'react-native';
import styles from "../../assets/css/RendeMainLists";
import Separator from "../main/Separator";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";


export default class RenderContractList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false
        };

    }

    render() {
        let item = this.props.item.item;
        console.warn(item)
        return (
            <View style={{flex: 1, width: '100%'}}>
                <View style={styles.ReserveContainer}>
                        <Text style={[styles.DetailsText, {}]}>نام ملک: {item.name}</Text>
                        <Text style={[styles.DetailsText, {}]}>نوع ملک: {item.mName}</Text>
                        <Text style={[styles.DetailsText, {}]}>نوع درخواست: {item.rName}</Text>
                        <Text style={[styles.DetailsText, {}]}>قیمت: {item.price}</Text>
                    <TouchableOpacity onPress={() => this._ShowContract(item)}
                                      style={[styles.NotPaid, {width: '100%', alignSelf: 'center', margin: 10, height: 37}]}>
                        <Text style={[styles.DetailsText, {color:'#fff'}]}>مشاهده قرارداد</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    _ShowContract(item) {
        this.props.navigation.navigate('ShowContract', {ConName:item.file,Name:item.name})

    }
}


