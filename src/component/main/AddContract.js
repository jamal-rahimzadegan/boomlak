import React from 'react';
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    TextInput,
    ScrollView,
} from 'react-native';

import styles from "../../assets/css/AddFile";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {
    AppColorRed,
    PickerBg,
    PickerCancelBtnColor,
    PickerConfirmBtnColor,
    PickerFontColor,
    PickerTitleColor, PickerToolBarBg
} from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import {
    Connect,
    ImagePickerOptions
} from "../../core/Connect";
import URLS from "../../core/URLS";
import Picker from "react-native-picker";
import RadioForm from "react-native-simple-radio-button";

let radioValue = [
    {label: 'خیر', value: 0},
    {label: 'بله', value: 1},

];


export default class AddContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            ContractID: '',
            contract: [],
            //---Buyer---------------
            valueDBuyer: 0,
            valueSignBuyer: 0,
            BuyerName: '',
            BuyerFather: '',
            BuyerCIDN: '',//شماره شناسنامه
            BuyerNIDN: '',//شماره شناسنامه
            BuyerFinalAccept: '',
            BuyerAddress: '',
            BuyerBdate: 'تاریخ تولد',
            BuyerPhone: '',
            BuyerIssued: '',
            //-----Seller------------------
            valueDSeller: 0,
            valueSignSeller: 0,
            SellerName: '',
            SellerFather: '',
            SellerCIDN: '',//شماره شناسنامه
            SellerNIDN: '',//شماره شناسنامه
            SellerFinalAccept: '',
            SellerAddress: '',
            SellerBdate: 'تاریخ تولد',
            SellerPhone: '',
            SellerIssued: '',
            //----Transaction------------------
            serial: '',
            pardakhtMablagh: '',
            naghd: '',
            check: '',
            checkNumber: '',
            checkBank: '',
            checkShobeh: '',
            aghsat: '',
            tarikhSanad: 'تاریخ ثبت سند',
            name: '',
            faree: '',
            asli: '',
            bakhsh: '',
            hozesabti: '',
            masaht: '',
            safeh: '',
            daftar: '',
            dangpa: '',
            shomarehpa: '',
            fareepa: '',
            dangan: '',
            shomarehan: '',
            fareean: '',
            sandrahnishom: '',
            daftarsanadrasmi: '',
            rahnbank: '',
            daierphone: '',
            beneshani: '',
            price1: '',
            price2: '',
            price3: '',
            price4: '',
            price5: '',
            daftarkhanehShomare: '',
            daftarkhanehAddress: '',
            taozihat: '',
            tarikhtaslim: '',
            tarikhgharadad: '',
            dang: '',
            shomarehPelaksabti: '',

        };
        this.ShowForm = "none";
        this.ShowCommision = "none";
        this.ShowMessage = "none";
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
            // AsyncStorage.removeItem('contractrules');
            let from = this.props.navigation.getParam('from');
            // console.warn('user: ' + from)
            if (from === 'Seller') {
                this._ContractSellerStatus();
            } else if (from === 'Buyer') {
                this._ContractBuyerStatus();
            }
            AsyncStorage.multiGet(['id', 'contractrules']).then((keys) => {
                if (keys[1][1] !== '1') {
                    this.props.navigation.navigate('ContractRules', {RoutTo: 'ContractRules'})
                }
            });
        })
    }

    render() {
        // console.warn('FileID: ' + this.props.navigation.getParam('FileID'));
        // console.warn('TypeReq: ' + this.props.navigation.getParam('TypeReq'));
        // console.warn('userId: ' + this.props.navigation.getParam('userId'));
        let FileId = this.props.navigation.getParam('FileID');
        let userId = this.props.navigation.getParam('userId');
        let commission = this.props.navigation.getParam('commission');
        let TypeReq = this.props.navigation.getParam('TypeReq');
        let from = this.props.navigation.getParam('from');
        let Data = this.state.contract;
        //------Check for showing Message---------------------------------------------------
        this._Messages(Data, from);
        this._Form(Data, from);
        this._Commision(Data, from);
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'ایجاد قولنامه خرید و فروش'}/>
                <ScrollView style={{flex: 1}}
                            showsVerticalScrollIndicator={false}>
                    {/*-----------------Message------------------------*/}
                    <Text style={[styles.TitleText, {
                        textAlign: 'center',
                        display: this.ShowMessage
                    }]}>{this.state.contract.message}</Text>
                    <View style={styles.AddTourContainer}>
                        {/*------pay commission btn---------------------------------------------------------------------*/}
                        <TouchableOpacity
                            style={[styles.AddBtn, {display: this.ShowCommision}]}
                            // style={[styles.AddBtn, {display: this.state.contract.hasbuy && this.state.contract.hascon === false && this.state.contract.pay == false ? 'flex' : 'none'}]}
                            onPress={() => this._PayCommision(FileId, userId)}>
                            <Text style={[styles.TitleText, {
                                color: '#fff',
                                display: !this.state.Loading ? 'flex' : 'none'
                            }]}>پرداخت مبلغ 25000 هزار تومان بابت کمیسیون</Text>
                            <ActivityIndicator size={30} color={'#fff'}
                                               style={{display: !this.state.Loading ? 'none' : 'flex'}}/>
                        </TouchableOpacity>

                        <View
                            style={[styles.AddTourContainer, {display: this.ShowForm}]}>
                            {/*---------Buery Details-----------------------------------------------------------------------------------*/}
                            <View
                                pointerEvents={from === 'Buyer' ? 'auto' : 'auto'}
                                  style={{
                                // backgroundColor: from === 'Buyer' ? '#fff' : '#eee',
                                padding: 5,
                                borderRadius: 4
                            }}>
                                <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات مشتری</Text>
                                <Text style={styles.TitleText}>نام و نام خانوادگی:</Text>
                                <TextInput
                                    value={this.state.BuyerName}
                                    onChangeText={(BuyerName) => this.setState({BuyerName})}
                                    underlineColorAndroid={"transparent"}
                                    placeholder={'نام و نام خانوادگی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>نام پدر:</Text>
                                <TextInput
                                    value={this.state.BuyerFather}
                                    onChangeText={(BuyerFather) => this.setState({BuyerFather})}
                                    underlineColorAndroid={"transparent"}
                                    placeholder={'نام پدر'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره شناسنامه:</Text>
                                <TextInput
                                    value={this.state.BuyerCIDN}
                                    onChangeText={(BuyerCIDN) => this.setState({BuyerCIDN})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'شماره شناسنامه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />


                                <Text style={styles.TitleText}>کدملی:</Text>
                                <TextInput
                                    value={this.state.BuyerNIDN}
                                    onChangeText={(BuyerNIDN) => this.setState({BuyerNIDN})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'کدملی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>تلفن:</Text>
                                <TextInput
                                    value={this.state.BuyerPhone}
                                    onChangeText={(BuyerPhone) => this.setState({BuyerPhone})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'تلفن'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />

                                <Text style={styles.TitleText}>صادره از:</Text>
                                <TextInput
                                    value={this.state.BuyerIssued}
                                    onChangeText={(BuyerIssued) => this.setState({BuyerIssued})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'صادره از'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />
                                <Text style={styles.TitleText}>تاریخ تولد:</Text>
                                <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._BdateSelcet('B')}>
                                    <Text
                                        style={styles.TitleText}>{this.state.BuyerBdate}</Text>
                                </TouchableOpacity>

                                <Text style={styles.TitleText}>آدرس:</Text>
                                <TextInput
                                    value={this.state.BuyerAddress}
                                    onChangeText={(BuyerAddress) => this.setState({BuyerAddress})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'آدرس'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />
                                <Text style={styles.TitleText}>تایید مدارک:</Text>
                                <RadioForm
                                    style={styles.RadioContainer}
                                    buttonColor={'#333'}
                                    labelStyle={styles.RadioLabel}
                                    selectedButtonColor={AppColorRed}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    radio_props={radioValue}
                                    initial={0}
                                    onPress={(value) => {
                                        this.setState({valueDBuyer: value})
                                    }}
                                />
                                <Text style={styles.TitleText}>تایید(امضا مشتری)
                                    :</Text>
                                <RadioForm
                                    style={styles.RadioContainer}
                                    buttonColor={'#333'}
                                    labelStyle={styles.RadioLabel}
                                    selectedButtonColor={AppColorRed}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    radio_props={radioValue}
                                    initial={0}
                                    onPress={(value) => {
                                        this.setState({valueSignBuyer: value})
                                    }}
                                />
                            </View>
                            {/*---------ُSeller Details-----------------------------------------------------------------------------------*/}
                            <View
                                pointerEvents={from === 'Seller' ? 'auto' : 'none'}
                                style={{
                                // backgroundColor: from === 'Seller' ? '#fff' : '#eee',
                                padding: 5,
                                borderRadius: 4
                            }}>
                                <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات فروشنده</Text>
                                <Text style={styles.TitleText}>نام و نام خانوادگی:</Text>
                                <TextInput
                                    value={this.state.SellerName}
                                    onChangeText={(SellerName) => this.setState({SellerName})}
                                    underlineColorAndroid={"transparent"}
                                    placeholder={'نام و نام خانوادگی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>نام پدر:</Text>
                                <TextInput
                                    value={this.state.SellerFather}
                                    onChangeText={(SellerFather) => this.setState({SellerFather})}
                                    underlineColorAndroid={"transparent"}
                                    placeholder={'نام پدر'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره شناسنامه:</Text>
                                <TextInput
                                    value={this.state.SellerCIDN}
                                    onChangeText={(SellerCIDN) => this.setState({SellerCIDN})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'شماره شناسنامه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>کدملی:</Text>
                                <TextInput
                                    value={this.state.SellerNIDN}
                                    onChangeText={(SellerNIDN) => this.setState({SellerNIDN})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'کدملی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>تلفن:</Text>
                                <TextInput
                                    value={this.state.SellerPhone}
                                    onChangeText={(SellerPhone) => this.setState({SellerPhone})}
                                    underlineColorAndroid={"transparent"}
                                    keyboardType={"number-pad"}
                                    placeholder={'تلفن'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />

                                <Text style={styles.TitleText}>صادره از:</Text>
                                <TextInput
                                    value={this.state.SellerIssued}
                                    onChangeText={(SellerIssued) => this.setState({SellerIssued})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'صادره از'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />
                                <Text style={styles.TitleText}>تاریخ تولد:</Text>
                                <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._BdateSelcet('S')}>
                                    <Text
                                        style={styles.TitleText}>{this.state.SellerBdate}</Text>
                                </TouchableOpacity>
                                <Text style={styles.TitleText}>آدرس:</Text>
                                <TextInput
                                    value={this.state.SellerAddress}
                                    onChangeText={(SellerAddress) => this.setState({SellerAddress})}
                                    underlineColorAndroid={"transparent"}
                                    placeholder={'آدرس'}
                                    style={[styles.SelectProBtn, {
                                        color: '#333',
                                        fontFamily: 'BYekan',
                                        marginBottom: 10
                                    }]}
                                />
                                <Text style={styles.TitleText}>تایید مدارک:</Text>
                                <RadioForm
                                    style={styles.RadioContainer}
                                    buttonColor={'#333'}
                                    labelStyle={styles.RadioLabel}
                                    selectedButtonColor={AppColorRed}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    radio_props={radioValue}
                                    initial={0}
                                    onPress={(value) => {
                                        this.setState({valueDSeller: value})
                                    }}
                                />
                                <Text style={styles.TitleText}>تایید(امضا فروشنده)
                                    :</Text>
                                <RadioForm
                                    style={styles.RadioContainer}
                                    buttonColor={'#333'}
                                    labelStyle={styles.RadioLabel}
                                    selectedButtonColor={AppColorRed}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    radio_props={radioValue}
                                    onPress={(value) => {
                                        this.setState({valueSignSeller: value})
                                    }}
                                />

                                {/*-------Transaction information--------------------------------------------------*/}
                                <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات مورد معامله</Text>
                                <Text style={styles.TitleText}>نام:</Text>
                                <TextInput
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({name})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'نام'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />


                                {/*-----------------------------------------------------------------------------------*/}
                                <Text style={styles.TitleText}>سریال سند:</Text>
                                <TextInput
                                    value={this.state.serial}
                                    onChangeText={(serial) => this.setState({serial})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'سریال سند'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />

                                <Text style={styles.TitleText}>نقدی:</Text>
                                <TextInput
                                    value={this.state.naghd}
                                    onChangeText={(naghd) => this.setState({naghd})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    multiline={true}
                                    placeholder={'نقدی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>چک:</Text>
                                <TextInput
                                    value={this.state.check}
                                    onChangeText={(check) => this.setState({check})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    multiline={true}
                                    placeholder={'چک'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره چک:</Text>
                                <TextInput
                                    value={this.state.checkNumber}
                                    onChangeText={(checkNumber) => this.setState({checkNumber})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    multiline={true}
                                    placeholder={'شماره چک'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>بانک:</Text>
                                <TextInput
                                    value={this.state.checkBank}
                                    onChangeText={(checkBank) => this.setState({checkBank})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'بانک'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شعبه:</Text>
                                <TextInput
                                    value={this.state.checkShobeh}
                                    onChangeText={(checkShobeh) => this.setState({checkShobeh})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شعبه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>اقساط:</Text>
                                <TextInput
                                    value={this.state.aghsat}
                                    onChangeText={(aghsat) => this.setState({aghsat})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'اقساط'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>فرعی:</Text>
                                <TextInput
                                    value={this.state.faree}
                                    onChangeText={(faree) => this.setState({faree})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'فرعی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>اصلی:</Text>
                                <TextInput
                                    value={this.state.asli}
                                    onChangeText={(asli) => this.setState({asli})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'اصلی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>بخش:</Text>
                                <TextInput
                                    value={this.state.bakhsh}
                                    onChangeText={(bakhsh) => this.setState({bakhsh})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'بخش'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>حوزه ثبتی:</Text>
                                <TextInput
                                    value={this.state.hozesabti}
                                    onChangeText={(hozesabti) => this.setState({hozesabti})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'حوزه ثبتی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مساحت:</Text>
                                <TextInput
                                    value={this.state.masaht}
                                    onChangeText={(masaht) => this.setState({masaht})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مساحت '}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>صفحه:</Text>
                                <TextInput
                                    value={this.state.safeh}
                                    onChangeText={(safeh) => this.setState({safeh})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'صفحه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>دفتر:</Text>
                                <TextInput
                                    value={this.state.daftar}
                                    onChangeText={(daftar) => this.setState({daftar})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'دفتر'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>دانگ(پارکینگ):</Text>
                                <TextInput
                                    value={this.state.dangpa}
                                    onChangeText={(dangpa) => this.setState({dangpa})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'دانگ(پارکینگ)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />

                                <Text style={styles.TitleText}>شماره(پارکینگ):</Text>
                                <TextInput
                                    value={this.state.shomarehpa}
                                    onChangeText={(shomarehpa) => this.setState({shomarehpa})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شماره(پارکینگ)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>فرعی(پارکینگ):</Text>
                                <TextInput
                                    value={this.state.fareepa}
                                    onChangeText={(fareepa) => this.setState({fareepa})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'فرعی(پارکینگ)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>دانگ(انباری):</Text>
                                <TextInput
                                    value={this.state.dangan}
                                    onChangeText={(dangan) => this.setState({dangan})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'دانگ(انباری)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره(انباری):</Text>
                                <TextInput
                                    value={this.state.shomarehan}
                                    onChangeText={(shomarehan) => this.setState({shomarehan})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شماره(انباری)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>فرعی(انباری):</Text>
                                <TextInput
                                    value={this.state.fareean}
                                    onChangeText={(fareean) => this.setState({fareean})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'فرعی(انباری)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره سند رهنی:</Text>
                                <TextInput
                                    value={this.state.sandrahnishom}
                                    onChangeText={(sandrahnishom) => this.setState({sandrahnishom})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شماره سند رهنی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>دفتر اسناد رسمی:</Text>
                                <TextInput
                                    value={this.state.daftarsanadrasmi}
                                    onChangeText={(daftarsanadrasmi) => this.setState({daftarsanadrasmi})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'دفتر اسناد رسمی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مورد رهن بانک:</Text>
                                <TextInput
                                    value={this.state.rahnbank}
                                    onChangeText={(rahnbank) => this.setState({rahnbank})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مورد رهن بانک'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>تلفن دایر/غیردایر:</Text>
                                <TextInput
                                    value={this.state.daierphone}
                                    onChangeText={(daierphone) => this.setState({daierphone})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'تلفن دایر/غیردایر'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>به نشانی:</Text>
                                <TextInput
                                    value={this.state.beneshani}
                                    onChangeText={(beneshani) => this.setState({beneshani})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'به نشانی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مبلغ خریدار:</Text>
                                <TextInput
                                    value={this.state.price1}
                                    onChangeText={(price1) => this.setState({price1})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مبلغ خریدار'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مبلغ چک:</Text>
                                <TextInput
                                    value={this.state.price2}
                                    onChangeText={(price2) => this.setState({price2})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مبلغ چک'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مبلغ(مابقی ثمن معامله):</Text>
                                <TextInput
                                    value={this.state.price3}
                                    onChangeText={(price3) => this.setState({price3})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مبلغ(مابقی ثمن معامله)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مبلغ(قابل پرداخت هنگام تنظیم سند):</Text>
                                <TextInput
                                    value={this.state.price4}
                                    onChangeText={(price4) => this.setState({price4})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مبلغ(قابل پرداخت هنگام تنظیم سند)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>مبلغ فسخ:</Text>
                                <TextInput
                                    value={this.state.price5}
                                    onChangeText={(price5) => this.setState({price5})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'مبلغ فسخ'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره دفترخانه:</Text>
                                <TextInput
                                    value={this.state.daftarkhanehShomare}
                                    onChangeText={(daftarkhanehShomare) => this.setState({daftarkhanehShomare})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شماره دفترخانه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>آدرس دفترخانه:</Text>
                                <TextInput
                                    value={this.state.daftarkhanehAddress}
                                    onChangeText={(daftarkhanehAddress) => this.setState({daftarkhanehAddress})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'آدرس دفترخانه'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>توضیحات:</Text>
                                <TextInput
                                    value={this.state.taozihat}
                                    onChangeText={(taozihat) => this.setState({taozihat})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'توضیحات'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>تاریخ تسلیم سند:</Text>
                                <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._BdateSelcet('SDD')}>
                                    <Text
                                        style={styles.TitleText}>{this.state.tarikhtaslim}</Text>
                                </TouchableOpacity>
                                <Text style={styles.TitleText}>تاریخ عقد قرارداد:</Text>
                                <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._BdateSelcet('CD')}>
                                    <Text
                                        style={styles.TitleText}>{this.state.tarikhgharadad}</Text>
                                </TouchableOpacity>
                                <Text style={styles.TitleText}>دانگ(ملک):</Text>
                                <TextInput
                                    value={this.state.dang}
                                    onChangeText={(dang) => this.setState({dang})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'دانگ(ملک)'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                                <Text style={styles.TitleText}>شماره پلاک ثبتی:</Text>
                                <TextInput
                                    value={this.state.shomarehPelaksabti}
                                    onChangeText={(shomarehPelaksabti) => this.setState({shomarehPelaksabti})}
                                    underlineColorAndroid={"transparent"}
                                    // keyboardType={"number-pad"}
                                    placeholder={'شماره پلاک ثبتی'}
                                    style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                                />
                            </View>
                            <TouchableOpacity style={[styles.AddBtn, {}]}
                                              onPress={() => this._AddTransContract(this.state.ID)}>
                                <Text
                                    style={[styles.TitleText, {
                                        color: '#fff',
                                        display: !this.state.Loading ? 'flex' : 'none'
                                    }]}>ثبت</Text>
                                <ActivityIndicator size={30} color={'#fff'}
                                                   display={this.state.Loading ? 'flex' : 'none'}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


    //----------Add Contract for selling----------------------------------------------------------------------------------------------------------
    _AddTransContract() {
        this.setState({Loading: true});
        // console.warn('valueSignBuyer: '+this.state.valueSignBuyer)
        // console.warn('valueSignSeller: '+this.state.valueSignSeller)
        // console.warn('valueDSeller: '+this.state.valueDSeller)
        // console.warn('valueDBuyer: '+this.state.valueDBuyer)
        let from = this.props.navigation.getParam('from');
        let userId = this.props.navigation.getParam('userId');
        if (from === 'Seller') {
            Connect.SendPRequest(URLS.Link() + "addcontract", {
                userId: parseInt(userId),
                fileId: parseInt(this.props.navigation.getParam('FileID')),
                fullnameSell: this.state.BuyerName,
                fatherSell: this.state.SellerFather,
                bdateSell: this.state.SellerBdate,
                identitySell: this.state.SellerCIDN,
                NIDNSell: this.state.SellerNIDN,
                addressSell: this.state.SellerAddress,
                saderehSell: this.state.SellerIssued,
                phoneSell: this.state.SellerPhone,
                addressBuy: this.state.BuyerAddress,
                serial: this.state.serial,
                pardakhtMablagh: this.state.pardakhtMablagh,
                naghd: this.state.naghd,
                check: this.state.check,
                checkNumber: this.state.checkNumber,
                checkBank: this.state.checkBank,
                checkShobeh: this.state.checkShobeh,
                aghsat: this.state.aghsat,
                confirmSell: this.state.valueSignSeller.toString(),
                name: this.state.name,
                faree: this.state.faree,
                asli: this.state.asli,
                bakhsh: this.state.bakhsh,
                hozesabti: this.state.hozesabti,
                masaht: this.state.masaht,
                safeh: this.state.safeh,
                daftar: this.state.daftar,
                dangpa: this.state.dangpa,
                shomarehpa: this.state.shomarehpa,
                fareepa: this.state.fareepa,
                dangan: this.state.dangan,
                fareean: this.state.fareean,
                shomarehan: this.state.shomarehan,
                sandrahnishom: this.state.sandrahnishom,
                daftarsanadrasmi: this.state.daftarsanadrasmi,
                rahnbank: this.state.rahnbank,
                daierphone: this.state.daierphone,
                beneshani: this.state.beneshani,
                price1: this.state.price1,
                price2: this.state.price2,
                price3: this.state.price3,
                price4: this.state.price4,
                price5: this.state.price5,
                daftarkhanehShomare: this.state.daftarkhanehShomare,
                daftarkhanehAddress: this.state.daftarkhanehAddress,
                taozihat: this.state.taozihat,
                tarikhtaslim: this.state.tarikhtaslim,
                tarikhgharadad: this.state.tarikhgharadad,
                dang: this.state.dang,
                shomarehPelaksabti: this.state.shomarehPelaksabti,
            }).then(res => {
                this.setState({Loading: false})
                if (res.result) {
                    this._ContractSellerStatus()
                    console.warn('Create Contract: ');
                    console.warn(res);
                    this.dropdown.alertWithType('success', '', "قرارداد با موفقیت ثبت شد");
                    this.props.navigation.goBack()
                    // this.setState({propertyTypes: res});
                } else {
                    this.dropdown.alertWithType('error', '', "قرارداد  ثبت نشد، لطفا دوباره تلاش نمایید");

                }
            });
        } else if (from === 'Buyer') {
            Connect.SendPRequest(URLS.Link() + "contractbuy", {
                fileId: parseInt(this.props.navigation.getParam('FileID')),
                id: parseInt(this.state.ContractID),
                fullnameBuy: this.state.BuyerName,
                fatherBuy: this.state.BuyerFather,
                NIDNBuy: this.state.BuyerNIDN,
                identityBuy: this.state.BuyerCIDN,
                bdateBuy: this.state.BuyerBdate,
                addressBuy: this.state.BuyerAddress,
                phoneBuy: this.state.BuyerPhone,
                saderehBuy: this.state.BuyerIssued,
                cinfirmBuy: this.state.valueSignBuyer.toString(),
            }).then(res => {
                this.setState({Loading: false});
                console.warn('Create trans Contract: ');
                console.warn(res);
                if (res.result) {
                    this._ContractBuyerStatus();
                    this.dropdown.alertWithType('success', '', res.message);
                    // this.setState({propertyTypes: res});
                } else {
                    this.dropdown.alertWithType('error', '', res.message);
                }
            });
        }
    }

    _BdateSelcet(x) {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1400; i > 1310; i--) {
            data[0].push(i)
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
            // pickerData: ['لبب','بیسل'],
            pickerData: data,
            onPickerConfirm: date => {
                console.warn(date.toString());
                if (x === 'S') {
                    this.setState({
                        SellerBdate: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                    // alert('فروشنده')
                } else if (x === 'B') {
                    this.setState({
                        BuyerBdate: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                    // alert('خریدار')
                } else if (x === 'D') {
                    this.setState({
                        tarikhSanad: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                    // alert('خریدار')
                } else if (x === 'CD') {
                    this.setState({
                        tarikhgharadad: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                    // alert('خریدار')
                } else if (x === 'SDD') {
                    this.setState({
                        tarikhtaslim: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                    // alert('خریدار')
                }

            }
        });
        Picker.show();
    }

    _PayCommision(FileId) {
        let from = this.props.navigation.getParam('from');
        this.setState({Loading: true})
        Connect.SendPRequest(URLS.Link() + "paycommission", {
            id: parseInt(FileId),
            userId: parseInt(this.props.navigation.getParam('userId')),
            role: this.props.navigation.getParam('from'),
        }).then(res => {
            console.log('contract: ');
            console.log(res);
            this.setState({Loading: false})
            if (res.result) {
                if (from === 'Seller') {
                    this._ContractSellerStatus();
                } else if (from == 'Buyer') {
                    this._ContractBuyerStatus()
                }
                this.dropdown.alertWithType('success', '', res.message);
            } else {
                this.dropdown.alertWithType('error', '', res.message);
            }
        });
    }

    //----------Contract Details----------------------------------------------------------------------------------------------------------
    _ContractSellerStatus() {
        Connect.SendPRequest(URLS.Link() + "contract", {
            id: parseInt(this.props.navigation.getParam('FileID')),
            userId: parseInt(this.props.navigation.getParam('userId')),
            reqId: parseInt(this.props.navigation.getParam('TypeReq')),
            role: this.props.navigation.getParam('from'),
        }).then(res => {
            console.log('contract: ');
            console.log(res);
            let Seller = res.prosell;
            let Buyer = res.probuy;
            if (res.result) {
                this.setState({
                    contract: res,
                    BuyerName: Buyer.fName + ' ' + Buyer.lName,
                    BuyerFather: Buyer.father,
                    BuyerCIDN: Buyer.identity,//شماره شناسنامه
                    BuyerNIDN: Buyer.NIDN,//کد ملی
                    BuyerAddress: Buyer.address,
                    BuyerBdate: Buyer.bdate,
                    BuyerPhone: Buyer.tell,
                    BuyerIssued: Buyer.sadereh,
                    //-----Seller--------------------------
                    SellerName: Seller.fName + ' ' + Seller.lName,
                    SellerFather: Seller.father,
                    SellerCIDN: Seller.identity,//شماره شناسنامه
                    SellerNIDN: Seller.NIDN,//کد ملی
                    SellerAddress: Seller.address,
                    SellerBdate: Seller.bdate,
                    SellerPhone: Seller.tell,
                    SellerIssued: Seller.sadereh,
                });
            } else {
                this.setState({
                    contract: res,
                })
            }
        });
    }

    _ContractBuyerStatus() {
        Connect.SendPRequest(URLS.Link() + "contractstatus", {
            id: parseInt(this.props.navigation.getParam('FileID')),
            userId: parseInt(this.props.navigation.getParam('userId')),
            reqId: parseInt(this.props.navigation.getParam('TypeReq')),
        }).then(res => {
            console.log('contract Buyer: ');
            console.log(res);
            let Contract = res.con;
            let Buyer = res.probuy;
            if (res.result) {
                console.log('setStaTE')
                this.setState({
                    contract: res,
                    ContractID: res.con.id,
                    BuyerName: Buyer.fName + ' ' + Buyer.lName,
                    BuyerFather: Buyer.father,
                    BuyerCIDN: Buyer.identity,//شماره شناسنامه
                    BuyerNIDN: Buyer.NIDN,//کد ملی
                    BuyerAddress: Buyer.address,
                    BuyerBdate: Buyer.bdate,
                    BuyerPhone: Buyer.tell,
                    BuyerIssued: Buyer.sadereh,
                    //-----Seller--------------------------
                    SellerName: Contract.fullnameSell,
                    SellerFather: Contract.fatherSell,
                    SellerCIDN: Contract.identitySell,//شماره شناسنامه
                    SellerNIDN: Contract.NIDNSell,//کد ملی
                    SellerAddress: Contract.address,
                    SellerBdate: Contract.bdateSell,
                    SellerPhone: Contract.phoneSell,
                    SellerIssued: Contract.saderehSell,
                    //    -----------------------------------------
                    dealItem: Contract.name,
                    mahal: Contract.mahal,
                    bakhsh: Contract.bakhsh,
                    faree: Contract.faree,
                    asli: Contract.asli,
                    shomarehPelaksabti: Contract.shomarehPelaksabti,
                    sahebsanad: Contract.sahebsanad,
                    serialSanad: Contract.serial,
                    abContoor: Contract.abContoor,
                    otagh: Contract.otagh,
                    gazContoor: Contract.gazContoor,
                    ejarehTime: Contract.ejarehTime,
                    eshterakContoor: Contract.eshterakContoor,
                    mahyaneh: Contract.mahyaneh,
                    pardakhtMablagh: Contract.pardakhtMablagh,
                    naghd: Contract.naghd,
                    checkNumber: Contract.checkNumber,
                    checkBank: Contract.checkBank,
                    checkShobeh: Contract.checkShobeh,
                    aghsat: Contract.aghsat,
                    hozesabti: Contract.hozesabti,
                    masaht: Contract.masaht,
                    safeh: Contract.safeh,
                    daftar: Contract.daftar,
                    dang: Contract.dang,
                    dangan: Contract.dangan,
                    dangpa: Contract.dangpa,
                    fareepa: Contract.fareepa,
                    fareean: Contract.fareean,
                    shomarehan: Contract.shomarehan,
                    shomarehpa: Contract.shomarehpa,
                    sandrahnishom: Contract.sandrahnishom,
                    daftarkhanehAddress: Contract.daftarkhanehAddress,
                    daierphone: Contract.daierphone,
                    daftarsanadrasmi: Contract.daftarsanadrasmi,
                    beneshani: Contract.beneshani,
                    price1: Contract.price1,
                    price2: Contract.price2,
                    price3: Contract.price3,
                    price4: Contract.price4,
                    price5: Contract.price5,
                    taozihat: Contract.taozihat,
                    tarikhgharadad: Contract.tarikhgharadad,
                    tarikhtaslim: Contract.tarikhtaslim,
                    daftarkhanehShomare: Contract.daftarkhanehShomare,
                    barghContoor: Contract.barghContoor,
                    endtimeEjare: Contract.endtimeEjare,
                    starttimeEjare: Contract.starttimeEjare,
                    ejarebaha: Contract.ejarebaha,
                    zarrarPrice: Contract.zarrarPrice,
                    faskhPrice: Contract.faskhPrice,
                    valueDSeller: 1,
                    valueSignSeller: 1,
                });
            } else {
                this.setState({
                    contract: res,
                })
            }
        });
    }

    _Messages(Data, from) {
        if (from === 'Buyer') {
            if (Data.hascon === false) {
                this.ShowMessage = 'flex'
            } else if (Data.hasbuy === true) {
                this.ShowMessage = 'flex'
            }
        } else if (from === 'Seller') {
            if (Data.hasbuy === false) {
                this.ShowMessage = 'flex'
            } else if (Data.hascon) {
                this.ShowMessage = 'flex'
            }
        }
    }

    _Commision(Data, from) {
        //------Check for showing Commision---------------------------------------------------
        if (from === 'Buyer') {
            Data.hasbuy === false && Data.hascon && Data.pay == false ? this.ShowCommision = 'flex' : this.ShowCommision = 'none'
        } else if (from === 'Seller') {
            Data.hasbuy && Data.hascon === false && Data.pay == false ? this.ShowCommision = 'flex' : this.ShowCommision = 'none'
        }
        console.log('update contract page')
    }

    _Form(Data, from) {
        //------Check for showing Form---------------------------------------------------
        if (from === 'Buyer') {
            Data.pay && Data.hasbuy === false && Data.hascon ? this.ShowForm = 'flex' : this.ShowForm = 'none'
        } else if (from === 'Seller') {
            Data.pay && Data.hasbuy && Data.hascon === false ? this.ShowForm = 'flex' : this.ShowForm = 'none'
        }
    }
}




