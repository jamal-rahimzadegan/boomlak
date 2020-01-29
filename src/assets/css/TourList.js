import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    MainView: {
        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#ffffff",

    },
    ListText: {
        color: '#333',
        fontFamily: 'BYekan',
        marginRight:10,
        flexShrink:1
        // textAlign:'right'

    },
    TourismListContainer:{
        margin:7,
        flexDirection:'row-reverse',
        alignItems:'center'
    }





});