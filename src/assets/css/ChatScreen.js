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
    ButtomNav: {
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
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:5,
        margin:10,
        color: '#fff',
        fontFamily: 'BYekan',
    },
    ChtaTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: AppColorGrey,
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    BottomSegment: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#d1ccc0',
    },
    Input: {
        textAlign: 'right',
        color: '#222',
        fontFamily: 'BYekan',
        width: '85%',
    },
    SendBtn: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});