import React, {Component} from 'react';
import {
    View,
    StatusBar,
    Platform,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {AppColorRed} from "../../assets/css/Styles";


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        };
    }

    render() {
        return (
            <View style={styles.RedBarContainer}>
                <StatusBar  backgroundColor={AppColorRed} barStyle="light-content" />
                <View style={styles.AllContainer}>
                    <View style={[styles.TextContainer]}>
                        <Text style={styles.TitleStyle}>  {this.props.PageTitle}  </Text>
                        <Image source={require('../../assets/Images/TopLogo.png')}
                               style={{resizeMode: 'contain', width: 40, margin: 5, height: 40}}/>
                    </View>
                    <TouchableOpacity style={{marginLeft: 15}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name={"ios-arrow-back"} color={"#fff"} size={30}/>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    RedBarContainer: {
        justifyContent: 'center',
        backgroundColor: AppColorRed,
        ...Platform.select({
            ios: {
                paddingTop: 25
            }
        }),
    },
    AllContainer: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'flex-start'
    }
    ,
    TextContainer: {
        flexShrink: 1,
        width: '96%',
        height: 42,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    TitleStyle: {
        marginVertical: 1,
        flexShrink: 1,
        color: '#fff',
        fontFamily: 'BYekan',
        fontSize: 16,
    }
})