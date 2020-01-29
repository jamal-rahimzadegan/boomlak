import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";


export default styles = StyleSheet.create({
    MainView: {
        flex: 1,
        // width: "100%",
        // height: Dimensions.get("window").height,
        backgroundColor: "#ffffff",
    },
    SearchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: 10,
        width: '40%',
        height: 40,
        backgroundColor: AppColorRed,
        alignSelf: 'center',
        margin: 10,
    },
    BtnContainer: {
        borderRadius: 5,
        // borderColor: '#333',
        // borderWidth: 1.8,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '94%',
        ...Platform.select({
            ios: {
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: 'red',
                shadowOffset: {height: 0, width: 0},
            },
            android: {
                elevation: 6,
            }
        }),
        alignSelf: 'center',
        marginVertical: 8,
        backgroundColor: '#eee'

    },
    OverallText: {
        textAlign: 'right',
        // alignSelf:'flex-end',
        // flexWrap:'wrap',
        flexShrink: 1,
        color: '#333',
        fontFamily: 'BYekan',
        marginRight: 10
    },
    SearchBtnText: {
        fontFamily: 'BYekan',
        color: '#fff',

    },
    FilterContainer: {
        // paddingHorizontal:5,
        marginTop: 20,
        width: '94%',
        alignSelf: 'center'
    },
    EachFilterContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
    },
    INPS: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: 'red',
                shadowOffset: {height: 0, width: 0},
            },
            android: {
                elevation: 4,
            }
        }),
        width: '98%',
        marginHorizontal: 3,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexShrink: 1,
        color: '#000',
        fontFamily: 'BYekan',
        textAlign: 'right',
        marginVertical: 10,
        backgroundColor: '#eee'
    },

});