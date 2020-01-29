import React from 'react';
import {
    TextInput,
    View,
    BackHandler,
    TouchableOpacity,
    Text, WebView,
} from 'react-native';
import styles from "../../assets/css/Rules";
import DropdownAlert from 'react-native-dropdownalert';
import Styles from "../../assets/css/Styles";
import {Connect,} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import {NavigationActions, StackActions} from "react-navigation";


export default class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Rules: '',
        };
    }

    componentWillMount() {
        this._GetRules();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({
                        routeName: "AmlakList",
                        params: {resetOrder: 0}
                    })
                ],
            });
            this.props.navigation.dispatch(resetAction);
            return true;
        });
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'قوانین استفاده از برنامه'}/>
                <View style={[styles.MainView,{flexShrink:1}]}>
                    <Text style={styles.TitleText}>
                        {this.state.Rules}
                    </Text>
                </View>
                <NavigationBar navigation={this.props.navigation}/>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={5000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }

    _GetRules() {
        Connect.SendPRequest(URLS.Link() + "rulesite", {})
            .then(res => {
                console.log('Contract rules: ')
                console.warn(res.result.text)
                if (res) {
                    this.setState({Rules: res.result.text});
                }
            });
    }

}




