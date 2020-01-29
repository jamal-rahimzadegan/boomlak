import React, {Component} from 'react';
import {
       View,
  StyleSheet
} from 'react-native';
import {AppColorRed} from "../../assets/css/Styles";


export default class Separator extends Component {

    render() {
        return (
            <View style={styles.Separator}/>
        )
    }

}
const styles = StyleSheet.create({
    Separator: {
        width: '97%',
        height: 2,
        backgroundColor:AppColorRed,
        opacity: .3,
        marginVertical:7,
        alignSelf:'center',
    }
})

