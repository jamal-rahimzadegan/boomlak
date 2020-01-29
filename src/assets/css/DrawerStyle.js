import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorRed} from "./Styles";

const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;

export default styles = StyleSheet.create({
    DrawerContainer: {
        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#2e3131",
    },
    DrawerRowsContainer: {
        paddingHorizontal: 10
    },
    MyDashboard: {
        marginVertical: 5,
        textAlign: 'right',
        padding: 7,
        fontSize: 20,
        color: '#fefefe',
        fontFamily: 'BYekan',
        paddingHorizontal: 7
    },

    DrawerBtnText: {
        fontFamily: 'BYekan',
        color: '#fefefe',
        fontSize: 16,
    },
    EachButton: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        borderBottomWidth: 1,
        borderColor: '#fefefe',
        paddingVertical: 13
        // justifyContent:'space-between'
    },
    SettingBtn: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 6,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginBtn: {
        marginVertical: 4,
        padding: 3,
        width: 110,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        backgroundColor: AppColorRed,
        textAlign: 'center',
        fontFamily: 'BYekan',
        color: '#fefefe',
        fontSize: 15,
    },
});