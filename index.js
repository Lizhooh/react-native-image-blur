import React, { Component } from 'react';
import {
    View, StyleSheet,
    Image, findNodeHandle,
    InteractionManager
} from 'react-native';
import { BlurView } from 'react-native-blur';

export default class ImageBlur extends Component {

    static defaultProps = {
        imageStyle: {},
        contentStyle: {},

        // image source
        source: {},
        //
        // 模糊类型
        blurType: 'dark',
        // 模糊半径
        blurRadius: 8,
        // 下降因子
        downsampleFactor: null,
        // 模糊数量
        blurAmount: 10,
        // 滤镜颜色
        overlayColor: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            viewRef: null
        }
    }

    imageLoaded = e => {
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.setState({ viewRef: findNodeHandle(this._image) });
            }, 80);
        });
    }

    render() {
        const {
            imageStyle, contentStyle,
            source, blurType, blurRadius,
            overlayColor, downsampleFactor, blurAmount,
            children, ...rest,
        } = this.props;
        const { viewRef } = this.state;

        return (
            <View style={styles.container}>
                <Image
                    source={source}
                    style={imageStyle}
                    ref={r => this._image = r}
                    onLoadEnd={this.imageLoaded}
                    {...rest}
                />
                {viewRef &&
                    <BlurView
                        viewRef={viewRef}
                        style={styles.blurView}
                        blurRadius={blurRadius}
                        blurType={blurType}
                        downsampleFactor={downsampleFactor}
                        overlayColor={overlayColor}
                        blurAmount={blurAmount}
                    />
                }
                <View style={[styles.children, contentStyle]}>
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    blurView: {
        position: 'absolute',
        top: 0, left: 0,
        bottom: 0, right: 0,
    },
    children: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
    }
});