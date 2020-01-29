import React from 'react';
import {
    View,
    TouchableOpacity,
    Text, AsyncStorage,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import styles from "../../assets/css/DetailsFile";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Icon from "react-native-vector-icons/Ionicons";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import SliderComponent from "./SliderComponent";
import Header from "./Header";


export default class DetailsFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: null,
            Tik: false,
            Loading: false,
            Details: [],
            Empty: false
        };
    }


    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let ID = this.props.navigation.getParam('id');
                // console.warn('id file is: ' + ID)
                AsyncStorage.getItem('id').then((id) => {
                        this.setState({
                                ID: id
                            }, () => this._Details(ID, id)
                        )
                        ;
                    }
                );
            }
        );
    }

    render() {
        let fDet = this.state.Details.file;
        let Details = this.state.Details;
        let IsMine = this.props.navigation.getParam('IsMine');
        // console.warn('details: '+Details.file.name)
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'مشخصات ملک'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SliderComponent Images={Details.image}/>
                    <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.DetailsTextQ}>نام: <Text
                            style={styles.DetailsTextA}>{Details.length !== 0 ?Details.file&& fDet.name : '-'}</Text></Text>
                        <TouchableOpacity
                            onPress={() => this._Fav(fDet.id, this.state.ID,)}
                            style={[styles.MarkedBtn, {}]}>
                            <Icon name={"ios-bookmark"} color={this.state.Tik ? AppColorRed : '#bbb'} size={33}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.DetailsTextQ}>نوع ملک: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.mName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>نوع درخواست: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.mName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>سال ساخت: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.constYear : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>تعداد طبقات: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.floorCount : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>متراژ: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.metrajh : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>ودیعه: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.vadieh : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>اجاره: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.price : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>تعداد اتاق: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.roomCount : '-'}</Text></Text>
                    <Text
                        style={styles.DetailsTextQ}>آدرس: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.pName + '، ' + fDet.cName + '، ' + fDet.address : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>توضیحات: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? fDet.desc : '-'}</Text></Text>
                    {/*-------------Map---------------------------------------------------------------------------------*/}
                    <MapView
                        showsCompass={true}
                        followsUserLocation={true}
                        style={styles.map}
                        zoomControlEnabled={true}
                        region={{
                            // latitude:   33.6350,
                            latitude: Details.length !== 0 ? (Details.lat ? Number(Details.lat) : 0) : 32.4279,
                            longitude: Details.length !== 0 ? (Details.long ? Number(Details.long) : 0) : 53.6880,
                            // longitude: 46.4153,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker
                            // image={require('../../assets/Images/MarkerBlue.png')}
                            coordinate={{
                                latitude: Details.length !== 0 ? (Details.lat ? Number(Details.lat) : 0) : 0,
                                longitude: Details.length !== 0 ? (Details.long ? Number(Details.long) : 0) : 0
                            }}
                            title={'موقعیت'}
                        />
                    </MapView>
                    {/*-------request for Transaction-----------------------------------------------------------------------------------*/}
                    <TouchableOpacity
                        style={[styles.ContractBtn, {display: this.state.ID !== null ? IsMine === undefined ? Details.buy === false ? 'flex' : 'none' : 'none' : 'none'}]}
                        onPress={() => this._TransReq(fDet.id)}
                        activeOpacity={.5}>
                        <Text style={[styles.DetailsTextQ, {
                            display: this.state.Loading ? 'none' : 'flex',
                            color: '#fff'
                        }]}>درخواست معامله</Text>
                        <ActivityIndicator size={30} color={'#fff'}
                                           style={{display: !this.state.Loading ? 'none' : 'flex'}}/>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this._Chat(fDet.id)}
                    // onPress={() => this._Chat(fDet.id)}
                    style={[styles.ChatBtn,{left:Details.length==0?1500:10}]}>
                    <Icon name={"md-chatboxes"} color={'#fefefe'} size={32}/>
                </TouchableOpacity>
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    //---------------------Sliders --------------------------------------------------------------------------------------
    _Details(id, userId) {
        // console.warn('IsMine for detials: ' + this.props.navigation.getParam('IsMine'));
        Connect.SendPRequest(URLS.Link() + "file", {
            id: parseInt(id),
            userId: parseInt(userId)
        }).then(res => {
            console.log('File Details: ');
            console.log(res);
            // console.warn('contractej: '+res.contractej)
            // console.warn('contract: '+res.contract)
            if (res) {
                this.setState({
                    Details: res,
                    Tik: res.fav,
                    Empty: false
                });
            }
        });
    }

    //---------------------Chat  --------------------------------------------------------------------------------------
    _Chat(id) {
        // console.warn('chat id: '+id)
        if (this.state.ID === null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.props.navigation.navigate('ChatScreen', {id: id, typeChat: 'file'})
        }
    }

    //---------- Navigate 2 Contract-----------------------------------------------------------------------------
    _GoToContaract(Routes, commission) {
        // console.warn('contract: ' + this.state.Details.contract )
        // console.warn('typeReq: ' + this.state.Details.file.typeReq )
        if (this.state.ID == null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.props.navigation.navigate(Routes, {
                FileId: this.props.navigation.getParam('id'),
                userId: this.state.ID,
                commission: commission
            })
        }
    }

    //---------------------Fav file --------------------------------------------------------------------------------------
    _Fav(id, userId) {
        if (this.state.ID === null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.setState({Tik: !this.state.Tik}, () => {

                if (this.state.Tik === true) {
                    Connect.SendPRequest(URLS.Link() + 'like', {
                        id: parseInt(id),
                        userId: parseInt(userId),
                        type: 'file'
                    }).then(res => {
                        if (res) {
                            console.log('like file was: ');
                            console.log(res);
                        }
                    });
                } else if (this.state.Tik === false) {
                    Connect.SendPRequest(URLS.Link() + "dislike", {
                        id: parseInt(id),
                        type: 'file'
                    }).then(res => {
                        if (res) {
                            // this.setState({Tik: res, Empty: false}, () => this.forceUpdate());
                            // console.warn('dislike file was: ' + res);
                            console.log('dislike file was: ');
                            console.log(res);
                        }
                    });
                }
            });
        }
    }

    //---------_TransReq-----------------------------------------------------------
    _TransReq(id) {
        // console.warn('id file Det: '+id)
        // console.warn('id file Det: '+this.state.ID)
        this.setState({Loading: true})
        Connect.SendPRequest(URLS.Link() + 'buy', {
            id: parseInt(id),
            userId: parseInt(this.state.ID),
        }).then(res => {
            this.setState({Loading: false})
            if (res.result) {
                console.log('TransAction Request was: ');
                console.log(res);
                this.dropdown.alertWithType('success', '', res.message);
            } else {
                this.dropdown.alertWithType('error', '', res.message);
            }
        });
    }
}


