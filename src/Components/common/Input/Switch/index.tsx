import { View, StyleSheet, Switch } from 'react-native'
import AppText from '../../Text';

type IAppSwitch = {
    leftLabel?: string;
    rigthLabel?: string;
    value: boolean;
    onToggle: () => void;
}

const AppSwitch = ({leftLabel, rigthLabel, value, onToggle}: IAppSwitch) => {
  return (
    <View style={styles.switchContainer}>
        {leftLabel && <AppText font='bold' fontSize={value ? 12 : 15}>{leftLabel}</AppText>}
        <Switch 
            trackColor={{ false: "#7D24C2", true: "#DE2B6B" }}
            thumbColor={value ? "#7D24C2" : "#DE2B6B"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggle}
            value={value}
        />
        {rigthLabel && <AppText font='bold' fontSize={value ? 15 : 12}>{rigthLabel}</AppText>}
    </View>
  )
}

const styles = StyleSheet.create({
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AppSwitch