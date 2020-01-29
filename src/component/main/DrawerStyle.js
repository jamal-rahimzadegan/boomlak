import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Text, TouchableOpacity, Alert, View, Image, Share} from 'react-native';
import styles from "../../assets/css/DrawerStyle";
import {NavigationActions, StackActions} from "react-navigation";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownAlert from "react-native-dropdownalert";
import Styles, {AppColorRed} from "../../assets/css/Styles";


export default class DrawerStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: null,
            ShowMyAds: false,
        };

    }

    componentWillMount() {
        AsyncStorage.getItem('id').then((id) => {
            this.setState({ID: id})
        })
    }

    componentDidUpdate() {
        AsyncStorage.getItem('id').then((id) => {
            if (this.state.ID != id) {
                this.setState({ID: id})
                this.touchable.props.onPress();
            }
        })
    }

    render() {
        let Id = this.state.ID;
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.DrawerContainer}>
                {/*-----------Button for updating drawer on profile changes---------------------------------------------*/}
                <TouchableOpacity ref={component => this.touchable = component}
                                  onPress={() => this.forceUpdate()}>
                </TouchableOpacity>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center', alignSelf: 'flex-end', margin: 12}}>
                    <Image source={require('../../assets/Images/Logo.png')}
                           style={{height: 50, width: 50, resizeMode: 'contain'}}/>
                    <Text style={[styles.MyDashboard, {color: '#fff'}]}>بوملاک</Text>
                </View>
                <TouchableOpacity style={{display: Id == null ? 'flex' : 'none'}}
                                  onPress={() => this.props.navigation.navigate('EnterMobile')}>
                    <Text style={[styles.LoginBtn, {}]}>ورود</Text>
                </TouchableOpacity>
                {/*--------Container------------------------------------------------------------------------------------*/}
                <View style={styles.DrawerRowsContainer}>
                    {/*--------Me------------------------------------------------------------------------------------*/}
                    <View style={[styles.EachButton, {flexDirection: 'column', alignItems: 'flex-end'}]}
                          activeOpacity={.5}>
                        <TouchableOpacity style={{flexDirection: 'row-reverse', alignItems: 'center'}}
                                          onPress={() => this.setState({ShowMyAds: !this.state.ShowMyAds})}>
                            <Icon name={"menuunfold"} color={"#fff"} size={20} style={{}}/>
                            <Text style={styles.DrawerBtnText}> بوملاک من</Text>
                        </TouchableOpacity>
                        <View style={{
                            width: '100%',
                            marginVertical: 12,
                            display: this.state.ShowMyAds ? 'flex' : 'none'
                        }}>
                            {/*--------My Ads------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'AdsList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}>آگهی ها</Text>
                            </TouchableOpacity>
                            {/*--------My Melk------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'AmlakList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}>املاک</Text>
                            </TouchableOpacity>
                            {/*--------My Rooms------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'RoomList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}> اتاق ها</Text>
                            </TouchableOpacity>
                            {/*--------Reserve------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'ReserveList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}> رزروها</Text>
                            </TouchableOpacity>
                            {/*--------My Req------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'MyTransaction')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}>معاملات من</Text>
                            </TouchableOpacity>
                            {/*--------My Tour------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'TourList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}>گردشگری ها</Text>
                            </TouchableOpacity>
                            {/*--------My Contracts------------------------------------------------------------------------------------*/}
                            <TouchableOpacity style={styles.SettingBtn}
                                              onPress={() => this._Navigate(Id, 'ContractList')}
                                              activeOpacity={.5}>
                                <Text style={[styles.DrawerBtnText, {color: '#555'}]}>لیست قراردادها</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*--------Fav------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton} onPress={() => this._Navigate(Id, 'Favorite')}
                                      activeOpacity={.5}>
                        <Icon name={"star"} color={"#fff"} size={20} style={{}}/>
                        <Text style={[styles.DrawerBtnText, {}]}> علاقه مندی ها</Text>
                    </TouchableOpacity>
                    {/*--------Categories------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton}
                                      onPress={() => this.props.navigation.navigate('Categories')}>
                        <Icon2 name={"ios-grid"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> دسته بندی ها</Text>
                    </TouchableOpacity>
                    {/*--------Pro select------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton}
                                      onPress={() => this.props.navigation.navigate('ProvinceList')}
                                      activeOpacity={.5}>
                        <Icon3 name={"city-variant"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> انتخاب شهر</Text>
                    </TouchableOpacity>
                    {/*--------Contact Us------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton}
                                      onPress={() => this.props.navigation.navigate('ContactUs')}>
                        <Icon2 name={"md-contacts"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> ارتباط با ما </Text>
                    </TouchableOpacity>
                    {/*--------Contact Us------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton}
                                      onPress={() => this.props.navigation.navigate('AboutUS')}>
                        <Icon name={"infocirlce"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> درباره ما </Text>
                    </TouchableOpacity>
                    {/*--------Share------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachButton}
                                      onPress={() => Share.share(
                                          {
                                              title: "اپلیکیشن بوملاک",
                                              message: "http://www.boomlak.com/",
                                          })}>
                        <Icon2 name={"md-share"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> معرفی به دوستان </Text>
                    </TouchableOpacity>
                    {/*--------logOut------------------------------------------------------------------------------------*/}
                    <TouchableOpacity style={[styles.EachButton, {display: Id !== null ? 'flex' : 'none'}]}
                                      onPress={() => this._Logout()}
                                      activeOpacity={.5}>
                        <Icon name={"poweroff"} color={"#fff"} size={20} style={{}}/>
                        <Text style={styles.DrawerBtnText}> خروج</Text>
                    </TouchableOpacity>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={6000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </ScrollView>
        )
    }

    //-------Logout from the app in drawer------------------------------------------------
    _Logout() {
        Alert.alert(
            'هشدار',
            'آیا مایل به خروج می باشید؟',
            [{
                text: 'خیر',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }, {
                text: 'بله', onPress: () => {
                    AsyncStorage.clear();
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: null,

                        actions: [
                            NavigationActions.navigate({
                                routeName: "Splash",
                                params: {resetOrder: 0}
                            })
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            },
            ],
            {cancelable: false},
        );
    }

    //-------Navigate to my pages------------------------------------------------------------------------------
    _Navigate(userId, route) {
        AsyncStorage.getItem('id').then((id) => {
            if (id !== null) {
                this.setState({ShowMyAds: false})
                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "AmlakList",
                            params: {resetOrder: 0, All: 0}
                        })
                    ],
                });
                this.props.navigation.dispatch(resetAction);
                setTimeout(() => {
                    this.props.navigation.navigate(route, {
                        All: 0
                    })
                }, 1)
            } else {
                this.dropdown.alertWithType('warn', '', "لطفا ابتدا وارد شوید");
            }
        })
    }


}

