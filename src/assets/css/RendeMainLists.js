import {StyleSheet, Dimensions, Platform} from 'react-native';
import {AppColorGrey, AppColorRed} from "./Styles";


export default styles = StyleSheet.create({
    TourismListContainer: {
        margin: 7,
        justifyContent:'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        overflow: 'hidden',

    },
    DetailsText: {
        color: '#333',
        fontFamily: 'BYekan',
        flexShrink: 1,
        textAlign: 'right',
        marginVertical: 3,
        // backgroundColor: 'lime'

    },

    BottomSeg: {
        padding: 7,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor:'red'
    },
    NotPaid: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        backgroundColor: AppColorRed,
        justifyContent: 'center',
        borderRadius: 2,
        padding: 1.5
    },
    EditBtn: {
        flexDirection: 'row',
        width: '24%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ContractBtnContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '98%',
        height: 35,
        alignItems: 'center',
        marginVertical: 7
    },
    ContractBtn: {
        backgroundColor: AppColorRed,
        width: '35%',
        height: '100%',
        // textAlign:'center',
        paddingHorizontal: 5,
        borderRadius: 7,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    EachRow: {

        flex: 1,
        width: '94%',
        elevation: 6,
        backgroundColor: '#eee',
        alignSelf: 'center',
        marginVertical: 8,
        borderRadius: 3
    },

    ReserveContainer: {
        elevation: 8, margin: 12, padding: 10, backgroundColor: '#eee'
    }
});