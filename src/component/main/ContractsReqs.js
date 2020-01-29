import React from 'react';
import {
    FlatList,
    View,
    AsyncStorage
} from 'react-native';
import styles from "../../assets/css/AdsList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RenderReserve from "../Flatlist/RenderReserve";
import RenderTransactionReqs from "../Flatlist/RenderTransactionReqs";

export default class ContractsReqs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Requests: [],
            Empty: false

        };
        this._GetReq = this._GetReq.bind(this)
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                this._GetReq(this.props.navigation.getParam('FileID'))
            }
        );
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'درخواست های معامله'}/>
                <FlatList
                    renderItem={(item) => <RenderTransactionReqs
                        item={item}
                        _GetReq={this._GetReq}
                        navigation={this.props.navigation}
                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Requests}
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


//---------------------Get Reserves -----------------------------------------------------------------------------------------
    _GetReq(id) {
        this.setState({Empty: true, Loading: true});
        Connect.SendPRequest(URLS.Link() + "reqbuy", {
            id: parseInt(id),
        }).then(res => {
            console.log('Contract Req: ');
            console.log(res);
            if (res) {
                this.setState({
                    Empty: false,
                    Requests: res.result
                });
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }
}




