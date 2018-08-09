import * as React from 'react';
import * as ReactNative from 'react-native';

interface IImageBlur {
    imageStyle: ReactNative.ImageStyle,
    contentStyle: ReactNative.ViewStyle,
    source: ReactNative.ImageSourcePropType,
    blurType: 'xlight' | 'light' | 'dark',
    blurRadius: number,
    // android only
    downsampleFactor: number | null,
    // android only
    blurAmount: number,
    // android only
    overlayColor: string,
}


export default class ImageBlur extends React.Component<IImageBlur> {
    play(): void;
    pause(): void;
    seek(time: number): void;
    replay(): void;
}