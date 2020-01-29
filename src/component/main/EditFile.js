import React, {Fragment} from 'react';
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text, Image, Dimensions, AsyncStorage, Alert, TextInput, ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image'

import RNFetchBlob from "react-native-fetch-blob";
import Icon from 'react-native-vector-icons/Ionicons';

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
import Picker from "react-native-picker";
import {
    Connect,
    ImagePickerOptions
} from "../../core/Connect";
import URLS from "../../core/URLS";
import MapView, {Marker} from "react-native-maps";
import ImagePicker from "react-native-image-picker";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;

export default class EditFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            name: '',
            address: '',
            lat: '',
            long: '',
            desc: '',
            price: '',
            roomCount: '',
            floorCount: '',
            constYear: '',
            Warranty: '',
            area: '',//متراژ
            LeaseTerm: '',
            Deposits: '',//ودیعه
            FactImg: [],
            province: [],
            city: [],
            SelectedPro: '',
            SelectedProID: '',
            SelectedCity: '',
            SelectedCityID: '',
            CameraImageFile: '',
            CameraImageName: '',
            orderType: '',
            reqTypeID: '',
            propertyTypeID: '',
            propertyType: '',
            Loading: false,
            ImgLoading: false,
            requestTypes: [],
            propertyTypes: [],
            Photos: [],

        };
        this.FactImages = []
    }

    componentWillMount() {
        this._GetDetails(this.props.navigation.getParam('id'));
        this._GetOrderTypes();
        this._GetPropertyTypes();
        this._GetProvince();
        AsyncStorage.getItem('id').then((id) => {
            this.setState({ID: id})
        })
    }

    render() {
        return (
            <View style={styles.MainView}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Header navigation={this.props.navigation} PageTitle={'ویرایش ملک'}/>
                    <View style={styles.AddTourContainer}>
                        {/*-----------------------------------------------------------------------------------*/}
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
                        <Text style={styles.TitleText}>نوع درخواست:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._OrderType()}>
                            <Text
                                style={styles.TitleText}>{this.state.orderType ? this.state.orderType : 'نوع درخواست'}</Text>
                        </TouchableOpacity>
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>نوع ملک:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._PropertyTypes()}>
                            <Text
                                style={styles.TitleText}>{this.state.propertyType ? this.state.propertyType : 'نوع ملک'}</Text>
                        </TouchableOpacity>
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>استان:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectProvince()}>
                            <Text
                                style={styles.TitleText}>{this.state.SelectedPro ? this.state.SelectedPro : 'انتخاب استان'}</Text>
                        </TouchableOpacity>
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>شهر:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectCity()}>
                            <Text
                                style={styles.TitleText}>{this.state.SelectedCity ? this.state.SelectedCity : 'انتخاب شهر'}</Text>
                        </TouchableOpacity>
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>آدرس:</Text>
                        <TextInput
                            value={this.state.address}
                            onChangeText={(address) => this.setState({address})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'آدرس'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>قیمت:</Text>
                        <TextInput
                            value={this.state.price}
                            onChangeText={(price) => this.setState({price})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'قیمت'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>متراژ:</Text>
                        <TextInput
                            value={this.state.area}
                            onChangeText={(area) => this.setState({area})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'متراژ'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>تعداد طبقات:</Text>
                        <TextInput
                            value={this.state.floorCount}
                            onChangeText={(floorCount) => this.setState({floorCount})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'تعداد طبقات'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>تعداد اتاق:</Text>
                        <TextInput
                            value={this.state.roomCount}
                            onChangeText={(roomCount) => this.setState({roomCount})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'تعداد اتاق'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>ودیعه:</Text>
                        <TextInput
                            value={this.state.Deposits}
                            onChangeText={(Deposits) => this.setState({Deposits})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'ودیعه'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>سال ساخت:</Text>
                        <TextInput
                            value={this.state.constYear}
                            onChangeText={(constYear) => this.setState({constYear})}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholder={'سال ساخت'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>گارانتی:</Text>
                        <TextInput
                            value={this.state.Warranty}
                            onChangeText={(Warranty) => this.setState({Warranty})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'گارانتی'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>زمان اجاره:</Text>
                        <TextInput
                            value={this.state.LeaseTerm}
                            onChangeText={(LeaseTerm) => this.setState({LeaseTerm})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'زمان اجاره'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text style={styles.TitleText}>توضیحات:</Text>
                        <TextInput
                            value={this.state.desc}
                            onChangeText={(desc) => this.setState({desc})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            multiline={true}
                            placeholder={'توضیحات'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*-----------------------------------------------------------------------------------*/}
                        <Text
                            style={styles.TitleText}>انتخاب تصویر</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(0)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[0] ? 'none' : 'flex'}}/>
                                <ActivityIndicator color={AppColorRed} size={32}
                                                   display={this.state.ImgLoading ? 'flex' : 'none'}/>
                                <Fragment
                                    source={{uri: this.state.FactImg[0] ? URLS.Media() + this.state.FactImg[0] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[0] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover'
                                    }}/>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(1)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[1] ? 'none' : 'flex'}}/>
                                <Fragment
                                    source={{uri: this.state.FactImg[1] ? URLS.Media() + this.state.FactImg[1] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[1] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover'
                                    }}/>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(2)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[2] ? 'none' : 'flex'}}/>
                                <Fragment
                                    source={{uri: this.state.FactImg[2] ? URLS.Media() + this.state.FactImg[2] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[2] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover'
                                    }}/>
                            </TouchableOpacity>
                        </View>
                        {/*-------------Map---------------------------------------------------------------------------------*/}
                        <MapView
                            showsCompass={true}
                            style={styles.map}
                            onPress={(loc) =>
                                this.setState({
                                    lat: loc.nativeEvent.coordinate.latitude.toString(),
                                    long: loc.nativeEvent.coordinate.longitude.toString()
                                })
                            }
                            zoomControlEnabled={true}
                            region={{
                                // latitude:35.6892,
                                latitude: this.state.lat !== 0 ? (this.state.lat ? Number(this.state.lat) : 35.6892) : 35.6892,
                                longitude: this.state.long !== 0 ? (this.state.long ? Number(this.state.long) : 51.3890) : 51.3890,
                                // longitude: 51.3890,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                // image={require('../../assets/Images/MarkerBlue.png')}
                                coordinate={{
                                    latitude: this.state.lat !== 0 ? (this.state.lat ? Number(this.state.lat) : 0) : 0,
                                    longitude: this.state.long !== 0 ? (this.state.long ? Number(this.state.long) : 0) : 0
                                }}
                                title={'موقعیت'}
                            />
                        </MapView>
                    </View>
                    <TouchableOpacity style={[styles.AddBtn, {}]}
                                      onPress={() => this._UpdateFile(this.props.navigation.getParam('id'))}>
                        <Text
                            style={[styles.TitleText, {
                                color: '#fff',
                                display: !this.state.Loading ? 'flex' : 'none'
                            }]}>ثبت</Text>
                        <ActivityIndicator size={30} color={'#fff'} display={this.state.Loading ? 'flex' : 'none'}/>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

//---------------------Get Detials --------------------------------------------------------------------------------------
    _GetDetails(id) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "file", {id: parseInt(id)})
            .then(resp => {
                // console.warn('file Details: ');
                console.warn(resp.image);
                if (resp) {
                    let res = resp.file;
                    let FileImages = [];
                    for (let i = 0; i < resp.image.length; i++) {
                        // FileImages.push(i)
                        FileImages.push(resp.image[i].link)
                    }
                    // console.warn(FileImages)
                    this.setState({
                        name: res.name,
                        desc: res.desc,
                        lat: res.lat,
                        long: res.lng,
                        SelectedPro: res.pName,
                        SelectedProID: res.province,
                        SelectedCityID: res.city,
                        SelectedCity: res.cName,
                        address: res.address,
                        price: res.price,
                        roomCount: res.roomCount,
                        floorCount: res.floorCount,
                        constYear: res.constYear,
                        Warranty: res.garanti,
                        area: res.metrajh,//متراژ
                        LeaseTerm: res.ejarehTime,
                        Deposits: res.vadieh,//ودیعه
                        orderType: res.rName,
                        reqTypeID: res.typeReq,
                        propertyTypeID: res.typeMelk,
                        propertyType: res.mName,
                        FactImg: FileImages
                    });
                } else {
                    this.setState({Empty: true});
                }
            });
    }

    //---------------------UpdateFile--------------------------------------------------------------------------------------
    _UpdateFile(id) {
        console.warn('bankool id: ' + id)
        let {
            lat,
            long,
            SelectedProID,
            SelectedCityID,
            name,
            ID,
            address,
            desc,
            price,
            roomCount,
            floorCount,
            constYear,
            Warranty,
            area,
            LeaseTerm,
            Deposits,
            reqTypeID,
            propertyTypeID,
            FactImg
        } = this.state;
        if (
            SelectedProID !== '' &&
            SelectedCityID !== '' &&
            name !== '' &&
            // ID  &&
            // lat!==''  &&
            // long!==''  &&
            // address!==''  &&
            desc !== '' &&
            // price!==''  &&
            // roomCount!==''  &&
            // floorCount!==''  &&
            // constYear!==''  &&
            // Warranty !=='' &&
            area !== '' &&
            // LeaseTerm!==''  &&
            // Deposits !=='' &&
            reqTypeID !== '' &&
            propertyTypeID !== ''
        // FactImg.length!==0
        ) {
            this.setState({Loading: true});
            Connect.SendPRequest(URLS.Link() + "editfile", {
                id: parseInt(id),
                userId: parseInt(ID),
                province: parseInt(SelectedProID),
                city: parseInt(SelectedCityID),
                name: name,
                address: address,
                lat: lat,
                lng: long,
                desc: desc,
                images: [],
                // images: this.state.FactImg,
                price: price,
                garanti: Warranty,
                ejarehTime: LeaseTerm,
                roomCount: roomCount,
                floorCount: floorCount,
                typeReq: reqTypeID,
                typeMelk: propertyTypeID,
                constYear: constYear,
                metrajh: area,
                vadieh: Deposits,

            }).then(res => {
                console.log('add file: ');
                console.log('add file: ' + res);
                if (res.result) {
                    this.dropdown.alertWithType('success', '', "فایل با موفقیت اضافه شد");
                    this.setState({Loading: false});
                } else {
                    this.setState({Loading: false});
                    this.dropdown.alertWithType('error', '', "خطا در ثبت فایل");
                }
            }).catch(() => {
                this.setState({Loading: false});
            });
        } else {
            this.dropdown.alertWithType('error', '', "لطفا موارد خالی را کامل کنید");
        }
    }

//---------------------Get Province --------------------------------------------------------------------------------------
    _GetProvince() {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "province", {})
            .then(res => {
                // console.log('province: ');
                // console.warn(res);
                if (res) {
                    this.setState({province: res,});
                } else {
                    this.setState({Empty: true});
                }
            });
    }

//---------------------_SelectProvince--------------------------------------------------------------------------------------
    _SelectProvince() {
        // console.warn('province: ')
        // console.warn(this.state.province)
        let data = [];
        for (let i = 0; i < this.state.province.length; i++) {
            data.push(this.state.province[i].name)
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
            pickerTitleText: 'استان',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['لبب','بیسل'],
            pickerData: this.state.province.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let pros = [];
                for (let i = 0; i < this.state.province.length; i++) {
                    pros.push(this.state.province[i].name)
                }
                // console.warn('Pro id: ' + pros.indexOf(data.toString()));
                this.setState({
                    SelectedPro: data.toString(),
                    SelectedProID: pros.indexOf(data.toString()) + 1,
                    // SelectedProID: (data.indexOf(data.toString()))+1,
                    // CityID: this.state.CityIdList[this.state.CityList.indexOf(data.toString())]
                }, () => this._GetCity(this.state.SelectedProID));
            }
        });
        Picker.show();
    }

    //---------------------GetCity --------------------------------------------------------------------------------------
    _GetCity(id) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "city", {id: parseInt(id)})
            .then(res => {
                // console.log('city: ');
                // console.warn(res);
                if (res) {
                    this.setState({city: res});
                } else {
                }
            });
    }

    //---------------------_SelectCity--------------------------------------------------------------------------------------
    _SelectCity() {
        // console.warn('CityIdList: ')
        // console.warn(this.state.CityIdList)
        let data = [];
        for (let i = 0; i < this.state.city.length; i++) {
            data.push(this.state.city[i].name)
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
            pickerTitleText: 'شهر',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['لبب','بیسل'],
            pickerData: this.state.city.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let cities = [];
                for (let i = 0; i < this.state.city.length; i++) {
                    cities.push(this.state.city[i].name)
                }
                // console.warn('city: ' + data.toString());
                // console.warn('cityID: ' + this.state.city[cities.indexOf(data.toString())].id);
                // console.warn(this.state.city[cities.indexOf(data.toString())]);
                this.setState({
                    SelectedCity: data.toString(),
                    SelectedCityID: this.state.city[cities.indexOf(data.toString())].id
                }, () => null);
            }
        });
        Picker.show();
    }

    //----------UpdateProfilePhoto----------------------------------------------------------------------------------------------------------
    _PhotoAdd(id) {
        const PersonalPhotoName = (Math.ceil(new Date().getTime())).toString().replace(".", "") + ".jpg";
        ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
            console.log(response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker ServerError: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                        ImgLoading: true
                    },
                    () => {
                        RNFetchBlob.fetch('POST', URLS.Link() + 'upload', {
                            Authorization: "Bearer access-token",
                            otherHeader: "foo",
                            'Content-Type': 'multipart/form-data',
                        }, [
                            {
                                name: 'file',
                                type: 'image/jpeg',
                                filename: PersonalPhotoName,
                                data: response.data
                            },
                        ]).then((response) => response.json())
                            .then((responseJson) => {
                                console.log('is uploaded?' + responseJson)
                                if (responseJson === true) {
                                    this.FactImages[id] = PersonalPhotoName;
                                    this.Counter = this.Counter + 1;
                                    this.forceUpdate();
                                    this.setState({ImgLoading: false})
                                    if (this.Counter < 3) {
                                        Alert.alert(
                                            '',
                                            'تصویر با موفقیت ارسال شد، آیا مایل به ارسال تصویر دیگر می باشید؟',
                                            [
                                                {
                                                    text: 'خیر',
                                                    onPress: () => this.setState({ImgLoading: false})
                                                    ,
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'بله', onPress: () => this._PhotoAdd()
                                                },
                                            ],
                                            {cancelable: true},
                                        );
                                    }
                                }
                                this.setState({FactImg: this.FactImages}, () => console.log(this.state.FactImg))
                                // console.warn(responseJson)
                            }).catch((error) => {
                            console.error(error);
                        }).catch((err) => {
                            console.error(err);
                            this.setState({ImgLoading: false})

                        })
                    }
                );
            }
        });
    }

    //----------_OrderType----------------------------------------------------------------------------------------------------------
    _OrderType() {
        // console.warn('CityIdList: ')
        // console.warn(this.state.CityIdList)
        let data = [];
        for (let i = 0; i < this.state.requestTypes.length; i++) {
            data.push(this.state.requestTypes[i].name)
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
            pickerTitleText: 'نوع درخواست',
            pickerCancelBtnText: 'انصراف',
            // pickerData: ['فروش', 'اجاره'],
            pickerData: this.state.requestTypes.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let types = [];
                for (let i = 0; i < this.state.requestTypes.length; i++) {
                    types.push(this.state.requestTypes[i].name)
                }
                this.setState({
                    orderType: data.toString(),
                    reqTypeID: this.state.requestTypes[types.indexOf(data.toString())].id
                }, () => console.warn('reqTypeID: ' + this.state.reqTypeID));
            }
        });
        Picker.show();
    }

    //----------Gey OrderTypes----------------------------------------------------------------------------------------------------------
    _GetOrderTypes() {
        Connect.SendPRequest(URLS.Link() + "request", {})
            .then(res => {
                console.log('request: ');
                console.log(res);
                if (res) {
                    this.setState({requestTypes: res});
                } else {
                }
            });
    }

    //----------Gey PropertyType----------------------------------------------------------------------------------------------------------
    _GetPropertyTypes() {
        Connect.SendPRequest(URLS.Link() + "melk", {})
            .then(res => {
                console.log('melk: ');
                console.log(res);
                if (res) {
                    this.setState({propertyTypes: res});
                } else {
                }
            });
    }

    //----------Select _PropertyTypes-------------------------------------------------------------------------------------
    _PropertyTypes() {
        // console.warn('CityIdList: ')
        // console.warn(this.state.CityIdList)
        let data = [];
        for (let i = 0; i < this.state.propertyTypes.length; i++) {
            data.push(this.state.propertyTypes[i].name)
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
            pickerTitleText: 'نوع ملک',
            pickerCancelBtnText: 'انصراف',
            pickerData: this.state.propertyTypes.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let types = [];
                for (let i = 0; i < this.state.propertyTypes.length; i++) {
                    types.push(this.state.propertyTypes[i].name)
                }
                this.setState({
                    propertyType: data.toString(),
                    propertyTypeID: this.state.propertyTypes[types.indexOf(data.toString())].id
                }, () => console.log('propertyTypeID: ' + this.state.propertyTypeID));
            }
        });
        Picker.show();
    }
}




