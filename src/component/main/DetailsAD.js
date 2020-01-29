import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    ScrollView, ActivityIndicator
} from 'react-native';
import styles from "../../assets/css/DetailsFile";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Icon from "react-native-vector-icons/Ionicons";
import SliderComponent from "./SliderComponent";
import Header from "./Header";


export default class DetailsAD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Tik: false,
            Details: [],
            Slider: [],
            Empty: false,
            Loading: false,
        };
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let ID = this.props.navigation.getParam('id');
                AsyncStorage.getItem('id').then((id) => {
                        this.setState({
                                ID: id
                            }, () => this._Details(ID, id)
                        );
                    }
                );
            }
        );
    }

    render() {
        let Details = this.state.Details;
        // console.warn('ID: ' + this.state.ID);
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'آگهی '+(Details.length !== 0 ? Details.name : '')}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SliderComponent Images={this.state.Slider}/>
                    <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.DetailsTextQ}>عنوان: <Text
                            style={styles.DetailsTextA}>{Details.length !== 0 ? Details.name : '-'}</Text></Text>
                        <TouchableOpacity
                            onPress={() => this._Fav(Details.id, this.state.ID,)}
                            style={[styles.MarkedBtn, {}]}>
                            <Icon name={"ios-bookmark"} color={this.state.Tik ? AppColorRed : '#bbb'} size={33}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.DetailsTextQ}>استان: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.pName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>وضعیت: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.sName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>شهر: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.cName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>توضیحات: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.desc : '-'}</Text></Text>
                    {/*-----------Pay Button--------------------------------------------------------*/}
                    <TouchableOpacity onPress={() => this._Pay(Details.id)}
                                      style={[styles.PayBtn, {display: Details.status == 5 ? 'flex' : 'none'}]}>
                        <Text style={[styles.PayText, {display: this.state.Loading ? "none" : "flex"}]}>پرداخت</Text>
                        <ActivityIndicator color="#ffffff" style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                    </TouchableOpacity>
                </ScrollView>
                {/*-----------Chat Button--------------------------------------------------------*/}
                <TouchableOpacity
                    onPress={() => this._Chat(Details.id)}
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
        Connect.SendPRequest(URLS.Link() + "advertise", {
            id: parseInt(id),
            userId: parseInt(userId)
        }).then(res => {
            if (res) {
                this.setState({
                    Slider: res.image,
                    Details: res.adver,
                    Tik: res.fav,
                    Empty: false
                }, () => this.forceUpdate());
                console.log('File Details: ');
                console.log(res);
            }
        });
    }

    //---------------------Fav Ad --------------------------------------------------------------------------------------
    _Fav(id, userId) {
        if (this.state.ID === null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.setState({Tik: !this.state.Tik}, () => {
                if (this.state.Tik === true) {
                    Connect.SendPRequest(URLS.Link() + 'like', {
                        id: parseInt(id),
                        userId: parseInt(userId),
                        type: 'adver'
                    }).then(res => {
                        if (res) {
                            console.warn('like file was: ');
                            console.warn(res);
                        }
                    });
                } else if (this.state.Tik === false) {
                    Connect.SendPRequest(URLS.Link() + "dislike", {
                        id: parseInt(id),
                        type: 'adver'
                    }).then(res => {
                        if (res) {
                            console.warn('dislike file was: ');
                            console.warn(res);
                        }
                    });
                }
            });


        }
    }

    //---------------------Chat  --------------------------------------------------------------------------------------
    _Chat(id) {
        if (this.state.ID === null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.props.navigation.navigate('ChatScreen', {id: id, typeChat: 'adver'})
        }
    }

    //---------------------Pay  --------------------------------------------------------------------------------------
    _Pay(id) {
        this.setState({Loading: true})
        Connect.SendPRequest(URLS.Link() + "payment", {
            id: parseInt(id),
            userId: this.state.ID,
        }).then(res => {
            console.warn(res)
            if (res.result === true) {
                this.dropdown.alertWithType('success', '', res.message);
                this.setState({Loading: false})
            }
        }).catch(() => {
            this.setState({Loading: false})
        });

    }
}


