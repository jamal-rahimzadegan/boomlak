import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";



export default styles = StyleSheet.create({
    LoginContainer: {
        ...Platform.select({
            ios: {
                paddingTop: 25
            }
        }),
        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#fff",
        zIndex: 1
    },
    Inputs: {
        elevation:8,
        backgroundColor:'#eee',
        borderRadius: 3,
        height: 50,
        width: '80%',
        marginVertical:25,
        paddingHorizontal: 15
    },
    InputCode: {
        borderRadius: 2,
        borderColor: '#555',
        borderWidth: 1.5,
        height: 50,
        width: '80%',
        paddingHorizontal: 15
    },

    ConfirmBtn: {
        backgroundColor: AppColorRed,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 75,
        height: 40,
        width:'52%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,

    },
    ConfirmTxt: {
        fontFamily: 'BYekan',
        color: '#fff',
        fontSize: 18
    },
    LoginTexts: {
        marginVertical: 5,
        fontFamily: 'BYekan',
        color: '#999',
        fontSize: 15
    },
    SentCodeMesage: {
        padding: 10,
        borderRadius: 4,
        width: '95%',
        backgroundColor: 'grey',
        marginTop: 10,
        marginBottom:60,
        alignSelf: 'center',
    },
    SingupEachInp: {
        backgroundColor: '#eee',
        borderRadius: 3,
        fontFamily: 'BYekan',
        color: '#666',
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        width: '90%',
        paddingHorizontal: 15,
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
    },
    SignupInputs: {
        width: '100%',
        textAlign: 'right'
    },
    SelectProBtn: {
        backgroundColor: '#eee',
        borderRadius: 3,
        fontFamily: 'BYekan',
        color: '#666',
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginVertical: 10,
        width: '90%',
        height: 50,
        paddingHorizontal: 15,
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
    },
    SelectProText: {
        color: '#666',
        fontSize: 15,
        marginVertical: 10,
        fontFamily: 'BYekan'
    },
    CityProText: {
        paddingVertical: 10,
        fontFamily: 'BYekan',
        textAlign: 'center',
    },
    TitleText: {

        marginRight: 15,
        padding: 5,
        fontFamily: 'BYekan',
        textAlign: 'right',
        color: '#333',
        alignSelf: 'flex-end'
    },

});
