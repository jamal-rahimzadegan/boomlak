import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    TextInput,
    ScrollView,
    ImageBackground
} from 'react-native';

import styles from "../../assets/css/ChatScreen";
import DropdownAlert from 'react-native-dropdownalert';
import Styles, {AppColorGrey, AppColorRed} from "../../assets/css/Styles";
import {Connect} from "../../core/Connect";
import URLS from "../../core/URLS";
import ListEmpty from "./ListEmpty";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header";


export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Chats: [],
            Empty: false,
            Loading: false,
            Count: false
        };
        this.message = '';
    }

    componentDidMount() {
        setInterval(() => {
            this._GetTickets(this.props.navigation.getParam('id'));
        }, 20000)
    }

    componentWillMount() {
        this._GetTickets(this.props.navigation.getParam('id'));
        this.props.navigation.addListener("willFocus", payload => {
                AsyncStorage.getItem('id').then((id) => {
                        this.setState({
                                ID: id
                                // ID: id
                            }, () => null
                        );
                    }
                );
            }
        );
    }

    render() {
        return (
            <ImageBackground source={require('./../../assets/Images/ChatBack.jpg')} style={styles.MainView}>
                <Header navigation={this.props.navigation} PageTitle={'گفتگو با صاحب آگهی'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                            style={{flex: 1, width: '100%'}}
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                if (this.state.Count == true) {
                                    // alert('scrool')
                                    this.scrollView.scrollToEnd({animated: false});
                                    setTimeout(() => {
                                        this.setState({Count: false})
                                    }, 1000)
                                }
                            }}>
                    <FlatList
                        renderItem={(item) => <RenderChat
                            item={item}
                            _ID={this.state.ID}
                        />}
                        showsVerticalScrollIndicator={false}
                        data={this.state.Chats}
                        keyExtractor={(index, item) => index.toString()}
                        ListEmptyComponent={() => <ListEmpty
                            EmptyText={this.Empty}
                            BgColor={'transparent'}/>}
                    />
                </ScrollView>
                <View style={styles.BottomSegment}>
                    <TouchableOpacity style={styles.SendBtn}
                                      onPress={() => this._SendTicket(this.props.navigation.getParam('id'))}>
                        <Icon name={'md-send'} color={AppColorRed}
                              style={{display: !this.state.Loading ? 'flex' : 'none'}}
                              size={35}/>
                        <ActivityIndicator color={AppColorRed} size={27}
                                           display={this.state.Loading ? 'flex' : 'none'}/>
                    </TouchableOpacity>
                    <TextInput
                        ref={input => this.textInput = input}
                        value={this.message}
                        underlineColorAndroid={"transparent"}
                        multiline={true}
                        style={styles.Input}
                        onChangeText={(message) => {
                            this.message = message;
                            this.forceUpdate()
                        }}
                    />
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} closeInterval={4000}
                               containerStyle={{backgroundColor: "red"}}
                               titleStyle={Styles.DropDownStyle} messageStyle={Styles.DropDownStyle}/>
            </ImageBackground>
        )
    }

    //---------------------Send ticket --------------------------------------------------------------------------------------
    _SendTicket(ID) {
        // console.warn(ID+' - '+this.message+' - '+this.state.ID+' - '+this.props.navigation.getParam('typeChat'))
        if (this.message !== '') {
            this.setState({Loading: true});
            Connect.SendPRequest(URLS.Link() + "sendticket", {
                fileId: parseInt(ID),
                content: this.message,
                userId: this.state.ID,
                // type: 'file'
                type: this.props.navigation.getParam('typeChat')
            }).then(res => {
                // console.warn('Sendticket: ');
                console.log(res);
                if (res.result) {
                    this.textInput.clear();
                    this._GetTickets(ID);
                    this.setState({Loading: false, Count: true, message: ''}, () => this.forceUpdate());
                } else {
                    this.setState({Loading: false});
                }
            });
        }
    }

//---------------------Get ticket --------------------------------------------------------------------------------------
    _GetTickets(ID) {
        // console.warn('File ID: '+ID)
        this.setState({Empty: true});
        Connect.SendPRequest(URLS.Link() + "mytickets", {
            fileId: parseInt(ID),
            type: this.props.navigation.getParam('typeChat')
        }).then(res => {
            console.log('GetTickets: ');
            console.log(res);
            if (res) {
                this.setState({Chats: res.data, Empty: false,});
            } else {
                this.setState({Empty: true});
            }
        });
    }
}

//---------------------RenderChat--------------------------------------------------------------------------------------
class RenderChat extends React.Component {
    render() {
        let item = this.props.item.item;
        // let d = (new Date(parseInt(item.time)*1000))
        // let time = d.getHours()+':'+d.getMinutes();
        // console.warn('time: '+time)
        return (
            <Text style={[styles.ChatText, {
                backgroundColor: this.props._ID != item.senderId ? '#57606f' : '#303952',
                alignSelf: this.props._ID == item.senderId ? 'flex-end' : 'flex-start'
            }]} selectionColor={AppColorRed}  selectable={true}
            >{item.content}</Text>
        )
    }
}


