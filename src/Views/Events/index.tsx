import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { AppColors } from "../../Assets/Styles"
import AppText from "../../Components/Common/Text"
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from "../../Components/Snippets/ProfileIcon";
import { getAllEvents } from "../../Models/Event/event.model";
import { useCallback, useEffect, useRef, useState } from "react";
import { IEvent } from "../../Models/Event/event";
import { IShop, IShopLight } from "../../Models/Shop/shop";
import { getShopById } from "../../Models/Shop/shop.model";
import { Initializer } from "../../Utils";
import { IAppScreenProps } from "../../Components/Navigation/navigation";
import { useFocusEffect } from "@react-navigation/native";

const cardEvent = (event: IEvent) => {
    const defaultImage = 'https://st2.depositphotos.com/1001248/8319/v/450/depositphotos_83194622-stock-illustration-store-icon.jpg';

    const getDate = (value: string) => {
        const dateEnd = new Date(value).getDate().toString() + '/' + String(new Date(value).getMonth() + 1) + '/' + new Date(value).getFullYear().toString()
        return dateEnd;
    }

    return (
        <>
            <View style={styles.card}>
                <View style={[styles.row, { justifyContent: "flex-start", paddingLeft: 15, marginTop: 6 }]}>
                    <Image
                        style={styles.imageprofile}
                        source={{
                            uri: event.profileImage ? event.profileImage : defaultImage
                        }}
                    />
                    <AppText font='bold' style={{ textAlign: 'left', marginTop: 8, marginRight: 5 }} fontSize={15}>{event.name ? event.name : ''}</AppText>
                </View>

                <View style={styles.row}>
                    <View style={{ top: '4%' }}>
                        <Image
                            source={require('../../Assets/Icons/calendar.png')}
                        />

                    </View>
                    <View style={{ width: '75%' }}>
                        <AppText font='bold' style={{ textAlign: 'justify', marginTop: 10 }} fontSize={15}>{event.title}</AppText>
                        <AppText font='normal' style={{ textAlign: 'justify', marginTop: 7 }} fontSize={13}>{event.description}</AppText>
                    </View>
                </View>
                <AppText font='bold' style={{ textAlign: 'right', marginTop: 10, marginRight: 20 }} fontSize={13}>Válido hasta:  {getDate(event.dateEnd)}</AppText>
            </View>
        </>
    )
}

const EventView = ({ navigation }: IAppScreenProps) => {
    const [events, setEvents] = useState(new Array());
    const isMounted = useRef(false)

    const fetchData = useCallback(async () => {
        if (isMounted) {
            const eventRes = await getAllEvents();
            setEvents(eventRes)
        }
    }, []);

    useFocusEffect(() => {
        isMounted.current = true;
        fetchData();
        return () => { isMounted.current = false }
    });

    const selectedEvent = (card: IEvent) => {
        console.log(card)
        navigation.navigate('Shop', { id: card.shopId })
    }

    return (
        <LinearGradient colors={['#1D5771', '#2A8187', '#46D9B5']} style={styles.container}>
            <AppText font='bolder' style={{ textAlign: 'center', marginTop: 20 }} fontSize={24}>Próximos Eventos</AppText>
            <ScrollView style={{marginBottom: 60}} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    events.map((card, index) => (
                        <TouchableOpacity onPress={() => selectedEvent(card)} key={index}>
                            {
                                cardEvent(card)
                            }
                        </TouchableOpacity>
                    ))
                }
                {events.length == 0 &&
                    <View style={{ alignItems: 'center', marginTop: '80%' }}>
                        <AppText font='bold' style={{ textAlign: 'left', marginTop: 10 }} fontSize={15}>No hay próximos eventos</AppText>
                        <Image
                            style={{ marginTop: '10%' }}
                            source={require('../../Assets/Icons/calendar.png')}
                        />
                    </View>
                }
            </ScrollView>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        marginTop: 20
    },

    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '93%',
        height: 170,
        borderRadius: 20,
        marginVertical: 15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageprofile: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginRight: 6,
        top: 2
    }
});

export default EventView