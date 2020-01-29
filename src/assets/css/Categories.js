import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";



export default styles = StyleSheet.create({
    MainView: {
        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#ffffff",

    }, MainContainer: {
        flex: .9
    },

    BtnContainer: {
        elevation:6,
        marginHorizontal: 10,
        marginVertical: 8,
        paddingVertical:14,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        backgroundColor: '#eee',
        borderRadius: 3,
        padding: 8

    },
    TitleText: {
        // alignSelf:'flex-end',
        // flexWrap:'wrap',
        flexShrink: 1,
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10,
        fontSize: 17
    },

    ButtomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    notTime: {
        padding: 5,
        fontFamily: 'BYekan',
        color: AppColorRed,
        fontSize: 12,
        textAlign: 'right',
        alignSelf:'flex-end'
    },
    notBody: {
        lineHeight: 27,
        fontFamily: 'BYekan',
        color: '#333',
        fontSize: 15,
        flexShrink: 1,
        textAlign: 'right',
        padding: 3
    },
    CategoryLogo:{
        opacity:.3,
        alignSelf:'center',
        width:'100%',
        height:260,
        marginTop:20,
        marginBottom:0,
        // backgroundColor:'red',
        resizeMode:'contain'
    }

});