import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import styles from "../../assets/css/RendeMainLists";
import URLS from "../../core/URLS";
import FastImage from 'react-native-fast-image'
import Separator from "../main/Separator";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import {Connect} from "../../core/Connect";
import EditAD from "../main/EditAD";
import {AppColorRed} from "../../assets/css/Styles";

export default class RendeMainLists extends React.Component {
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
        // this.forceUpdate()
        // console.warn('IsMine: ' + this.props.IsMine)
        return (
            <View style={styles.EachRow}>
                <TouchableOpacity onPress={() => this._GoDetails(item)} style={[styles.TourismListContainer, {}]}>
                    <View style={{flexShrink: 1, width: '100%'}}>
                        <Text style={[styles.DetailsText, {fontSize: 16}]}>{item.name}</Text>
                        <Text style={[styles.DetailsText, {}]} numberOfLines={3}>اطلاعات: {item.desc}</Text>
                    </View>
                    <FastImage source={require('./../../assets/Images/house.png')}
                                 style={{
                                     display: item.link == null ? 'flex' : 'none',
                                     width: 100,
                                     height: 100,
                                     borderRadius:3
                                 }}/>
                    <FastImage source={{uri: item.link ? URLS.Media() + item.link : null}}
                                 borderRadius={3}
                                 style={{
                                     display: item.link !== null ? 'flex' : 'none',
                                     width: 100,
                                     height: 100,
                                     borderRadius:3
                                 }}/>
                </TouchableOpacity>
                {/*-------------Edit---------------------------------------------------------------------------------------*/}
                <View
                    style={[styles.BottomSeg, {display: this.props.IsMine === undefined || this.props.PageName == 'fav' ? 'none' : 'flex'}]}>
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
            </View>
        )
    }

    _GoDetails(item) {
        // console.warn(item);
        if (item.type === 'advertise' || this.props.PageName === 'adver') {
            this.props.navigation.navigate('DetailsAD', {
                id: item.id
            })
        } else if (item.type === 'room' || this.props.PageName === 'room') {
            this.props.navigation.navigate('DetailsRoom', {
                id: item.id
            })
        } else if (item.type === 'tourism' || this.props.PageName === 'tourism') {
            this.props.navigation.navigate('DetailsTour', {
                id: item.id
            })
        } else if (item.type === 'file' || this.props.PageName === 'file') {
            this.props.navigation.navigate('DetailsFile', {
                id: item.fid,

            })
        }
    }

    _Delete(id, type) {
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
                                console.log('delete: ');
                                console.log(res);
                                if (res) {
                                    this.props.update(this.props.userId, this.props.IsMine, null)
                                    alert('مورد با موفقیت حذف گردید')
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


    _Edit(id) {
        // alert('id: '+item.id)
        if (this.props.PageName === 'adver') {
            this.props.navigation.navigate('EditAD', {
                id: id
            })
        } else if (this.props.PageName === 'room') {
            this.props.navigation.navigate('EditRoom', {
                id: id
            })
        } else if (this.props.PageName === 'tourism') {
            this.props.navigation.navigate('EditTour', {
                id: id
            })
        }
    }
}


