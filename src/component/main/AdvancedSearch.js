import React from 'react';
import {
    View,
    TouchableOpacity,
    Text, ScrollView,
    AsyncStorage,
    TextInput, FlatList,
} from 'react-native';
import styles from "../../assets/css/AdvancedSearch";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import Picker from "react-native-picker";


export default class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            minPrice: '',
            maxPrice: '',
            minYear: '',
            maxYear: '',
            minArea: '',
            maxArea: '',
            minConstructYear: '',
            maxConstructYear: '',
            minDeposits: '',
            maxDeposits: '',
            minRent: '',
            maxRent: '',
            RoomCount: '',
            PropertyTypes: [],
            PropertyName: 'نوع ملک',
            PropertyID: '',
            ReqTypes: [],
            ReqName: 'نوع درخواست',
            ReqID: '',
            Filters: [],
            Values: [],
            Types: [],
        };
    }


    componentWillMount() {
        this._GetPropertyItem();
        this.props.navigation.addListener("willFocus", payload => {
                let All = this.props.navigation.getParam('All');
                AsyncStorage.multiGet(['id']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                    })
                })
            }
        );
    };

    render() {

        let {Values} = this.state;
        // console.warn(Values.includes('price'))
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'جستجوی پیشرفته املاک'}/>
                <TouchableOpacity style={styles.SearchBtn} onPress={() => this._AdvSearch()}>
                    <Text style={styles.SearchBtnText}>جستجو</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BtnContainer} onPress={() => this._PropertyType('P')}>
                    <Text style={styles.OverallText}>{this.state.PropertyName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BtnContainer}
                                  onPress={() => this._GetProType()}>
                    <Text style={styles.OverallText}>{this.state.ReqName}</Text>
                </TouchableOpacity>
                {/*------Filters Container-----------------------------------------------------------------*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    style={[styles.FilterContainer, {display: this.state.Filters.length === 0 ? 'flex' : 'flex'}]}>
                    <View style={styles.EachFilterContainer}>
                        <TextInput
                            value={this.state.minPrice}
                            onChangeText={(minPrice) => this.setState({minPrice})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   قیمت از'}
                            style={[styles.INPS, {display: Values.includes('price') ? 'flex' : 'none'}]}
                        />
                        <TextInput
                            value={this.state.maxPrice}
                            onChangeText={(maxPrice) => this.setState({maxPrice})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   قیمت تا'}
                            style={[styles.INPS, {display: Values.includes('price') ? 'flex' : 'none'}]}
                        />
                    </View>

                    <View style={styles.EachFilterContainer}>
                        <TextInput
                            value={this.state.minArea}
                            onChangeText={(minArea) => this.setState({minArea})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   حداقل متراژ'}
                            style={[styles.INPS, {display: Values.includes('metrajh') ? 'flex' : 'none'}]}
                        />
                        <TextInput
                            value={this.state.maxArea}
                            onChangeText={(maxArea) => this.setState({maxArea})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   حداکثر متراژ'}
                            style={[styles.INPS, {display: Values.includes('metrajh') ? 'flex' : 'none'}]}
                        />
                    </View>
                    <View style={styles.EachFilterContainer}>
                        <TextInput
                            value={this.state.minConstructYear}
                            onChangeText={(minConstructYear) => this.setState({minConstructYear})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   سال ساخت از'}
                            style={[styles.INPS, {display: Values.includes('year') ? 'flex' : 'none'}]}
                        />
                        <TextInput
                            value={this.state.maxConstructYear}
                            onChangeText={(maxConstructYear) => this.setState({maxConstructYear})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   سال ساخت تا'}
                            style={[styles.INPS, {display: Values.includes('year') ? 'flex' : 'none'}]}
                        />
                    </View>
                    <View style={styles.EachFilterContainer}>
                        <TextInput
                            value={this.state.minRent}
                            onChangeText={(minRent) => this.setState({minRent})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   اجاره از'}
                            style={[styles.INPS, {display: Values.includes('ejareh') ? 'flex' : 'none'}]}
                        />
                        <TextInput
                            value={this.state.maxRent}
                            onChangeText={(maxRent) => this.setState({maxRent})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   اجاره تا'}
                            style={[styles.INPS, {display: Values.includes('ejareh') ? 'flex' : 'none'}]}
                        />
                    </View>
                    <View style={styles.EachFilterContainer}>
                        <TextInput
                            value={this.state.minDeposits}
                            onChangeText={(minDeposits) => this.setState({minDeposits})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   ودیعه از'}
                            style={[styles.INPS, {display: Values.includes('vadieh') ? 'flex' : 'none'}]}
                        />
                        <TextInput
                            value={this.state.maxDeposits}
                            onChangeText={(maxDeposits) => this.setState({maxDeposits})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'   ودیعه تا'}
                            style={[styles.INPS, {display: Values.includes('vadieh') ? 'flex' : 'none'}]}
                        />
                    </View>
                    <TextInput
                        value={this.state.RoomCount}
                        onChangeText={(RoomCount) => this.setState({RoomCount})}
                        underlineColorAndroid={"transparent"}
                        keyboardType={"number-pad"}
                        placeholder={'   تعداد اتاق'}
                        style={[styles.INPS, {display: Values.includes('room') ? 'flex' : 'none'}]}
                    />
                </ScrollView>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    //---------------------Get Property item--------------------------------------------------------------------------------------
    _PropertyType(x) {
        let data = [];
        if (x === 'P') {
            for (let i = 0; i < this.state.PropertyTypes.length; i++) {
                data.push(this.state.PropertyTypes[i].name)
            }
        } else if (x === 'R') {
            for (let i = 0; i < this.state.ReqTypes.length; i++) {
                data.push(this.state.ReqTypes[i].name)
            }
        }
        Picker.init({
            pickerFontFamily: 'BYekan',
            pickerToolBarBg: PickerToolBarBg,
            pickerFontColor: PickerFontColor,
            pickerConfirmBtnColor: PickerConfirmBtnColor,
            pickerCancelBtnColor: PickerCancelBtnColor,
            pickerTitleColor: PickerTitleColor,
            pickerBg: PickerBg,
            pickerTextEllipsisLen: 20,
            pickerConfirmBtnText: 'تایید',
            pickerTitleText: '',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['فروش', 'اجاره'],
            pickerData: data.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let types = [];
                if (x === 'P') {
                    for (let i = 0; i < this.state.PropertyTypes.length; i++) {
                        types.push(this.state.PropertyTypes[i].name)
                    }
                    this.setState({
                        ReqName: 'نوع درخواست',
                        ReqID: '',
                        PropertyName: data.toString(),
                        PropertyID: this.state.PropertyTypes[types.indexOf(data.toString())].id
                    }, () => console.warn('PropertyID: ' + this.state.PropertyID));
                } else if (x === 'R') {
                    for (let i = 0; i < this.state.ReqTypes.length; i++) {
                        types.push(this.state.ReqTypes[i].name)
                    }
                    this.setState({
                        ReqName: data.toString(),
                        ReqID: this.state.ReqTypes[types.indexOf(data.toString())].id
                    }, () => this._GetFilters());
                }
            }
        });
        Picker.show();
    }

//---------------------_GetFilters------------------------------------------------------------------------------------
    _GetFilters() {
        Connect.SendPRequest(URLS.Link() + "getfilters", {
            melkId: parseInt(this.state.PropertyID),
            reqId: parseInt(this.state.ReqID)
        }).then(res => {
            console.log('Filters: ');
            console.log(res);
            if (res) {
                let values = [];
                let types = [];
                for (let i = 0; i < res.filters.length; i++) {
                    values.push(res.filters[i].value);
                    types.push(res.filters[i].type)
                }
                console.warn(values)
                this.setState({Filters: res.filters, Types: types, Values: values});
            }
        });
    }

    //-----------_GetPropertyItem--------------------------------------------------------------------------------------
    _GetPropertyItem() {
        Connect.SendPRequest(URLS.Link() + "amlakitem", {}).then(res => {
            console.log('amlak item: ');
            console.log(res);
            if (res) {
                this.setState({PropertyTypes: res.melk, ReqTypes: res.req});
            }
        });
    }

    //-----------Advanced Search--------------------------------------------------------------------------------------
    _AdvSearch() {
        this.props.navigation.navigate('AmlakList', {
            PropertyID: this.state.PropertyID,
            ReqID: this.state.ReqID,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minYear: this.state.minYear,
            maxYear: this.state.maxYear,
            minArea: this.state.minArea,
            maxArea: this.state.maxArea,
            minConstructYear: this.state.minConstructYear,
            maxConstructYear: this.state.maxConstructYear,
            minDeposits: this.state.minDeposits,
            maxDeposits: this.state.maxDeposits,
            minRent: this.state.minRent,
            maxRent: this.state.maxRent,
            RoomCount: this.state.RoomCount,
        })
    }

    _GetProType() {
        this.state.PropertyID !== '' ? this._PropertyType('R') : this.dropdown.alertWithType('warn', '', "ابتدا نوع ملک را انتخاب کنید.");

    }
}


