import {TextStyle, ViewStyle} from 'react-native'

type IFont = 'normal' | 'medium' | 'bold' | 'bolder';

export type IAppTextProps = {
  children: string;
  font?: IFont;
  fontSize?: number;
  color?: string;
  onPress?: () => void;
  transparent?: boolean;
  style?: TextStyle;
  maxLines?: number
};

export type IGradientTextProps = {
  children: string;
  colors?: string[];
  style?: ViewStyle;
  font?: IFont;
  fontSize?: number;
  onPress?: () => void;
  start?: {
    x: number;
    y: number;
  },
  end?: {
    x: number;
    y: number;
  }
};
