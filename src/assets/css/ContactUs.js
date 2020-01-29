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
    ButtomNav:
        {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%'
        },
    RenderAllFilesContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    DetailsText: {
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10
    },
    ChatText: {
        color: '#fefefe',
        fontFamily: 'BYekan',
        // textAlign:'right'

    },
    ChtaTextContainer: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        // width:'aspectRatio',
        // maxWidth:'100%',
        backgroundColor: AppColorGrey,
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,


    },
    BottomSegment: {
        marginBottom:2,
        // bottom:50,
        flexDirection: 'row-reverse',
        width: '98%',
        alignSelf:'center',
        alignItems: 'center',
        justifyContent:'space-between',
        borderRadius:3,
        height: 60,
        // backgroundColor:'gold'
    },
    Input: {
        paddingHorizontal:10,
        textAlign: 'right',
        color: '#000',
        fontFamily: 'BYekan',
        width: '84%',
        borderWidth: 2,
        height:'100%',
        borderColor: AppColorGrey,
        backgroundColor:'#eee'

    },
    SendBtn: {
        backgroundColor: AppColorRed,
        borderWidth: 1.5,
        borderColor: '#333',
        width: '15.6%',
        borderRadius:3,
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
    }


});