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
    },
    DetTextQ:{
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10,
        marginVertical: 4
    },
    DetTextA:{
        fontFamily: 'BYekan',
        color:AppColorRed,
        fontSize:15,
        marginVertical:5,
        flexShrink: 1
    },
    map: {
        marginBottom: 70,
        flex: .2,
        // ...StyleSheet.absoluteFillObject,
        width: '96%',
        height: 230,
        alignSelf: 'center',
        marginVertical: 15,
    },





});