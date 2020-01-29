import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text, Image, Dimensions, AsyncStorage, Alert, TextInput, ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image'

import RNFetchBlob from "react-native-fetch-blob";
import Icon from 'react-native-vector-icons/Ionicons';

import styles from "../../assets/css/AddAd";
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



export default class AddAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            name: '',
            keywords: '',
            lat: '',
            long: '',
            desc: '',
            Price: '',
            PriceID: 0,
            AddPrices: [],
            FactImg: [],
            province: [],
            city: [],
            SelectedPro: '',
            SelectedProID: '',
            SelectedCity: '',
            SelectedCityID: '',
            MultipleImageNames: [],
            MutlipleImagesFiles: [],
            CameraImageFile: '',
            CameraImageName: '',
            Loading: false,
            ImgLoading: false,
            Photos: []

        };
        this.FactImages = []
    }

    componentWillMount() {
        this._Getprice();
        this._GetProvince();
        AsyncStorage.getItem('id').then((id) => {
            this.setState({ID: id})
        })
    }

    render() {
        return (
            <View style={styles.MainView}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Header navigation={this.props.navigation} PageTitle={'ایجاد آگهی'}/>
                    <View style={styles.AddTourContainer}>
                        <Text style={styles.TitleText}>عنوان:</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'عنوان'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>استان:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectProvince()}>
                            <Text
                                style={styles.TitleText}>{this.state.SelectedPro ? this.state.SelectedPro : 'انتخاب استان'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.TitleText}>شهر:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectCity()}>
                            <Text
                                style={styles.TitleText}>{this.state.SelectedCity ? this.state.SelectedCity : 'انتخاب شهر'}</Text>
                        </TouchableOpacity>
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
                        <Text style={styles.TitleText}>کلمات کلیدی:</Text>
                        <TextInput
                            value={this.state.keywords}
                            onChangeText={(keywords) => this.setState({keywords})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            multiline={true}
                            placeholder={'کلمات کلیدی'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>هزینه آگهی:</Text>
                        <TouchableOpacity style={styles.SelectProBtn}  onPress={() => this._SetPrice()}>
                            <Text
                                style={styles.TitleText}>{this.state.Price ? this.state.Price : 'انتخاب'}</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.TitleText}>انتخاب تصویر</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(0)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[0] ? 'none' : 'flex'}}/>
                                <ActivityIndicator color={AppColorRed} size={32}
                                                   display={this.state.ImgLoading ? 'flex' : 'none'}/>
                                <FastImage
                                    source={{uri: this.state.FactImg[0] ? URLS.Media() + this.state.FactImg[0] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[0] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                    }}/>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(1)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[1] ? 'none' : 'flex'}}/>
                                <FastImage
                                    source={{uri: this.state.FactImg[1] ? URLS.Media() + this.state.FactImg[1] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[1] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                    }}/>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.FactImg.length === 3} style={styles.PhotoAddBtn}
                                              onPress={() => this._PhotoAdd(2)}>
                                <Icon name={'md-add'} size={35} color={'#bbb'}
                                      style={{display: this.state.ImgLoading ? 'none' : this.state.FactImg[2] ? 'none' : 'flex'}}/>
                                <FastImage
                                    source={{uri: this.state.FactImg[2] ? URLS.Media() + this.state.FactImg[2] : null}}
                                    style={{
                                        display: this.state.ImgLoading ? 'none' : this.state.FactImg[2] ? 'flex' : 'none',
                                        width: '100%',
                                        height: '100%',
                                    }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.AddBtn, {}]} onPress={() => this._AddAdvertise()}>
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
                }, () => this._GetCity(this.state.SelectedProID));
            }
        });
        Picker.show();
    }

    //---------------------_SelectProvince--------------------------------------------------------------------------------------
    _SetPrice() {
        // console.warn('lengthPr: '+this.state.AddPrices.length)
        let data = [];
        for (let i = 0; i < this.state.AddPrices.length; i++) {
            // data.push(i)
            data.push((this.state.AddPrices[i].duration + ' - ' + this.state.AddPrices[i].price).toString())
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
            pickerTitleText: 'هزینه آگهی',
            pickerCancelBtnText: 'انصراف',
            pickerData: this.state.AddPrices.length !== 0 ? data : ['-'],
            onPickerConfirm: data => {
                let prices = [];
                for (let i = 0; i < this.state.AddPrices.length; i++) {
                    prices.push((this.state.AddPrices[i].duration + ' - ' + this.state.AddPrices[i].price).toString())
                }
                this.setState({
                    Price: data.toString(),
                    PriceID: prices.indexOf(data.toString()) + 1,
                });
                console.log('PriceID: ' + this.state.PriceID)
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

    //---------------------Getprice--------------------------------------------------------------------------------------
    _Getprice() {
        Connect.SendPRequest(URLS.Link() + "getprice", {})
            .then(res => {
                console.log('getprice: ');
                console.log(res.result);
                if (res) {
                    this.setState({AddPrices: res.result});
                } else {
                }
            });
    }

    //---------------------Adding Advertise--------------------------------------------------------------------------------------
    _AddAdvertise() {
        let {
            SelectedProID,
            SelectedCityID,
            name,
            ID,
            keywords,
            desc
        } = this.state;
        if (SelectedProID,
            SelectedCityID,
            name,
            ID,
            keywords,
            desc) {
            this.setState({Loading: true});
            Connect.SendPRequest(URLS.Link() + "addadvertise", {
                userId: parseInt(ID),
                province: parseInt(SelectedProID),
                city: parseInt(SelectedCityID),
                name: name,
                desc: desc,
                images: this.state.FactImg,
                price: this.state.PriceID,
                keywords: keywords,
            }).then(res => {
                console.log('addtourism: ');
                console.warn(res);
                if (res.result) {
                    this.dropdown.alertWithType('success', '', "تبلیغ با موفقیت اضافه شد");
                    this.setState({Loading: false});
                    setTimeout(()=>{
                        this.props.navigation.replace('Add')
                    },2500);
                } else {
                    this.setState({Loading: false});
                    this.dropdown.alertWithType('error', '', "خطا در ثبت تبلیغ");
                }
            }).catch(() => {
                this.setState({Loading: false});
            });
        } else {
            this.dropdown.alertWithType('error', '', "لطفا موارد خالی را کامل کنید");
        }


    }

    //----------UpdateProfilePhoto----------------------------------------------------------------------------------------------------------
    _PhotoAdd() {
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
                                console.warn('is uploaded?' + responseJson)
                                if (responseJson === true) {
                                    this.FactImages.push(PersonalPhotoName);
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
                                this.setState({FactImg: this.FactImages}, () => console.warn(this.state.FactImg))
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
    //---------------------Selecting City--------------------------------------------------------------------------------------
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
                this.setState({
                    SelectedCity: data.toString(),
                    SelectedCityID: this.state.city[cities.indexOf(data.toString())].id
                }, () => this._GetCity(this.state.SelectedCityID));
            }
        });
        Picker.show();
    }

}




