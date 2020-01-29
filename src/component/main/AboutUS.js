import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity, FlatList
} from 'react-native';
import styles from "../../assets/css/Rules";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorRed} from "../../assets/css/Styles";
import {Connect,} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import Icon from "react-native-vector-icons/AntDesign";

export default class AboutUS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Rules: '',
        };
    }

    componentWillMount() {
        this._AboutUs();
    }

    render() {
        return (
            <View style={[styles.MainView]}>
                <Header navigation={this.props.navigation} PageTitle={'درباره ما'}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={(c) => this.scroll = c}
                    style={[styles.MainView, {flexShrink: 1,}]}>
                    <Text style={styles.TitleText}>
                        {this.state.Rules}
                    </Text>
                </ScrollView>
                {/*<TouchableOpacity style={styles.GoUpBtn} onPress={() => this.scroll.scrollTo({x: 0, y: 0, animated: true})}>*/}
                {/*    <Icon name={'upcircleo'} color={'#fff'} size={50}/>*/}
                {/*</TouchableOpacity>*/}
                <NavigationBar navigation={this.props.navigation}/>
            </View>
        )
    }

    _AboutUs() {
        Connect.SendPRequest(URLS.Link() + "about", {})
            .then(res => {
                console.log('about us: ')
                console.log(res.result.text)
                if (res) {
                    this.setState({Rules: res.result.text});
                }
            });
    }

}




