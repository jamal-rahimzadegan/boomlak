import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from "../../assets/css/RendeMainLists";


export default class RenderMyTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let item = this.props.item.item;
        // console.warn(item)
        return (
            <View style={{flex: 1, width: '100%',backgroundColor:'#fff'}}>
                <View style={styles.ReserveContainer}>
                        <Text style={[styles.DetailsText, {}]}>نام ملک: {item.name}</Text>
                        <Text style={[styles.DetailsText, {}]}>قیمت: {item.price}</Text>
                        <Text style={[styles.DetailsText, {}]}>نوع ملک: {item.mName}</Text>
                        <Text style={[styles.DetailsText, {}]}>نوع درخواست: {item.rName}</Text>
                    <TouchableOpacity onPress={() => this._GoToContract(item)}
                                      style={[styles.NotPaid, {width: '100%', alignSelf: 'center', margin: 10, height: 37}]}>
                        <Text style={[styles.DetailsText, {color: '#fff',display: !this.state.Loading ? 'flex' : 'none'}]}>تنظیم قولنامه</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    _GoToContract(item) {
        if(item.typeReq==3){
            this.props.navigation.navigate('AddContract',{FileID:item.id,TypeReq:item.typeReq,from:'Buyer',userId:item.userId})
        }else if(item.typeReq==1||2) {
            this.props.navigation.navigate('RentContract',{FileID:item.id,TypeReq:item.typeReq,from:'Buyer',userId:item.userId})
        }
    }
}


