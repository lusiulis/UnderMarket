type IFont = 'normal' | 'medium' | 'bold' | 'bolder';

export type IAppTextProps = {
  children: string;
  font?: IFont;
  fontSize?: number;
  color?: string;
  onPress?: () => void;
  transparent?: boolean;
};

export type IGradientTextProps = {
  children: string;
  colors?: string[];
  style?: Object;
  font?: IFont;
  fontSize?: number;
  onPress?: () => void;
};
