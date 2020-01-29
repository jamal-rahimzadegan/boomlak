import {Platform, StyleSheet} from 'react-native';
import {AppColorRed} from "./Styles";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    wrap: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        position: "relative",
        flexDirection: "row",
    },
    display: {
        borderRightWidth: 1,
        borderRightColor: "rgba(0, 0, 0, 0.2)",
        width: 32,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    },
    text: {
        fontSize: 32,
    },
    noBorder: {
        borderRightWidth: 0,
    },
    input: {
        position: "absolute",
        fontSize: 32,
        textAlign: "center",
        backgroundColor: "transparent",
        width: 32,
        top: 0,
        bottom: 0,
    },
    ConfirmationINP: {
        fontSize:18,
        fontFamily:'BYekan',
        height:50,
        color:AppColorRed,
        marginHorizontal: 10,
        textAlign: 'center',
        borderColor: AppColorRed,
        borderBottomWidth: 1,
        width: '10%'
    },
    shadows: {
        position: "absolute",
        left: -4,
        top: -4,
        bottom: -4,
        right: -4,
        borderColor: "rgba(58, 151, 212, 0.28)",
        borderWidth: 4,
    }
});
