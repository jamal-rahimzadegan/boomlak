import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
} from 'react-native';
import styles from "../../assets/css/AdsList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RendeMainLists from "../Flatlist/RendeMainLists";
import Icon from "react-native-vector-icons/AntDesign";

export default class AdsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            provinceId: '',
            Ads: [],
            Empty: false,
            message: '',
            Loading: false,
            searchStr: '',
        };
        this._GetAds=this._GetAds.bind(this)
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let All = this.props.navigation.getParam('All');
                AsyncStorage.multiGet(['id', 'idpro','idcity']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                        ProvinceID: keys[1][1]
                    }, () => {
                        this._GetAds(keys[0][1], All,keys[2][1]);
                        this.forceUpdate()
                    })
                })

            }
        );
    }

    render() {
        let All = this.props.navigation.getParam('All');
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={All === undefined ? 'آگهی ها' : 'آگهی های من'}/>
                <View style={Styles.SearchBar}>
                    <TouchableOpacity onPress={() => this._Search(this.state.ID, All)}>
                        <Icon name={'search1'} color={AppColorRed}
                              style={{display: !this.state.Loading ? 'flex' : 'none'}}
                              size={30}/>
                        <ActivityIndicator color={AppColorRed} size={27}
                                           display={this.state.Loading ? 'flex' : 'none'}/>
                    </TouchableOpacity>
                    <TextInput
                        value={this.state.searchStr}
                        onChangeText={(searchStr) => this.setState({searchStr})}
                        underlineColorAndroid={"transparent"}
                        // keyboardType={"number-pad"}
                        // returnKeyType={"نام"}
                        placeholder={'جستجو'}
                        style={Styles.SearchInput}
                    />
                </View>
                <FlatList
                    renderItem={(item) => <RendeMainLists
                        item={item}
                        IsMine={All}
                        userId={this.state.ID}
                        update={this._GetAds}
                        PageName={'adver'}
                        navigation={this.props.navigation}
                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Ads}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={() => <ListEmpty
                        EmptyText={this.state.Empty ? 'در حال دریافت اطلاعات...' : 'موردی وجود ندارد'}
                        BgColor={'transparent'}/>}
                />
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


//---------------------Get ads -----------------------------------------------------------------------------------------
    _GetAds(ID, All,cityId) {
        this.setState({Empty: true});
        // console.log('str: '+this.state.searchStr)
        Connect.SendPRequest(URLS.Link() + "advertisess", {
            all: All === undefined ? 1 : parseInt(All),//all=1 is for all ads, and if it was 0 gets myAds
            provinceId: parseInt(this.state.ProvinceID),
            userId: parseInt(ID),
            str: this.state.searchStr,
            cityId:parseInt(cityId)
        }).then(res => {
            console.log('alladvertise: ');
            console.log(res);
            if (res) {
                this.setState({Ads: res.adver, Empty: false, Loading: false});
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }

    //---------------------ُSearch--------------------------------------------------------------------------------------
    _Search(ID, All) {
        if (this.state.searchStr === '') {
            this.dropdown.alertWithType('warn', '', "لطفا موردی را برای جستجو وارد کنید");
        } else {
            this.setState({Loading: true}, () => {
                this._GetAds(ID, All)
            })
        }
    }
}




