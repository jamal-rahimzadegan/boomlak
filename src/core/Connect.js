import React, {Component} from "react";
import {AsyncStorage} from "react-native";
import firebase from "react-native-firebase";


export class Connect extends Component {
    constructor(props) {
        super(props);
    }

    static SendPRequest(action, Params = {}) {
        return fetch(action, {
            // return fetch(Link + action, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify(Params)
        }).then((response) => response.json())
    }

    //--------------GetFcmToken-------------------------------------------------------------------------------------------------
    static GetFcmToken() {
        return firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    AsyncStorage.setItem('token', fcmToken);
                    // AsyncStorage.setItem('token','134');
                    console.log('Firebase Token ==', fcmToken);
                    this.props.dispatch(fcmRegister(fcmToken));
                } else {
                    // user doesn't have a device token yet
                    // console.warn('User doesn\'t have a  token yet, Token = ', fcmToken);
                    firebase.messaging().requestPermission()
                }
            })
    }

    //--------------FormatNumber-------------------------------------------------------------------------------------------------
    static FormatNumber(price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}

export const ImagePickerOptions = {
    title: 'انتخاب تصویر',
    chooseFromLibraryButtonTitle: 'انتخاب از حافظه داخلی',
    takePhotoButtonTitle: 'انتخاب از دوربین',
    cancelButtonTitle: 'انصراف',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};