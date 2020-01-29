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



export default class  بابتRentContract extends React.Component {
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
            BuyerMatch: '',
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
            SellerMatch: '',
            SellerFinalAccept: '',
            SellerAddress: '',
            SellerBdate: 'تاریخ تولد',
            SellerPhone: '',
            SellerIssued: '',
            //----Rent Details------------------
            mahal: '',
            bakhsh: '',
            faree: '',
            asli: '',
            masahat: '',
            pelakSabti: '',
            sahebsanad: '',
            serial: '',
            otagh: '',
            ejarehTime: '',
            mahyaneh: '',
            pardakhtMablagh: '',
            naghd: '',
            shomarehCheck: '',
            bankCheck: '',
            shoebehCheck: '',
            endtimeEjare: 'زمان پایان اجاره',
            starttimeEjare: 'زمان شروع اجاره',
            ejarebaha: '',
            dang: '',
            safeh: '',
            daftar: '',
            benam: '',
            moshtamel: '',
            fareepa: '',
            metrajpa: '',
            fareean: '',
            metrajan: '',
            phoned: '',
            mablakhcheck: '',
            tarikhtaslim: 'تاریخ تسلیم قرارداد',
            mablakhtejari: '',
            tarikhgharadad: 'تاریخ تنظیم قرارداد',

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
                // console.warn('Buyer')
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
        this._Messages(Data, from)
        this._Form(Data, from)
        this._Commision(Data, from)

        //----------------------------------------------------------------------------------
        return (
            <View style={styles.MainView}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Header navigation={this.props.navigation} PageTitle={'ایجاد قولنامه رهن و اجاره'}/>
                    {/*-----------------Message------------------------*/}
                    <Text style={[styles.TitleText, {
                        textAlign: 'center',
                        display: this.ShowMessage
                    }]}>{this.state.contract.message}</Text>
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
                        {/*---------Buyer Details-----------------------------------------------------------------------------------*/}
                        <View pointerEvents={from === 'Buyer' ? null : 'none'} style={{
                            backgroundColor: from === 'Buyer' ? 'transparent' : '#eee',
                            padding: 5,
                            borderRadius: 4
                        }}>
                            <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات مستاجر</Text>
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
                        <View pointerEvents={from === 'Seller' ? null : 'none'} style={{
                            backgroundColor: from === 'Seller' ? 'transparent' : '#eee',
                            padding: 5,
                            borderRadius: 4
                        }}>
                            <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات موجر</Text>
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
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan', marginBottom: 10}]}
                            />

                            <Text style={styles.TitleText}>صادره از:</Text>
                            <TextInput
                                value={this.state.SellerIssued}
                                onChangeText={(SellerIssued) => this.setState({SellerIssued})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'صادره از'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan', marginBottom: 10}]}
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
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan', marginBottom: 10}]}
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
                        </View>
                        {/*-------Transaction information--------------------------------------------------*/}
                        <View pointerEvents={from === 'Seller' ? null : 'none'} style={{
                            backgroundColor: from === 'Seller' ? 'transparent' : '#eee',
                            padding: 5,
                            borderRadius: 4
                        }}>
                            <Text style={[styles.TitleText, {textAlign: 'center'}]}>اطلاعات مورد معامله</Text>
                            <Text style={styles.TitleText}>نام(آپارتمان):</Text>
                            <TextInput
                                value={this.state.dealItem}
                                onChangeText={(dealItem) => this.setState({dealItem})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'نام(آپارتمان)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>دانگ:</Text>
                            <TextInput
                                value={this.state.dang}
                                onChangeText={(dang) => this.setState({dang})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'دانگ'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>محل:</Text>
                            <TextInput
                                value={this.state.mahal}
                                onChangeText={(mahal) => this.setState({mahal})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'محل'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>شماره پلاک ثبتی:</Text>
                            <TextInput
                                value={this.state.pelakSabti}
                                onChangeText={(pelakSabti) => this.setState({pelakSabti})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'شماره پلاک ثبتی'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>بخش:</Text>
                            <TextInput
                                value={this.state.bakhsh}
                                onChangeText={(bakhsh) => this.setState({bakhsh})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'بخش'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>فرعی:</Text>
                            <TextInput
                                value={this.state.faree}
                                onChangeText={(faree) => this.setState({faree})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'فرعی'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>اصلی:</Text>
                            <TextInput
                                value={this.state.asli}
                                onChangeText={(asli) => this.setState({asli})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'اصلی'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>مساحت:</Text>
                            <TextInput
                                value={this.state.masahat}
                                onChangeText={(masahat) => this.setState({masahat})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'مساحت'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>سریال:</Text>
                            <TextInput
                                value={this.state.serial}
                                onChangeText={(serial) => this.setState({serial})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'سریال'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>صاحب سند:</Text>
                            <TextInput
                                value={this.state.sahebsanad}
                                onChangeText={(sahebsanad) => this.setState({sahebsanad})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'صاحب سند'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>تعداد اتاق:</Text>
                            <TextInput
                                value={this.state.otagh}
                                onChangeText={(otagh) => this.setState({otagh})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'تعداد اتاق'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*-----------------------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>مدت زمان اجاره:</Text>
                            <TextInput
                                value={this.state.ejarehTime}
                                onChangeText={(ejarehTime) => this.setState({ejarehTime})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'مدت زمان اجاره'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            {/*------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>از تاریخ(اجاره)
                                :</Text>
                            <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._RentTime('St')}>
                                <Text
                                    style={styles.TitleText}>{this.state.starttimeEjare}</Text>
                            </TouchableOpacity>
                            {/*------------------------------------------------------------------*/}
                            <Text style={styles.TitleText}>تا تاریخ(اجاره)
                                :</Text>
                            <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._RentTime('E')}>
                                <Text
                                    style={styles.TitleText}>{this.state.endtimeEjare}</Text>
                            </TouchableOpacity>
                            <Text style={styles.TitleText}>اجاره بها:</Text>
                            <TextInput
                                value={this.state.ejarebaha}
                                onChangeText={(ejarebaha) => this.setState({ejarebaha})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'اجاره بها'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>ماهیانه:</Text>
                            <TextInput
                                value={this.state.mahyaneh}
                                onChangeText={(mahyaneh) => this.setState({mahyaneh})}
                                underlineColorAndroid={"transparent"}
                                // keyboardType={"number-pad"}
                                placeholder={'ماهیانه'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            <Text style={styles.TitleText}>شماره چک:</Text>
                            <TextInput
                                value={this.state.shomarehCheck}
                                onChangeText={(shomarehCheck) => this.setState({shomarehCheck})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'شماره چک'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>بانک:</Text>
                            <TextInput
                                value={this.state.bankCheck}
                                onChangeText={(bankCheck) => this.setState({bankCheck})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'بانک'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>شعبه:</Text>
                            <TextInput
                                value={this.state.shoebehCheck}
                                onChangeText={(shoebehCheck) => this.setState({shoebehCheck})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'شعبه'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>صفحه:</Text>
                            <TextInput
                                value={this.state.safeh}
                                onChangeText={(safeh) => this.setState({safeh})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'صفحه'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            <Text style={styles.TitleText}>دفتر:</Text>
                            <TextInput
                                value={this.state.daftar}
                                onChangeText={(daftar) => this.setState({daftar})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'دفتر'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>بنام:</Text>
                            <TextInput
                                value={this.state.benam}
                                onChangeText={(benam) => this.setState({benam})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'بنام'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>مشتمل بر:</Text>
                            <TextInput
                                value={this.state.moshtamel}
                                onChangeText={(moshtamel) => this.setState({moshtamel})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'مشتمل بر'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            <Text style={styles.TitleText}>فرعی(پارکینگ):</Text>
                            <TextInput
                                value={this.state.fareepa}
                                onChangeText={(fareepa) => this.setState({fareepa})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'فرعی(پارکینگ)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />


                            <Text style={styles.TitleText}>متراژ(پارکینگ):</Text>
                            <TextInput
                                value={this.state.metrajpa}
                                onChangeText={(metrajpa) => this.setState({metrajpa})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'متراژ(پارکینگ)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>فرعی(انباری):</Text>
                            <TextInput
                                value={this.state.fareean}
                                onChangeText={(fareean) => this.setState({fareean})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'فرعی(انباری)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />

                            <Text style={styles.TitleText}>متراژ(انباری):</Text>
                            <TextInput
                                value={this.state.metrajan}
                                onChangeText={(metrajan) => this.setState({metrajan})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'متراژ(انباری)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>شماره تلفن(دایر/غیردایر):</Text>
                            <TextInput
                                value={this.state.phoned}
                                onChangeText={(phoned) => this.setState({phoned})}
                                underlineColorAndroid={"transparent"}
                                keyboardType={"number-pad"}
                                placeholder={'شماره تلفن(دایر/غیردایر)'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>مبلغ چک:</Text>
                            <TextInput
                                value={this.state.mablakhcheck}
                                onChangeText={(mablakhcheck) => this.setState({mablakhcheck})}
                                underlineColorAndroid={"transparent"}
                                placeholder={'مبلغ چک'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>تاریخ تسلیم قرارداد:</Text>
                            <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._RentTime('D')}>
                                <Text
                                    style={styles.TitleText}>{this.state.tarikhtaslim}</Text>
                            </TouchableOpacity>
                            <Text style={styles.TitleText}>مبلغ تجاری:</Text>
                            <TextInput
                                value={this.state.mablakhtejari}
                                onChangeText={(mablakhtejari) => this.setState({mablakhtejari})}
                                underlineColorAndroid={"transparent"}

                                placeholder={'مبلغ تجاری'}
                                style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                            />
                            <Text style={styles.TitleText}>تاریخ تنظیم قرارداد:</Text>
                            <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._RentTime('T')}>
                                <Text
                                    style={styles.TitleText}>{this.state.tarikhgharadad}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[styles.AddBtn, {}]}
                                          onPress={() => this._AddRentContract(this.state.ID, from)}>
                            <Text
                                style={[styles.TitleText, {
                                    color: '#fff',
                                    display: !this.state.Loading ? 'flex' : 'none'
                                }]}>ثبت</Text>
                            <ActivityIndicator size={30} color={'#fff'}
                                               display={this.state.Loading ? 'flex' : 'none'}/>
                        </TouchableOpacity>
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
    _AddRentContract(ID, from) {
        if (from === 'Seller') {
            Connect.SendPRequest(URLS.Link() + "addcontractej", {
                fileId: parseInt(this.props.navigation.getParam('FileID')),
                userId: parseInt(this.props.navigation.getParam('userId')),
                matchSell: this.state.valueDSeller.toString(),
                fullnameSell: this.state.BuyerName,
                fatherSell: this.state.SellerFather,
                bdateSell: this.state.SellerBdate,
                identitySell: this.state.SellerCIDN,
                NIDNSell: this.state.SellerNIDN,
                addressSell: this.state.SellerAddress,
                confirmSell: this.state.valueSignSeller.toString(),
                phoneSell: this.state.SellerPhone,
                saderehSell: this.state.SellerIssued,
                name: this.state.dealItem,
                mahal: this.state.mahal,
                pelakSabti: this.state.mahal,
                faree: this.state.faree,
                asli: this.state.asli,
                bakhsh: this.state.bakhsh,
                masahat: this.state.masahat,
                serial: this.state.serial,
                sahebsanad: this.state.sahebsanad,
                otagh: this.state.otagh,
                ejarehTime: this.state.ejarehTime,
                starttimeEjare: this.state.starttimeEjare,
                endtimeEjare: this.state.endtimeEjare,
                ejarebaha: this.state.ejarebaha,
                mahyaneh: this.state.mahyaneh,
                shomarehCheck: this.state.shomarehCheck,
                shoebehCheck: this.state.shoebehCheck,
                bankCheck: this.state.bankCheck,
                dang: this.state.dang,
                safeh: this.state.safeh,
                daftar: this.state.daftar,
                benam: this.state.benam,
                moshtamel: this.state.moshtamel,
                fareepa: this.state.fareepa,
                metrajpa: this.state.metrajpa,
                fareean: this.state.fareean,
                metrajan: this.state.metrajan,
                phoned: this.state.phoned,
                mablakhcheck: this.state.mablakhcheck,
                tarikhtaslim: this.state.tarikhtaslim,
                mablakhtejari: this.state.mablakhtejari,
                tarikhgharadad: this.state.tarikhgharadad,
                naghd: this.state.naghd,
                check: this.state.check,
                tarikhSanad: this.state.tarikhSanad,
            }).then(res => {
                console.warn('Create Rent Contract: ');
                console.warn(res);
                if (res.result) {
                    this._ContractSellerStatus()
                    this.dropdown.alertWithType('success', '', "قرارداد با موفقیت ثبت شد");
                    // this.setState({propertyTypes: res});
                    this.props.navigation.goBack()

                } else {
                    this.dropdown.alertWithType('error', '', "قرارداد  ثبت نشد، لطفا دوباره تلاش نمایید");
                }
            });
        } else if (from === 'Buyer') {
            Connect.SendPRequest(URLS.Link() + "contractbuy", {
                fileId: parseInt(this.props.navigation.getParam('FileID')),
                id: parseInt(this.state.ContractID),
                fullnameBuy: this.state.BuyerName,
                addressBuy: this.state.BuyerAddress,
                NIDNBuy: this.state.BuyerNIDN,
                bdateBuy: this.state.BuyerBdate,
                fatherBuy: this.state.BuyerFather,
                matchBuy: this.state.valueDBuyer.toString(),
                identityBuy: this.state.BuyerCIDN,
                phoneBuy: this.state.BuyerPhone,
                saderehBuy: this.state.BuyerIssued,

            }).then(res => {
                console.warn('Create Rent Contract: ');
                console.warn(res);
                if (res.result) {
                    this._ContractBuyerStatus()
                    this.dropdown.alertWithType('success', '', "قرارداد با موفقیت ثبت شد");
                    // this.setState({propertyTypes: res});
                } else {
                    this.dropdown.alertWithType('error', '', "قرارداد  ثبت نشد، لطفا دوباره تلاش نمایید");
                }
            });
        }
        // console.warn('valueSignBuyer: '+this.state.valueSignBuyer)
        // console.warn('valueSignSeller: '+this.state.valueSignSeller)
        // console.warn('valueDSeller: '+this.state.valueDSeller)
        // console.warn('valueDBuyer: '+this.state.valueDBuyer)

    }

    _BdateSelcet(x) {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1380; i > 1310; i--) {
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
                }

            }
        });
        Picker.show();
    }

    _RentTime(x) {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1400; i > 1398; i--) {
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
            pickerData: data,
            onPickerConfirm: date => {
                console.warn(date.toString());
                if (x === 'St') {
                    this.setState({
                        starttimeEjare: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                } else if (x === 'E') {
                    this.setState({
                        endtimeEjare: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                } else if (x === 'D') {
                    this.setState({
                        tarikhtaslim: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
                } else if (x === 'T') {
                    this.setState({
                        tarikhgharadad: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                    }, () => null);
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
                    SellerFather: Contract.father,
                    SellerCIDN: Contract.identity,//شماره شناسنامه
                    SellerNIDN: Contract.NIDN,//کد ملی
                    SellerAddress: Contract.address,
                    SellerBdate: Contract.bdate,
                    SellerPhone: Contract.tell,
                    SellerIssued: Contract.sadereh,
                    //    -----------------------------------------
                    dealItem: Contract.dealItem,
                    mahal: Contract.mahal,
                    banaMetrajh: Contract.banaMetrajh,
                    bakhsh: Contract.bakhsh,
                    faree: Contract.faree,
                    asli: Contract.asli,
                    shomarehPelaksabti: Contract.shomarehPelaksabti,
                    sahebsanad: Contract.sahebsanad,
                    serialSanad: Contract.serialSanad,
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
                    shoebehCheck: Contract.shoebehCheck,
                    barghContoor: Contract.barghContoor,
                    endtimeEjare: Contract.endtimeEjare,
                    starttimeEjare: Contract.starttimeEjare,
                    ejarebaha: Contract.ejarebaha,
                    zarrarPrice: Contract.zarrarPrice,
                    faskhPrice: Contract.faskhPrice,
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
            // console.warn('from: ' + from);
            // console.warn('hasbuy: ' + Data.hasbuy);
            // console.warn('hascon: ' + Data.hascon);
            // console.warn('pay: ' + Data.pay);
            Data.hasbuy === false && Data.hascon && Data.pay == false ? this.ShowCommision = 'flex' : this.ShowCommision = 'none'
        } else if (from === 'Seller') {
            // console.warn('from: ' + from);
            // console.warn('hasbuy: ' + Data.hasbuy);
            // console.warn('hascon: ' + Data.hascon);
            // console.warn('pay: ' + Data.pay);
            Data.hasbuy && Data.hascon === false && Data.pay == false ? this.ShowCommision = 'flex' : this.ShowCommision = 'none'
        }
        // this.forceUpdate()
        console.log('update contract page')
    }

    _Form(Data, from) {
        //------Check for showing Form---------------------------------------------------
        if (from === 'Buyer') {
            //معاملات من
            //مشتری
            Data.pay && Data.hasbuy === false && Data.hascon ? this.ShowForm = 'flex' : this.ShowForm = 'none'
        } else if (from === 'Seller') {
            //املاک
            //فروشنده
            Data.pay && Data.hasbuy && Data.hascon === false ? this.ShowForm = 'flex' : this.ShowForm = 'none'
        }
    }
}




