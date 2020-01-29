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

    AddTourContainer: {
        width: '94%',
        alignSelf: 'center',
        margin: 8
    },
    SelectProBtn: {
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 3,
        padding: 6,
        width: '100%',
        // margin: 5,
        alignSelf: 'flex-end'
    },
    TitleText: {
        marginVertical: 5,
        color: '#333',
        fontFamily: 'BYekan'
    },
    AddBtn: {
        width: '94%',
        backgroundColor: AppColorRed,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 3,
        height: 50,
        alignSelf:'center',
        margin:20
    },
    map: {
        // backgroundColor:'lime',
        // flex: .2,
        // ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 230,
        alignSelf: 'center',
        marginVertical: 25,
    },

    PhotoAddBtn:{
        alignItems:'center',
        justifyContent:'center',
        width:'31%',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius:4,
        height:100
    }
});