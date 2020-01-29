import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text, Image, Dimensions, AsyncStorage, Alert,
} from 'react-native';
import styles from "../../assets/css/Categories";

import {Connect, Media, MediaSmall, Slider} from "../../core/Connect";
import URLS from "../../core/URLS";
import FastImage from 'react-native-fast-image'

import Separator from "../main/Separator";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;


export default class RenderCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Files: [],
            Empty: false
        };
    }


    render() {
        let item = this.props.item.item;
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {id: item.id})}
                                  style={styles.RenderAllFilesContainer}>
                    <FastImage source={require('./../../assets/Images/house.png')}
                               style={{
                                   display: item.link == null ? 'flex' : 'none',
                                   width: 90,
                                   height: 90,
                                   borderRadius: 3
                               }}/>
                    <FastImage source={{uri: item.link ? URLS.Media() + item.link : null}}
                               borderRadius={7}
                               style={{
                                   display: item.link !== null ? 'flex' : 'none',
                                   width: 100,
                                   height: 100,
                                   borderRadius: 3
                               }}/>
                    <View style={{flexShrink: 1}}>
                        <Text style={styles.DetailsText}>{item.name}</Text>
                        {/*<Text style={styles.DetailsText}>استان: {item.province} </Text>*/}
                        {/*<Text style={styles.DetailsText}>شهر: {item.city} </Text>*/}
                        <Text style={styles.DetailsText} numberOfLines={3}>توضیحات: {item.desc} </Text>
                    </View>
                </TouchableOpacity>
                <Separator/>
            </View>

        )
    }


}


