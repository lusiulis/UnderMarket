import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

const size = 40

export function PowerOff({ ...rest }) {
  return (
    <View style={{ width: size }} {...rest}>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: size }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="power"
              size={size}
              color="white"
              style={styles.shadow}
            />
          </View>
        }>
        <LinearGradient
          colors={['#F7C650', 'rgba(247, 198, 80, 0.71)']}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
})