import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Header from "./Header";
import SignatureCapture from 'react-native-signature-capture';
import DropdownAlert from "react-native-dropdownalert";
import Styles, {AppColorRed} from "../../assets/css/Styles";
import NavigationBar from "./NavigationBar";
import {Btm} from "../../App";

export default class DigSign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            sign: '',
            Waiting: false,
        };
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <Header navigation={this.props.navigation} PageTitle={'امضا دیجیتال'}/>
                <SignatureCapture
                    style={[{flex: 1}, styles.signature]}
                    ref="sign"
                    onSaveEvent={(res) => this._Save(res)}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
                <View style={{flex: .18, flexDirection: "row", backgroundColor: '#fff'}}>
                    <TouchableOpacity style={styles.buttonStyle}
                                      onPress={() => this.saveSign()}>
                        <Text style={styles.BtnLabel}>ذخیره امضا</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                                      onPress={() => this.resetSign()}>
                        <Text style={styles.BtnLabel}>پاک کردن</Text>
                    </TouchableOpacity>
                </View>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        );
    }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _Save(result) {
        this.dropdown.alertWithType('success', '', "باموفقیت ذخیره شد");
        // console.log('base64: '+result.encoded);
        this.setState({sign: result.encoded});
        this.forceUpdate();
        console.warn('sign is: ' + this.state.sign)
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: AppColorRed,
        margin: 10,
        borderRadius: 2
    },
    BtnLabel: {
        color: '#fff',
        fontFamily: 'BYekan'
    }
});