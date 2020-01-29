import React from 'react';
import {
    FlatList,
    View,
    AsyncStorage,
} from 'react-native';
import styles from "../../assets/css/AdsList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RenderReserve from "../Flatlist/RenderReserve";

export default class RoomReserve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Reserves: [],
            Empty: false,
            Loading: false,
        };
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                this._RoomReseves(this.props.navigation.getParam('RoomID'));

            }
        );
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'رزروهای اتاق'}/>
                <FlatList
                    renderItem={(item) => <RenderReserve
                        item={item}
                        All={0}

                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Reserves}
                    keyExtractor={(index, item) => index.toString()}
                    ListEmptyComponent={() => <ListEmpty
                        EmptyText={this.state.Empty ? 'در حال دریافت اطلاعات...' : 'موردی وجود ندارد'}
                        BgColor={'transparent'}/>}
                />
                <View style={styles.ButtomNav}>
                    <NavigationBar navigation={this.props.navigation}/>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </View>
        )
    }


//-------------------RoomReseves-----------------------------------------------------------------------------------------
    _RoomReseves(ID) {
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "allreserve", {
            id: parseInt(ID),
        }).then(res => {
            console.log('Room reserve: ');
            console.warn(res);
            if (res) {
                this.setState({
                    Reserves: res,

                });
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }
}




