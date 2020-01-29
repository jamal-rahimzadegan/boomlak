import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text, Image, Dimensions, AsyncStorage, Alert, TextInput, ScrollView,
} from 'react-native';
import styles from "../../assets/css/TourList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";

import Header from "./Header";
import Separator from "./Separator";
import RendeMainLists from "../Flatlist/RendeMainLists";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;


export default class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Fav: [],
            Empty: false,
            message: '',
            Loading: false,
        };
        this._GetFav=this._GetFav.bind(this)
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                AsyncStorage.getItem('id').then((id) => {
                    this.setState({ID: id});
                    this._GetFav(id);
                })
            }
        );
    }

    render() {
        let All = this.props.navigation.getParam('All');
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'علاقه مندی های من'}/>
                <FlatList
                    renderItem={(item) => <RendeMainLists
                        item={item}
                        IsMine={All}
                        update={this._GetFav}
                        PageName={'fav'}
                        navigation={this.props.navigation}
                    />}
                    data={this.state.Fav}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index, item) => index.toString()}
                    ListEmptyComponent={() => <ListEmpty
                        EmptyText={this.state.Empty ? 'در حال دریافت اطلاعات...' : 'موردی وجود ندارد'}
                        BgColor={'transparent'}/>}
                />
                    <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


//---------------------Get Fav --------------------------------------------------------------------------------------
    _GetFav(ID) {
        // console.warn('File ID: '+ID)
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "myfavourite", {userId: parseInt(ID)})
            .then(res => {
                console.log('myfavourite: ');
                console.log(res.adver.concat(res.file));
                if (res) {
                    this.setState({Fav: res.adver.concat(res.file), Empty: false,});
                    // this.setState({Fav: res, Empty: false,});
                } else {
                    this.setState({Empty: true});
                }
            });
    }
}




