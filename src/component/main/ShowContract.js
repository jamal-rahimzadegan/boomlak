import React from 'react';
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native';
import styles from "../../assets/css/Rules";
import DropdownAlert from 'react-native-dropdownalert';
import Styles from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import PDFView from "react-native-view-pdf";
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from "react-native-vector-icons/AntDesign";
import URLS from "../../core/URLS";


export default class ShowContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Rules: '',
            Waiting: false,
        };
    }

    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'دسترسی به حافظه داخلی',
                message:
                    'لطفا برای ذخیره فایل قرارداد، به بوملاک دسترسی لازم را بدهید',

                buttonPositive: 'بعدی',
            },
        );
    }

    render() {
        let ConName = this.props.navigation.getParam('ConName')
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation}
                        PageTitle={'قرارداد' + ' ' + this.props.navigation.getParam('Name')}/>
                <PDFView
                    style={{flex: 1, backgroundColor: '#fff'}}
                    resource={URLS.Media() + ConName}
                    resourceType={"url"}
                />
                <TouchableOpacity
                    onPress={() => this._ContractDL(URLS.Media() + ConName)}
                    style={[styles.ChatBtn, {}]}>
                    <ActivityIndicator size={35} color={'#fff'}
                                       style={{display: this.state.Waiting ? 'flex' : 'none'}}/>
                    <Icon name={"download"} color={'#fefefe'} size={30}
                          style={{display: this.state.Waiting ? 'none' : 'flex'}}/>
                </TouchableOpacity>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    //-------ContractDL-------------------------------------------------------------------------------------
    _ContractDL(ConFile) {

        let Contract = (Math.ceil(new Date().getTime())).toString().replace(".", "") + ".pdf";
        this.setState({Waiting: true});
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob.config({
            path: dirs.DownloadDir + '/Contract-' + Contract
        }).fetch('GET', ConFile, {})
            .then((res) => {
                if (res.respInfo.status == 200) {
                    this.setState({Waiting: false});
                    this.dropdown.alertWithType('success', '', "قرارداد با موفقیت دانلود شده و در مسیر دانلودها قرار گرفت.");
                } else {
                    this.setState({Waiting: false});
                    this.dropdown.alertWithType('error', '', "خطا در دریافت فایل قرارداد");
                }
                console.warn('status: ', res.respInfo.status)
            })
    }
}




