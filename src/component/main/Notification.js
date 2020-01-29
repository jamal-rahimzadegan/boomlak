import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
} from 'react-native';
import styles from "../../assets/css/Categories";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import ListEmpty from "./ListEmpty";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Octicons";


export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Notification: [],
        };
    }

    componentWillMount() {
        this._GetNotifactions();
        this.props.navigation.addListener("willFocus", payload => {
                AsyncStorage.getItem('id').then((id) => {
                    this._GetNotifactions(id)
                });
            }
        );
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'اعلانات'}/>
                <FlatList
                    renderItem={(item, index) => this._RenderNot(item)}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Notification}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={() => <ListEmpty
                        EmptyText={this.state.Empty ? 'در حال دریافت اطلاعات...' : 'موردی وجود ندارد'}
                        BgColor={'transparent'}/>}/>
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
    _GetNotifactions(id) {
        Connect.SendPRequest(URLS.Link() + "notification", {
            userId: parseInt(id)
        }).then(res => {
            this.setState({Empty: true});
            console.log('notification: ')
            console.log(res)
            if (res) {
                this.setState({Notification: res.data});
            }
        });
    }


    _RenderNot(item) {
        return (
            <View style={{elevation: 6, backgroundColor: '#eee', margin: 8, padding: 10, borderRadius: 2}}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
                    <Text style={styles.notTime}>{item.item.time} </Text>
                    <Icon name={'clock-o'} color={AppColorRed} size={16}/>
                </View>
                <Text style={styles.notBody}>{item.item.message}</Text>
            </View>
        )
    }
}


