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

export default class ReserveList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Reserves: [],
            resultInt: [],
            Empty: false,
            Loading: false,
            searchStr: ''
        };
        this._GetReserves = this._GetReserves.bind(this)
    }

    componentWillMount() {
        this.props.navigation.addListener("willFocus", payload => {
                AsyncStorage.getItem('id').then((id) => {
                        this.setState({
                                ID: id
                            }, () => {
                                this._GetReserves(id);
                                this.forceUpdate()
                            }
                        );
                    }
                );
            }
        );
    }

    render() {
        return (
            <View style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'رزروهای من'}/>
                <FlatList
                    renderItem={(item) => <RenderReserve
                        item={item}
                        All={1}
                        userId={this.state.ID}
                        currentTime={this.state.currentTime}
                        resultInt={this.state.resultInt}
                        navigation={this.props.navigation}
                        _GetReserves={this._GetReserves}
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


//---------------------Get Reserves -----------------------------------------------------------------------------------------
    _GetReserves(ID) {
        this.setState({Empty: true, Loading: true});
        Connect.SendPRequest(URLS.Link() + "myreserve", {
            userId: parseInt(ID),
        }).then(res => {
            console.log('my reserve: ');
            console.log(res);
            if (res) {
                this.setState({
                    Reserves: res.resultStr,
                    resultInt: res.resultInt,
                    Empty: false,
                    Loading: false,
                    currentTime: res.currentTime
                });
            } else {
                this.setState({Empty: true, Loading: false});
            }
        });
    }
}




