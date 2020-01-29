import {Dimensions, Platform, StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    IntroCityTourismContainer:{

        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: "#ffffff",
    },
    EachRowIntro:{
        alignItems:'center',
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between'

    },
    IntroCityInp:{
        color:'#666',
        fontFamily:'BYekan',
        width: '75%'
    },
    SelectBtn:{
        width:'75%',
        borderBottomWidth:1,
        borderColor:'#666'
    },
IntroText:{
    fontFamily:'BYekan',
    color:'#666',

}
});