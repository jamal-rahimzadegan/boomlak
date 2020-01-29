import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import styles from "../../assets/css/Categories";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import {NavigationActions, StackActions} from "react-navigation";


export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'دسته بندی ها'}/>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this._Navigate('AmlakList')} style={styles.BtnContainer}>
                    <Text style={styles.TitleText}>املاک</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._Navigate('TourList')}
                                  style={styles.BtnContainer}>
                    <Text style={styles.TitleText}>گردشگری ها</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._Navigate('RoomList')}
                                  style={styles.BtnContainer}>
                    <Text style={styles.TitleText}>اتاق ها</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._Navigate('AdsList')} style={styles.BtnContainer}>
                    <Text style={styles.TitleText}>آگهی ها</Text>
                </TouchableOpacity>
                <Image source={require('../../assets/Images/Category.jpg')}
                       style={styles.CategoryLogo}/>
                </View>
                <NavigationBar navigation={this.props.navigation}/>
            </View>
        )
    }
    //-------Navigate to my pages------------------------------------------------
    _Navigate(route) {
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
        setTimeout(() => {
            this.props.navigation.navigate(route, {
                All: undefined
            })
        }, 1)
    }
}


