import {StyleSheet} from 'react-native';

export const CommonStyles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  baseShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
  },
  transparentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  transparentInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    borderRadius: 20,
  },
  mt_1 : {
    marginTop: 10
},
mb_1 : {
    marginBottom: 10
},
mt_2 : {
    marginTop: 20
},
pt_1 : {
    paddingTop: 10
},
pt_2 : {
    paddingTop: 20
},
pl_1 : {
    paddingLeft: 10
},
pAll: {
    padding: 10
},
baseText: {
    fontFamily: 'Montserrat'
}
});

export const AppColors = {
  turquoise: '#46D9B5',
  darkOcean: '#1D5771',
  calidPink: '#E28888',
  baseRed: '#B51F3A',
  grey: '#adb5bd',
  white: '#ffffff',
};

export const AppGradientsColors = {
    active: ['#DE2B6B', '#7D24C2'],
    base: ['#1D5771', '#2A8187', '#46D9B5'],
    cancel : ['#DE2B2B', '#5C0606']
}
