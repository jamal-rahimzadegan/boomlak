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
    ReserveSelectText: {
        color: '#333',
        fontFamily: 'BYekan',
        textAlign: 'center'
    },
    ReserveBtnDate: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 4,
        marginRight: 10,
        marginVertical: 10,
        backgroundColor: '#eee',
        padding: 10,

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
        marginLeft: 12,
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
    PayText: {
        color: '#fff',
        fontFamily: 'BYekan'
    },
    PayBtn: {
        marginBottom:10,
        marginTop: 18,
        width: '50%',
        height: 40,
        borderRadius: 5,
        backgroundColor: AppColorRed,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ContractBtn:{
        width:'40%',
        height:40,
        borderRadius:3,
        backgroundColor:AppColorRed,
        alignSelf:'flex-end',
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    }


});