import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import styles from "../../assets/css/Rules";
import {Connect,} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            About: '',
        };
    }

    componentWillMount() {
        this._AboutUs();
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'ارتباط با ما'}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.MainView,{flexShrink:1}]}>
                    <Text style={styles.TitleText}>
                        {this.state.About}
                    </Text>
                </ScrollView>
                <NavigationBar navigation={this.props.navigation}/>
            </View>
        )
    }

    _AboutUs() {
        Connect.SendPRequest(URLS.Link() + "contact", {})
            .then(res => {
                console.log('contact us: ')
                console.log(res.result.text)
                if (res) {
                    this.setState({About: res.result.text});
                }
            });
    }

}




