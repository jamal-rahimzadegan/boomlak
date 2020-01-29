import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Animated,
    Image,
    AsyncStorage,
    StatusBar,
    ImageBackground,
    Text
} from 'react-native';
import {AppColorGrey, AppColorRed} from "../../assets/css/Styles";


export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Version: true,
            host: '',
            opacity: new Animated.Value(0)
        };
        this._LoginCheck();
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/Images/SplashBack.jpg')}
                             style={styles.EnterMobileContainer}>
                <StatusBar hidden={true} backgroundColor={'transparent'} barStyle="light-content"/>
                <Animated.View style={{opacity: this.state.opacity}}>
                    <Image source={require('../../assets/Images/Logo.png')}
                           style={styles.LogoImg}/>
                </Animated.View>
                <Text style={styles.Title}>B O O M L A K</Text>
            </ImageBackground>
        );
    }


    //------------------Checking Version -------------------------------------------------------------------------------
    _LoginCheck() {
        AsyncStorage.multiGet(['idpro', 'idcity']).then((key) => {
            // console.warn('idpro: ' + key[0][1])
            // console.warn('province: ' + key[1][1])
            if (key[0][1] == null || key[1][1] == null) {
                AsyncStorage.multiSet([['idpro', '8'], ['idcity', '117']]);
                // console.warn('province changed')
            }
        });

        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.opacity, {
                    toValue: 1,
                    duration: 500,
                }),
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 500,
                })
            ]),
        ).start();
        setTimeout(() => {
            this.props.navigation.replace('AmlakList')
        }, 2000)
    }
}


const styles = StyleSheet.create({
    EnterMobileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: AppColorRed,
        // justifyContent:'center',
        ...Platform.select({
            ios: {
                paddingTop: 25
            }
        })
    },
    LogoImg: {
        marginTop: -125,
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 200,
        width: 200
    },
    Title: {
        elevation: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    }

});


