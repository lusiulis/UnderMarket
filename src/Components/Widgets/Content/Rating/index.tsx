import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Rating } from "react-native-ratings";
import { AppGradientsColors } from "../../../../Assets/Styles";
import { AuthContext } from "../../../../Contexts/appContentProvider";
import { IContent, IContentCard } from "../../../../Models/Content/Content";
import { createRating } from "../../../../Models/Rating/rating.model";
import GradientButton from "../../../Common/Button/GradientButton";
import AppText from "../../../Common/Text";
import {
    ToastAndroid,
    Platform,
} from 'react-native';

type IForm = {
    handleBottomMenuShow: () => void;
    showBottomMenu: boolean;
    content: IContentCard;
    refresh: ()=> void;
};


const RatingComponent = ({ handleBottomMenuShow,refresh, showBottomMenu, content }: IForm) => {
    const [rating, setRating] = useState(content.rating ? content.rating : 1)
    const { authState } = useContext(AuthContext);

    useEffect(()=>{
     if(content.rating){
        setRating(content.rating)
     }
    }, [content.rating])

    const ratingCompleted = (rating: any) => {
        setRating(rating)
    }

    const saveRating = async () => {

        await createRating({ rating: rating, contentId: content.id, userId: authState.profile?.id ? authState.profile?.id : '' }).then(x => {
            refresh();
            if (Platform.OS === 'android') {
                ToastAndroid.show('Calificación realizada correctamente', ToastAndroid.SHORT)
            }
        }).catch((error) => {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Error al reallizar la calificación', ToastAndroid.SHORT)
            }
        })
    }
    return (
        <>
            <BottomSheet
                visible={showBottomMenu}
                onBackButtonPress={handleBottomMenuShow}
                onBackdropPress={handleBottomMenuShow}>
                <View style={styles.sheet}>
                    <View style={{ width: '50%', backgroundColor: 'black', padding: 1, borderRadius: 100, margin: 20 }} />
                    <AppText color={'black'} fontSize={20} font="bold">
                        Calificar Contenido
                    </AppText>

                    <Rating
                        showRating
                        onFinishRating={ratingCompleted}
                        style={{ paddingVertical: 10 }}
                        ratingCount={5}
                        startingValue={rating}
                    />
                    <GradientButton
                        colors={AppGradientsColors.active}
                        onPress={saveRating}
                        style={styles.submit}
                    >
                        <AppText font='bold' style={{ textAlign: 'center' }} fontSize={20}>Guardar</AppText>
                    </GradientButton>
                </View>
            </BottomSheet>

        </>
    )

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginBottom: 55,
    },
    submit: {
        padding: 10,
        marginTop: 20,
        width: '100%'
    },
    sheet: {
        backgroundColor: '#ffff',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default RatingComponent;