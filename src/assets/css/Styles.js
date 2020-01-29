import {Platform, StyleSheet} from 'react-native';
export const AppColorRed = '#b71540';
export const AppColorGrey = '#eee';
export const PickerBg = [242, 38, 0, .2];
export const PickerToolBarBg = [183, 21, 64, 1];
export const PickerTitleColor = [255, 255, 255, 1];
export const PickerConfirmBtnColor = [255, 255, 255, 1];
export const PickerCancelBtnColor = [255, 255, 255, 1];
export const PickerFontColor = [0, 0, 0, 1];
export default Styles = StyleSheet.create({
    DropDownStyle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'BYekan'
    },
    ButtomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    SearchBar: {
        paddingHorizontal: 5,
        width: '97%',
        alignSelf: 'center',
        backgroundColor:AppColorGrey,
        borderRadius: 200,
        height: 40,
        marginTop: 12,
        marginBottom: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        ...Platform.select({
            ios: {
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: 'red',
                shadowOffset: {height: 0, width: 0},
            },
            android: {
                elevation: 8,
            }
        }),

    },
    SearchInput: {
        fontFamily: 'BYekan',
        color: '#353b48',
        textAlign: 'right',
        width: '90%',
    },
    SearchInput2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        fontFamily: 'BYekan',
        color: '#333',
        width: '48%',
        borderRadius: 3,
        textAlign: 'center'
    },

});
