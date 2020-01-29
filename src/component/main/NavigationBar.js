import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Keyboard,
    Alert
} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import {AppColorGrey, AppColorRed} from "../../assets/css/Styles";


export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNavBar: false
        };
    }


    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            () => {
                this.setState({showNavBar: true})
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            () => {
                this.setState({showNavBar: false})
            }
        );
    };


    render() {
        let Route = this.props.navigation.state.routeName;
        return (
            <View style={{display: this.state.showNavBar ? 'none' : 'flex'}}>
                <View style={styles.NavigationContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name={"md-menu"} color={"#fff"} size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._Nav("Profile")}>
                        <Icon2 name={"user-alt"} color={Route == "Profile" ? 'gold' : "#fff"} size={23}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._GoHome()}>
                        <Icon name={"ios-home"} color={Route == "AmlakList" ? 'gold' : "#fff"} size={27}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._Nav("Notification")}>
                        <Icon name={"md-notifications-outline"} color={Route == "Notification" ? 'gold' : "#fff"}
                              size={27}/>
                        <Text style={[styles.Nots, {opacity: this.props.Nots == 0 ? 0 : 1}]}>{this.props.Nots}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._Nav("Add")}>
                        <Icon2 name={"plus-square"} color={Route == "Add" ? 'gold' : "#fff"} size={23}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

//-------Navigatie to Home Screen (Main)---------------------------------------------------------------------------
    _GoHome() {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: "AmlakList", params: {resetOrder: 1}})
            ],
        });
        this.props.navigation.dispatch(resetAction);
    };

//-------Navigatie to Profile---------------------------------------------------------------------------
    _Nav(Routes) {
        AsyncStorage.getItem('id').then((id) => {
            // console.warn('id: '+id)
            if (id == null) {
                Alert.alert(
                    '',
                    'لطفا ابتدا وارد شوید',
                    [
                        {text: 'بستن', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            } else {
                this.props.navigation.navigate(Routes)
            }
        })
    }
}
const styles = StyleSheet.create({
    NavigationContainer: {
        width:'100%',
        alignSelf:'center',
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,
        paddingHorizontal: 15,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: AppColorRed,
        paddingVertical: 5

    },
    Nots: {
        position: 'absolute',
        color: '#fff',
        fontSize: 17,
        left: -13,
        top: -14,
        fontFamily: 'BYekan'
    }

})


