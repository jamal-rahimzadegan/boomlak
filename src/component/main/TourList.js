import React from 'react';
import {
    FlatList,
    View,
    Dimensions, AsyncStorage, TouchableOpacity, ActivityIndicator, TextInput,
} from 'react-native';
import styles from "../../assets/css/TourList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RendeMainLists from "../Flatlist/RendeMainLists";
import Icon from "react-native-vector-icons/AntDesign";


export default class TourList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            ProvinceID: '',
            alltourism: [],
            Empty: false,
            message: '',
            Loading: false,
            searchStr: '',

        };
        this._GetAllTourism=this._GetAllTourism.bind(this)
    }

    componentWillMount() {
        let All = this.props.navigation.getParam('All');
        this.props.navigation.addListener("willFocus", payload => {
                AsyncStorage.multiGet(['id', 'idpro','idcity']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                        ProvinceID: keys[1][1]
                    }, () => {
                        this._GetAllTourism(keys[0][1], All,keys[2][1]);
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
                <Header navigation={this.props.navigation} PageTitle={All === undefined ? 'گردشگری ها' : 'گردشگری های من'}/>
                <View style={Styles.SearchBar}>
                    <TouchableOpacity onPress={() => this._Search(this.state.ID, All)}
                    >
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
                        PageName={'tourism'}
                        navigation={this.props.navigation}
                        userId={this.state.ID}
                        update={this._GetAllTourism}
                    />
                    }
                    showsVerticalScrollIndicator={false}
                    data={this.state.alltourism}
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

//---------------------Get tourism --------------------------------------------------------------------------------------
    _GetAllTourism(ID, All,cityId) {
        // console.warn('File ID: ' + ID)
        // console.warn('isMineTourism: '+IsMine)
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "tourismes", {
            provinceId: parseInt(this.state.ProvinceID),
            all: All === undefined ? 1 : parseInt(All),//all=1 is for all ads, and if it was 0 gets myAds
            userId: parseInt(ID),
            str: this.state.searchStr,
            cityId:parseInt(cityId)
        }).then(res => {
            console.log('alltourism: ');
            console.log(res);
            if (res) {
                this.setState({alltourism: res.tour, Empty: false, Loading: false});
            } else {
                this.setState({Empty: true, Loading: true});
            }
        });
    }

//---------------------ُSearch--------------------------------------------------------------------------------------
    _Search(ID, All) {
        if (this.state.searchStr === '') {
            this.dropdown.alertWithType('warn', '', "لطفا موردی را برای جستجو وارد کنید");
        } else {
            this.setState({Loading: true}, () => {
                this._GetAllTourism(ID, All)
            })
        }
    }
}




