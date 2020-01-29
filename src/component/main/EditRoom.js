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

import styles from "../../assets/css/AddTour";
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


export default class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            name: '',
            info: '',
            facilities: '',
            capacity: '',
            price: '',
            firstDate: '',
            SelectedFile: '',
            FileId: '',
            Files: [],
            FactImg: [],
            MultipleImageNames: [],
            MutlipleImagesFiles: [],
            CameraImageFile: '',
            CameraImageName: '',
            Loading: false,
            ImgLoading: false,

        };
        this.FactImages = []
    }

    componentWillMount() {
        this._GetDetails(this.props.navigation.getParam('id'))
        AsyncStorage.getItem('id').then((id) => {
            this.setState({ID: id}, () => {
                    this._GetFiles(id);
                }
            )
        })
    }

    render() {
        // let Name='';
        return (
            <View style={styles.MainView}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Header navigation={this.props.navigation} PageTitle={'ویرایش اتاق'}/>
                    <View style={styles.AddTourContainer}>
                        <Text style={styles.TitleText}>فایل:</Text>
                        <TouchableOpacity style={styles.SelectProBtn} onPress={() => this._SelectFile()}>
                            <Text
                                style={styles.TitleText}>{this.state.SelectedFile ? this.state.SelectedFile : 'انتخاب فایل'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.TitleText}>نام:</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name})}
                            // onBlur={() =>this.setState({name:Name},()=>console.warn('name: '+this.state.name))}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'نام'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>قیمت یک شبانه روز:</Text>
                        <TextInput
                            value={this.state.price}
                            onChangeText={(price) => this.setState({price})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'قیمت یک شبانه روز'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>ظرفیت:</Text>
                        <TextInput
                            onChangeText={(capacity) => this.setState({capacity})}
                            value={this.state.capacity}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            placeholder={'ظرفیت'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>اطلاعات:</Text>
                        <TextInput
                            value={this.state.info}
                            onChangeText={(info) => this.setState({info})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            multiline={true}
                            placeholder={'اطلاعات'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        <Text style={styles.TitleText}>امکانات:</Text>
                        <TextInput
                            value={this.state.facilities}
                            onChangeText={(facilities) => this.setState({facilities})}
                            underlineColorAndroid={"transparent"}
                            // keyboardType={"number-pad"}
                            multiline={true}
                            placeholder={'امکانات'}
                            style={[styles.SelectProBtn, {color: '#333', fontFamily: 'BYekan'}]}
                        />
                        {/*<Text style={styles.TitleText}>اولین تاریخ موجود برای رزرو:</Text>*/}
                        {/*<TouchableOpacity style={styles.SelectProBtn} onPress={() => this._FirstReseveTime()}>*/}
                        {/*    <Text*/}
                        {/*        style={styles.TitleText}>{this.state.firstDate ? this.state.firstDate : 'انتخاب تاریخ'}</Text>*/}
                        {/*</TouchableOpacity>*/}
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
                                        resizeMode: 'cover'
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
                                        resizeMode: 'cover'
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
                                        resizeMode: 'cover'
                                    }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.AddBtn, {}]} onPress={() => this._UpdateRoom(this.props.navigation.getParam('id'))}>
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
        Connect.SendPRequest(URLS.Link() + "room", {id: parseInt(id)})
            .then(resp => {
                console.log('Room Details: ');
                console.log(resp);
                console.log(resp);
                if (resp) {
                    let res = resp.data
                    this.setState({
                        name: res.name,
                        info: res.info,
                        facilities: res.facilities,
                        capacity:res.zarfiat,
                        price: res.price,
                        firstDate: res.firstReserve,
                        SelectedFile:res.fName,
                        FileId:  res.idparent ,

                    });
                } else {
                    this.setState({Empty: true});
                }
            });
    }

//---------------------Get AmlakLIst --------------------------------------------------------------------------------------
    _GetFiles(ID) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "getfiles", {userId: parseInt(ID)})
            .then(res => {
                // console.warn('userId: '+ID);
                console.log('getfiles:')
                console.log(res);
                if (res) {
                    this.setState({Files: res.file,});
                } else {
                    this.setState({Empty: true});
                }
            });
    }

    //---------------------_AddRoom--------------------------------------------------------------------------------------
    _UpdateRoom(id) {
        let {
            firstDate,
            info,
            facilities,
            capacity,
            FileId,
            FactImg,
            name,
            ID,
            price,
        } = this.state;
        if (1) {
            this.setState({Loading: true});
            Connect.SendPRequest(URLS.Link() + "editroom", {
                userId: parseInt(ID),
                file: FileId,
                name: name,
                zarfiat: capacity,
                info: info,
                facilities: facilities,
                firstReserve: firstDate,
                price: price,
                images: FactImg,


                id: parseInt(id)


            }).then(res => {
                console.log('AddRoom: ');
                console.warn(res);
                if (res.result) {
                    this.dropdown.alertWithType('success', '', "اتاق با موفقیت اضافه شد");
                    this.setState({Loading: false});
                } else {
                    this.setState({Loading: false});
                    this.dropdown.alertWithType('error', '', "خطا در ثبت اتاق");
                }
            }).catch(() => {
                this.setState({Loading: false});
            });
        } else {
            this.dropdown.alertWithType('error', '', "لطفا موارد خالی را کامل کنید");
        }


    }

    //----------_PhotoAdd----------------------------------------------------------------------------------------------------------
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

    //----------_SelectFile----------------------------------------------------------------------------------------------------------
    _SelectFile() {
        let data = [];
        for (let i = 0; i < this.state.Files.length; i++) {
            data.push(this.state.Files[i].name)
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
            pickerData: this.state.Files.length !== 0 ? data : ['-'],
            onPickerConfirm: file => {

                let File = [];
                for (let i = 0; i < this.state.Files.length; i++) {
                    File.push(this.state.Files[i].name)
                }
                // console.warn(date.toString())
                this.setState({
                    SelectedFile: file.toString(),
                    FileId: this.state.Files[File.indexOf(file.toString())].id,
                }, () => null);
                console.warn('id: ' + this.state.FileId)

            }
        });
        Picker.show();
    }

    //----------First Reserve Time----------------------------------------------------------------------------------------------------------
    _FirstReseveTime() {
        let data = [['سال'], ['ماه'], ['روز']];
        for (let i = 1; i < 32; i++) {
            data[2].push(i)
        }
        for (let i = 1; i < 13; i++) {
            data[1].push(i)
        }
        for (let i = 1398; i < 1399; i++) {
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
                console.warn(date.toString())
                this.setState({
                    firstDate: date.toString().replace(',', '/').replace(',', '/').replace(',', '/'),
                }, () => null);
            }
        });
        Picker.show();
    }
}




