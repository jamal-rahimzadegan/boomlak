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
import RenderMyTransaction from "../Flatlist/RenderMyTransaction";

export default class MyTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            provinceId: '',
            Requests: [],
            Empty: false,
            message: '',
            Loading: false,
            searchStr: '',
        };
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                let All = this.props.navigation.getParam('All');
                AsyncStorage.multiGet(['id', 'idpro','idcity']).then((keys) => {
                    this.setState({
                        ID: keys[0][1],
                        ProvinceID: keys[1][1]
                    }, () => {
                        this._GetRequests(keys[0][1], All,keys[2][1]);
                        this.forceUpdate()
                    })
                })

            }
        );
    }

    render() {
        let All = this.props.navigation.getParam('All');
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'معاملات من'}/>
                <FlatList
                    renderItem={(item) => <RenderMyTransaction
                        item={item}
                        navigation={this.props.navigation}
                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Requests}
                    keyExtractor={(item, index) => index}
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


//--------------------_GetRequests -----------------------------------------------------------------------------------------
    _GetRequests(ID, ) {
        this.setState({Empty: true});
        // console.log('str: '+this.state.searchStr)
        Connect.SendPRequest(URLS.Link() + "buylist", {
            userId: parseInt(ID),
        }).then(res => {
            console.log('Requests: ');
            console.warn(res);
            if (res) {
                this.setState({Requests: res.result, Empty: false, Loading: false});
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }

}




