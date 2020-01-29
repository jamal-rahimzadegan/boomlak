import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorRed} from "./Styles";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    MainView: {

        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#ffffff",

    },
    DetailsTextQ: {
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10,
        marginVertical: 4
    },
    DetailsTextA: {
        color: AppColorRed,
        fontFamily: 'BYekan',
        marginRight: 10,
        marginVertical: 4
    },
    ChatBtn: {
        position: 'absolute',
        bottom: 60,
        left: 10,
        width: 50,
        height: 50,
        borderRadius: 200,
        backgroundColor: AppColorRed,
        alignItems: 'center',
        justifyContent: 'center'
    },
    MarkedBtn: {
// margin:5,
        marginLeft:12,
        // marginTop:5,
        alignItems: 'center',
        justifyContent: 'center'
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