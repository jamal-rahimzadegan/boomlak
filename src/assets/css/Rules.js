import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";


export default styles = StyleSheet.create({
    MainView: {
        flex: 1,
        width: "100%",
        backgroundColor: "#ffffff",

    },
    BtnContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        backgroundColor:AppColorGrey,
        borderRadius:3,
        padding:8

    },
    TitleText: {
        ...Platform.select({
            ios:{
                textAlign:'justify'
            },
            android:{
                textAlign:'right'
            }
        }),
        padding:5,
        // alignSelf:'flex-end',
        // flexWrap:'wrap',
        flexShrink: 1,
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10,
        fontSize:17
    },

    ConfirmRulesBtn:{
        margin:20,
        borderRadius:3,
        padding:10,
        width:'50%',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:AppColorRed
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
    GoUpBtn:{
        backgroundColor:AppColorRed,
        height: 50,width:50,
        borderRadius:150,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        right:8,
        bottom:75
    }

});