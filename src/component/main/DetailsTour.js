import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import styles from "../../assets/css/DetailsTour";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import SliderComponent from "./SliderComponent";

export default class DetailsTour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Details: [],
            Slider: [],
            Empty: false,
            message: '',
            Loading: false,
        };
    }

    componentWillMount() {
        this._GetTourDetails(this.props.navigation.getParam('id'));
    }

    render() {
        let Details = this.state.Details;
        let tDet = Details.tour;
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'جزئیات تور '+(Details.length !== 0 ? tDet.name : '')}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SliderComponent Images={this.state.Slider}/>
                    <Text style={styles.DetTextQ}>نام: <Text
                        style={styles.DetTextA}>{Details.length !== 0 ? tDet.name : '-'}</Text></Text>
                    <Text style={styles.DetTextQ}>آدرس: <Text
                        style={styles.DetTextA}>{Details.length !== 0 ? tDet.pName + '، ' + tDet.cName : '-'}</Text></Text>
                    <Text style={styles.DetTextQ}>توضیحات: <Text
                        style={styles.DetTextA}>{Details.length !== 0 ? tDet.desc : '-'}</Text></Text>
                    {/*--map---------------------------------------------------------*/}
                    <MapView
                        showsCompass={true}
                        followsUserLocation={true}
                        style={styles.map}
                        zoomControlEnabled={true}
                        region={{
                            latitude: Details.length !== 0 ? (Details.lat ? Number(Details.lat) : 0) : 32.4279,
                            longitude: Details.length !== 0 ? (Details.long ? Number(Details.long) : 0) : 53.6880,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker
                            coordinate={{
                                latitude: Details.length !== 0 ? (Details.lat ? Number(Details.lat) : 0) : 0,
                                longitude: Details.length !== 0 ? (Details.long ? Number(Details.long) : 0) : 0
                            }}
                            title={'موقعیت'}
                        />
                    </MapView>
                </ScrollView>
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


//---------------------Get Det --------------------------------------------------------------------------------------
    _GetTourDetails(ID) {
        // console.warn('tour ID: ' + ID)
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "tourism", {id: parseInt(ID)})
            .then(res => {
                console.warn('tourism Details: ');
                console.warn(res);
                if (res) {
                    this.setState({
                        Details: res,
                        Slider: res.image,
                        Empty: false,
                    });
                } else {
                    this.setState({Empty: true});
                }
            });
    }
}



