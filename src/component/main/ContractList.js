import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
} from 'react-native';
import styles from "../../assets/css/AdsList";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import NavigationBar from "./NavigationBar";
import ListEmpty from "./ListEmpty";
import Header from "./Header";
import RenderContractList from "../Flatlist/RenderContractList";

export default class ContractList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            provinceId: '',
            Ads: [],
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
                        this._GetAds(keys[0][1], All,keys[2][1]);
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
                <Header navigation={this.props.navigation} PageTitle={ 'لیست قراردادها'}/>
                <FlatList
                    renderItem={(item) => <RenderContractList
                        item={item}
                        navigation={this.props.navigation}
                    />}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Ads}
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


//---------------------Get ads -----------------------------------------------------------------------------------------
    _GetAds(ID, All,cityId) {
        this.setState({Empty: true});
        // console.log('str: '+this.state.searchStr)
        Connect.SendPRequest(URLS.Link() + "mycontract", {
            userId: parseInt(ID),
        }).then(res => {
            console.log('All Contracts: ');
            console.log(res);
            if (res) {
                this.setState({Ads: res.conej.concat(res.con), Empty: false, Loading: false});
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }
}




