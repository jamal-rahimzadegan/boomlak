import React from 'react';
import {
    TextInput,
    View,
    Button
} from 'react-native';
import styles from "../../assets/css/CodeConfirmation";

export var InpCode = '';
export default class CodeConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            backward: null,
            text1: '',
            text2: '',
            text3: '',
            text4: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={(input) => this.firstTextInput = input}
                    onKeyPress={(e) => this._HandleDel(e, 1)}
                    maxLength={1}
                    keyboardType={"number-pad"}
                    onChangeText={(x) => this._Complete(x, 1)}
                    style={styles.ConfirmationINP}
                />
                <TextInput
                    onKeyPress={(e) => this._HandleDel(e, 2)}
                    ref={(input) => this.secondTextInput = input}
                    maxLength={1}
                    keyboardType={"number-pad"}
                    onChangeText={(x) => this._Complete(x, 2)}
                    style={styles.ConfirmationINP}
                />
                <TextInput
                    onKeyPress={(e) => this._HandleDel(e, 3)}
                    ref={(input) => this.thirdTextInput = input}
                    maxLength={1}
                    keyboardType={"number-pad"}
                    onChangeText={(x) => this._Complete(x, 3)}
                    style={styles.ConfirmationINP}
                />
                <TextInput
                    onKeyPress={(e) => this._HandleDel(e, 4)}
                    ref={(input) => this.fourthTextInput = input}
                    onChangeText={(x) => this._Complete(x, 4)}
                    maxLength={1}
                    keyboardType={"number-pad"}
                    style={styles.ConfirmationINP}
                />
                {/*<Button title={'sum'}*/}
                {/*        onPress={() => console.warn('code is: ' + (this.state.text1 + this.state.text2 + this.state.text3 + this.state.text4))}/>*/}
            </View>

        )
    }

    _Complete(x, y) {
        if (y == 1) {
            this.setState({text1: x}, () => this.forceUpdate())
            if (x !== '') {
                this.secondTextInput.focus();
            }
        } else if (y == 2) {
            this.setState({text2: x}, () => this.forceUpdate())
            if (x !== '') {
                this.thirdTextInput.focus();
            }
        } else if (y == 3) {
            this.setState({text3: x}, () => this.forceUpdate())
            if (x !== '') {
                this.fourthTextInput.focus();
            }
        } else if (y == 4) {
            this.setState({text4: x}, () => this.forceUpdate())
        }
        setTimeout(() => {
            this.forceUpdate()
            InpCode = this.state.text1 + this.state.text2 + this.state.text3 + this.state.text4
            // console.warn(InpCode)
        }, 100)
    }


    _HandleDel(e, y) {
        if (e.nativeEvent.key === "Backspace") {
            if (y == 4) {
                this.thirdTextInput.focus();
            } else if (y == 3) {
                this.secondTextInput.focus();
            } else if (y == 2) {
                this.firstTextInput.focus();
            } else if (y == 1) {
            }
        }
    };
}



