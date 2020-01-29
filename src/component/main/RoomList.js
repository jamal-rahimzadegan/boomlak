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
import styles from "../../assets/css/RoomList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {
    AppColorGrey, AppColorRed,
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import {
    Connect
} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RendeMainLists from "../Flatlist/RendeMainLists";
import Icon from "react-native-vector-icons/AntDesign";
import Picker from "react-native-picker";
import Separator from "./Separator";

export default class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            ProvinceID: '',
            Rooms: [],
            Empty: false,
            message: '',
            Loading: false,
            searchStr: '',
            PropertyName: 'همه موارد',
            PropertyID: '',
            Capacity: '',
            MaxPrice: '',
            MinPrice: '',
            currentTime: '',
            ResItems: [],
        };
        this._GetRooms=this._GetRooms.bind(this)
    }

    componentWillMount() {
        this._GetResItems();
        this.props.navigation.addListener("willFocus", payload => {
                let All = this.props.navigation.getParam('All');
                AsyncStorage.multiGet(['id', 'idpro', 'idcity']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                        ProvinceID: keys[1][1]
                    }, () => {
                        this._GetRooms(keys[0][1], All, keys[2][1]);
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
                <Header navigation={this.props.navigation}
                        PageTitle={All === undefined ? 'همه اتاق ها' : 'اتاق های من'}/>
                <View style={Styles.SearchBar}>
                    {/*------Search Bar----------------------------------------*/}
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
                        placeholder={'جستجو'}
                        style={Styles.SearchInput}
                    />
                </View>
                <View style={styles.SearchFlterContainer}>
                    <TouchableOpacity style={[Styles.SearchInput2, {height: 50}]}
                                      onPress={() => this._SelectResItem()}>
                        <Text
                            style={[styles.ListText, {}]}>نوع
                            رزرو: {this.state.PropertyName}</Text>
                    </TouchableOpacity>
                    <TextInput
                        value={this.state.Capacity}
                        onChangeText={(Capacity) => this.setState({Capacity})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'ظرفیت'}
                        style={Styles.SearchInput2}
                    />
                </View>
                <View style={styles.SearchFlterContainer}>
                    <TextInput
                        value={this.state.MinPrice}
                        onChangeText={(MinPrice) => this.setState({MinPrice})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'قیمت از '}
                        style={Styles.SearchInput2}
                    />
                    <TextInput
                        value={this.state.MaxPrice}
                        onChangeText={(MaxPrice) => this.setState({MaxPrice})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'قیمت تا'}
                        style={[Styles.SearchInput2, {marginVertical: 10}]}
                    />
                </View>
                <Separator/>
                {/*----------------------------------------------------------------------------------------------*/}
                <FlatList
                    renderItem={(item) => <RendeMainLists
                        item={item}
                        IsMine={All}
                        userId={this.state.ID}
                        PageName={'room'}
                        update={this._GetRooms}
                        navigation={this.props.navigation}
                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Rooms}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={<ListEmpty
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

//---------------------Get ads --------------------------------------------------------------------------------------
    _GetRooms(ID, All, cityId) {
        this.forceUpdate();
        let {
            PropertyID,
            MinPrice,
            MaxPrice,
            Capacity,
            searchStr
        } = this.state;
        // console.warn('PropertyID: ' + PropertyID +
        //     'MinPrice: ' + MinPrice +
        //     'MaxPrice: ' + MaxPrice +
        //     'Capacity: ' + Capacity);
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "rooms", {
            cityId: parseInt(cityId),
            provinceId: parseInt(this.state.ProvinceID),
            userId: parseInt(ID),
            str: searchStr,
            melkId: PropertyID,
            minPrice: MinPrice,
            maxPrice: MaxPrice,
            zarfiat: Capacity,
            all: All === undefined ? 1 : parseInt(All),//all=1 is for all rooms, and if it was 0 gets my rooms
        }).then(res => {
            console.log('rooms list: ');
            console.log(res);
            if (res) {
                this.setState({Rooms: res.result, Empty: false, Loading: false}, () => console.warn(this.state.Rooms));
            } else {
                this.setState({Empty: true, Loading: false}, () => this.forceUpdate());
            }
        });
    }

    //---------------------Select resItem -----------------------------------------------------------------------------------------
    _SelectResItem() {
        let data = [];
        for (let i = 0; i < this.state.ResItems.length; i++) {
            data.push(this.state.ResItems[i].name)
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerFontColor: PickerFontColor,
            pickerToolBarBg: PickerToolBarBg,
            pickerConfirmBtnColor: PickerConfirmBtnColor,
            pickerCancelBtnColor: PickerCancelBtnColor,
            pickerTitleColor: PickerTitleColor,
            pickerBg: PickerBg,
            pickerTextEllipsisLen: 20,
            pickerConfirmBtnText: 'تایید',
            pickerTitleText: '',
            pickerCancelBtnText: 'انصراف',
            onPickerCancel: () => this.setState({PropertyName: 'همه موارد', PropertyID: ''}),
            // pickerData: ['لبب','بیسل'],
            pickerData: this.state.ResItems.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let PropertIDs = [];
                for (let i = 0; i < this.state.ResItems.length; i++) {
                    PropertIDs.push(this.state.ResItems[i].name)
                }
                this.setState({
                    PropertyName: data.toString(),
                    PropertyID: this.state.ResItems[PropertIDs.indexOf(data.toString())].id
                });
            }
        });


        Picker.show();
    }

    //---------------------ُSearch--------------------------------------------------------------------------------------
    _Search(ID, All) {
        this.setState({
            Loading: true,
        }, () => {
            this._GetRooms(ID, All)
        })
    }

    //---------------------Get ads --------------------------------------------------------------------------------------
    _GetResItems() {
        Connect.SendPRequest(URLS.Link() + "resitem", {})
            .then(res => {
                console.log('res item: ');
                console.log(res);
                if (res) {
                    this.setState({ResItems: res.result});
                }
            });
    }
}




