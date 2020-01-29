import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    TextInput,
} from 'react-native';
import styles from "../../assets/css/AmlakList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import RenderAmlaks from "../Flatlist/RenderAmlaks";
import Header from "./Header";
import Icon from "react-native-vector-icons/AntDesign";


export default class AmlakList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            count: '',
            ProvinceID: '',
            Files: [],
            Empty: false,
            searchStr: '',
        };
        this._AllFiles = this._AllFiles.bind(this)
    }


    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let All = this.props.navigation.getParam('All');
                AsyncStorage.multiGet(['id', 'idpro', 'idcity']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                        ProvinceID: keys[1][1]
                    }, () => {
                        this._AllFiles(keys[0][1], All, keys[2][1]);
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
                <Header navigation={this.props.navigation} PageTitle={All === undefined ? 'همه املاک' : 'املاک من'}/>
                    <View style={[Styles.SearchBar, {}]}>
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
                            placeholder={'  جستجو'}
                            style={[Styles.SearchInput, {}]}
                        />
                </View>
                <TouchableOpacity style={[styles.AdvSearch, {display: All === undefined ? 'flex' : 'none'}]}
                                  onPress={() => this.props.navigation.navigate('AdvancedSearch', {id: this.state.ID})}>
                    <Text style={[styles.AdvSearchText, {}]}>جستجوی پیشرفته</Text>
                </TouchableOpacity>
                <FlatList
                    renderItem={(item, index) => <RenderAmlaks update={this._AllFiles}
                                                               IsMine={All}
                                                               userId={this.state.ID}
                                                               PageName={'file'}
                                                               item={item}
                                                               navigation={this.props.navigation}/>}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Files}

                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={() => <ListEmpty
                        EmptyText={this.state.Empty ? 'در حال دریافت اطلاعات...' : 'موردی وجود ندارد'}
                        BgColor={'transparent'}/>}/>
                <NavigationBar navigation={this.props.navigation} Nots={this.state.count}/>
                <DropdownAlert ref={ref => this.dropdown = ref}
                               closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    //---------------------Sliders --------------------------------------------------------------------------------------
    _AllFiles(ID, All, cityId) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "files", {
            provinceId: parseInt(this.state.ProvinceID),
            str: this.state.searchStr,
            cityId: parseInt(cityId),
            all: All === undefined ? 1 : parseInt(All),//all=1 is for all ads, and if it was 0 gets myAds
            userId: parseInt(ID),
            reqId: this.props.navigation.getParam('ReqID'),
            melkId: this.props.navigation.getParam('PropertyID'),
            maxMetrajh: this.props.navigation.getParam('maxArea'),
            minMetrajh: this.props.navigation.getParam('minArea'),
            minPrice: this.props.navigation.getParam('minPrice'),
            maxPrice: this.props.navigation.getParam('minPrice'),
            minYear: this.props.navigation.getParam('minConstructYear'),
            maxYear: this.props.navigation.getParam('maxConstructYear'),
            minVadieh: this.props.navigation.getParam('minDeposits'),
            maxVadieh: this.props.navigation.getParam('minDeposits'),
            minEjareh: this.props.navigation.getParam('minRent'),
            maxEjareh: this.props.navigation.getParam('maxRent'),
            room: this.props.navigation.getParam('RoomCount'),
        }).then(res => {
            console.log('file: ');
            console.log(res);
            if (res) {
                this.setState({
                    Files: res.files, Empty: false, Loading: false, count: res.count,
                });
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
                this._AllFiles(ID, All)
            })
        }
    }
}


