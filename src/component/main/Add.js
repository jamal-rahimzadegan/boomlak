import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text, Image, Dimensions, AsyncStorage, Alert, AppRegistry,
} from 'react-native';
import styles from "../../assets/css/Categories";
import DropdownAlert from 'react-native-dropdownalert';
import Styles from "../../assets/css/Styles";
import {Connect, Media, MediaSmall, Slider} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import RenderAmlaks from "../Flatlist/RenderAmlaks";
import Separator from "./Separator";
import Header from "./Header";
import RenderCat from "../Flatlist/RenderCat";
import {NavigationActions, StackActions} from "react-navigation";


export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Cat: [],
            Empty: false
        };
    }

    componentWillMount() {
        this._GetCat();
        this.props.navigation.addListener("willFocus", payload => {

            }
        );
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'اضافه نمودن'}/>
                {/*--------Add melk------------------------------------------------------------------------------------*/}
                <TouchableOpacity style={styles.BtnContainer}
                                  onPress={() => this._NavigateAdd('AddFile')}
                                  activeOpacity={.5}>
                    <Text style={styles.TitleText}>ملک</Text>
                </TouchableOpacity>
                {/*--------Add Tour------------------------------------------------------------------------------------*/}
                <TouchableOpacity style={styles.BtnContainer}
                                  onPress={() => this._NavigateAdd('AddTour')}
                                  activeOpacity={.5}>
                    <Text style={styles.TitleText}>گردشگری</Text>
                </TouchableOpacity>
                {/*--------Ads------------------------------------------------------------------------------------*/}
                <TouchableOpacity style={styles.BtnContainer}
                                  onPress={() => this._NavigateAdd('AddRoom')}
                                  activeOpacity={.5}>
                    <Text style={styles.TitleText}>اتاق</Text>
                </TouchableOpacity>
                {/*--------Add Ads------------------------------------------------------------------------------------*/}
                <TouchableOpacity style={styles.BtnContainer}
                                  onPress={() => this._NavigateAdd('AddAd')}>
                    <Text style={styles.TitleText}>آگهی</Text>
                </TouchableOpacity>
                <Image source={require('../../assets/Images/AddBack.png')}
                       style={[styles.CategoryLogo,{marginTop:2}]}/>
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
    _GetCat() {
        Connect.SendPRequest(URLS.Link() + "allfile", {})
            .then(res => {
                console.log('Categories: ')
                console.log(res)
                if (res) {
                    this.setState({Cat: res.files, Empty: false});
                } else {
                    this.setState({Empty: true});
                }
            });
    }

    //-------NavigateAdd------------------------------------------------------------------------------
    _NavigateAdd(route) {
        this.props.navigation.navigate(route)
    }
}


