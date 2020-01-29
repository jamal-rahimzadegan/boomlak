import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
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
import SliderComponent from "./SliderComponent";
import Header from "./Header";


export default class DetailsRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            // Tik: false,
            Details: [],
            Slider: [],
            Empty: false
        };
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let ID = this.props.navigation.getParam('id');
                // console.warn('id: '+ID)
                this._Details(ID)
                AsyncStorage.getItem('id').then((id) => {
                        this.setState({
                                ID: id
                            }, () => null
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
                <Header navigation={this.props.navigation} PageTitle={'مشخصات '+(Details.name?Details.name:'')}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SliderComponent Images={this.state.Slider}/>
                    <Text style={styles.DetailsTextQ}>اتاق: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.name : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>هتل: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.fName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>آدرس: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.pName + '، ' + Details.cName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>ظرفیت: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.cName : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>قیمت یک شبانه روز: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.price : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>اطلاعات: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.info : '-'}</Text></Text>
                    <Text style={styles.DetailsTextQ}>امکانات: <Text
                        style={styles.DetailsTextA}>{Details.length !== 0 ? Details.facilities : '-'}</Text></Text>
                    {/*-------------------Pay Button---------------------------------------------------------------*/}
                    <View style={{display:this.state.ID===null?'none':'flex'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Reserve', {
                            id: Details.id,
                            userId: this.state.ID
                        })}
                                          style={[styles.PayBtn, {display: this.state.ID !== null ? 'flex' : 'none'}]}>
                            <Text style={[styles.PayText, {display: this.state.Loading ? "none" : "flex"}]}>رزرو</Text>
                            <ActivityIndicator color="#ffffff" style={{display: this.state.Loading ? 'flex' : 'none'}}/>
                        </TouchableOpacity>
                        {/*-------------------Reserves Button---------------------------------------------------------------*/}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RoomReserve', {RoomID: Details.id})}
                                          style={[styles.PayBtn, {display: this.state.ID !== null ? 'flex' : 'none'}]}>
                            <Text style={[styles.PayText, {display: this.state.Loading ? "none" : "flex"}]}>مشاهده
                                رزروها</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/*-------------------Chat Button---------------------------------------------------------------*/}
                <TouchableOpacity onPress={() => this._Chat(Details.id)}
                                  style={styles.ChatBtn}>
                    <Icon name={"md-chatboxes"} color={'#fefefe'} size={32}/>
                </TouchableOpacity>
            <NavigationBar navigation={this.props.navigation}/>
        <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                       containerStyle={{backgroundColor: "red"}}
                       titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
    </View>
    )
    }

    //---------------------Sliders --------------------------------------------------------------------------------------
    _Details(id) {
        Connect.SendPRequest(URLS.Link() + "room", {id: parseInt(id)})
            .then(res => {
                if (res) {
                    this.setState({
                        Slider: res.images,
                        Details: res.data,
                        // Tik: false,
                        Empty: false
                    }, () => this.forceUpdate());
                    console.log('room Details: ');
                    console.log(res);
                }
            });
    }

    //---------------------Chat  --------------------------------------------------------------------------------------
    _Chat(id) {
        if (this.state.ID === null) {
            this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
        } else {
            this.props.navigation.navigate('ChatScreen', {id: id, typeChat: 'room'})
        }
    }
}


