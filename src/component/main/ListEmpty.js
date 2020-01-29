import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';


export default class ListEmpty extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.EmptyListContainer, {backgroundColor: this.props.BgColor ? this.props.BgColor : 'white'}]}>
                <Text style={styles.Text}>{this.props.EmptyText}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    EmptyListContainer: {
        flex: 1,
        borderRadius: 4,
        width: '99%',
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center'
    },
    Text: {
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontFamily: 'BYekan',
        fontSize: 15
    }


});
