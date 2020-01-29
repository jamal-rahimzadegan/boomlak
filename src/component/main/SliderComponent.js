import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import {Pagination} from "react-native-snap-carousel";
import URLS from "../../core/URLS";
import FastImage from 'react-native-fast-image'
import {AppColorGrey, AppColorRed} from "../../assets/css/Styles";

const W = Dimensions.get("window").width;
export default class SliderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Carousel
                    data={this.props.Images === undefined ? [] : this.props.Images}
                    renderItem={this._renderItem}
                    sliderWidth={W}
                    itemWidth={W}
                    ref={(c) => this._carousel = c}
                    shouldOptimizeUpdates={true}
                    onSnapToItem={(index) => this.setState({activeSlide: index})}>
                </Carousel>
                <Pagination inactiveDotScale={.68}
                    inactiveDotColor={'#7f8fa6'}
                            containerStyle={{marginTop: -20,marginBottom:-35 }}
                            dotColor={AppColorRed} activeDotIndex={this.state.activeSlide}
                            dotStyle={{padding:4, borderRadius:150}}
                            dotsLength={this.props.Images ? this.props.Images.length : 0}/>
            </View>
        )
    }

    //---------------------Sliders/--------------------------------------------------------------------------------------
    _renderItem({item, index}) {
        // console.warn(item)
        return (
            <View>
                <FastImage source={{uri: item.link ? URLS.Media() + item.link : null}}
                           style={[styles.SliderImages, {display: item.link ? 'flex' : 'none'}]}/>
                <FastImage source={require('../../assets/Images/InteriorForDetails.jpg')}
                           style={[styles.SliderImages, {display: item.link ? 'none' : 'flex'}]}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    SliderImages: {
        width: '100%',
        height: 270,
        resizeMode: 'cover',
    }
});
