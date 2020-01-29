import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import styles from "../../assets/css/RendeMainLists";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from 'react-native-fast-image'

export default class RenderAmlaks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Files: [],
            Empty: false
        };
    }

    render() {
        let item = this.props.item.item;
        // console.warn(item.time)
        return (
            <View style={styles.EachRow}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsFile', {
                    id: item.id,
                    IsMine: this.props.IsMine
                })} style={styles.TourismListContainer}>
                    <View style={{width: '74%', flexShrink: 1}}>
                        <Text style={[styles.DetailsText, {fontSize: 16}]}>{item.name}</Text>
                        <Text style={[styles.DetailsText, {marginVertical: 10}]}
                              numberOfLines={3}>اطلاعات: {item.desc}</Text>
                    </View>
                    <FastImage source={require('./../../assets/Images/house.png')}
                                 style={{
                                     display: item.link == null ? 'flex' : 'none',
                                     width: 100,
                                     height: 100,
                                   borderRadius:3
                                 }}/>
                    <FastImage source={{uri: item.link ? URLS.Media() + item.link : null}}
                                 style={{
                                     display: item.link !== null ? 'flex' : 'none',
                                     width: 100,
                                     height: 100,
                                    borderRadius:3
                                 }}/>
                </TouchableOpacity>
                {/*---------Bottom Section-------------------------------------------------------------------------------*/}
                <View style={[styles.BottomSeg, {display: this.props.IsMine === undefined ? 'none' : 'flex'}]}>
                    <View
                        style={[styles.NotPaid, {display: this.props.PageName === 'adver' && item.status == 5 ? 'flex' : 'none'}]}>
                        <Text style={[styles.DetailsText, {color: '#fff'}]}> پرداخت نشده</Text>
                        <Icon1 name={'alert-circle-outline'} size={24} color={'#fff'}/>
                    </View>
                    <Text style={[styles.DetailsText, {fontSize: 12}]}>{item.time}</Text>
                    <View style={styles.EditBtn}>
                        <TouchableOpacity onPress={() => this._Delete(item.id, this.props.PageName)}>
                            <Icon name={'delete'} size={22} color={'#bbb'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._Edit(item.id)}>
                            <Icon name={'edit'} size={22} color={'#bbb'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*---------Contract Btns (just for amlak)-------------------------------------------------------------------------------*/}
                <View style={[styles.ContractBtnContainer, {display: this.props.IsMine == '0' ? 'flex' : 'none'}]}>
                    <TouchableOpacity
                        style={[styles.ContractBtn, {display: this.props.IsMine == '0' && this.props.PageName === 'file' ? 'flex' : 'none'}]}
                        onPress={() => this.props.navigation.navigate('ContractsReqs', {
                            FileID: item.id,
                            Page: 'file'
                        })}>
                        <Text style={[styles.DetailsText, {color: '#fff', textAlign: 'center'}]}>درخواست های
                            معامله</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.ContractBtn, {display: this.props.IsMine == '0' && this.props.PageName === 'file' ? 'flex' : 'none'}]}
                        onPress={() => this._Nav2Contract(item)}>
                        <Text style={[styles.DetailsText, {color: '#fff', textAlign: 'center'}]}> تنظیم قولنامه</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //-----Delete File--------------------------------------------------------------------------------------
    _Delete(id, type) {
        // console.warn('IsMine: ' + this.props.IsMine)
        // console.warn('userId: ' + this.props.userId)
        // this.props.update(this.props.userId,this.props.IsMine,null)

        Alert.alert(
            'هشدار!',
            'آیا مایل به حذف می باشید؟',
            [
                {
                    text: 'خیر',
                    style: 'cancel',
                },
                {
                    text: 'بله', onPress: () => {
                        Connect.SendPRequest(URLS.Link() + "delete", {id: parseInt(id), type: type}) //all=1 is for all ads, and if it was 0 gets myAds
                            .then(res => {
                                console.log('alladvertise: ');
                                console.log(res);
                                if (res) {
                                    alert('حذف با موفقیت انجام گرفت')
                                    this.props.update(this.props.userId,this.props.IsMine,null)
                                } else {
                                    this.setState({Empty: true});
                                }
                            });
                    }
                },
            ],
            {cancelable: false},
        );


    }

    //-----Edit File--------------------------------------------------------------------------------------
    _Edit(id) {
        this.props.navigation.navigate('EditFile', {
            id: id
        })
    }

    _Nav2Contract(item) {
        // console.log(item)
        if (item.typeReq == 3) {
            this.props.navigation.navigate('AddContract', {
                FileID: item.id,
                TypeReq: item.typeReq,
                from: 'Seller',
                userId: item.userId
            })
        } else if (item.typeReq == 1 || 2) {
            this.props.navigation.navigate('RentContract', {
                FileID: item.id,
                TypeReq: item.typeReq,
                from: 'Seller',
                userId: item.userId
            })
        }
    }
}


