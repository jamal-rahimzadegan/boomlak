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
    MainContainer: {
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
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    DetailsText: {
        textAlign: 'right',
        flexShrink: 1,
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10
    },
    AmlakSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '96%'
    },
    AdvSearch: {
        backgroundColor: '#eee',
        elevation: 8,
        marginBottom:10,
        width:'30%',
        height: 30,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 8,
    },
    AdvSearchText: {
        fontFamily: 'BYekan',
        color: '#333',
        fontSize: 13
    },


});