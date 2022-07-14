import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import FadeInView from "../../components/FadeInView";
import TextApp from "../../components/TextApp";
import ChipsApp from "../../components/ChipsApp";
import CarouselApp from "../../components/CarouselApp";
import { ADD_TIME } from "../../reducer/Types";


export default function Time({ navigation }) {
    const [latitude] = useState(38.7259284);
    const [longitude] = useState(-9.137382, 17);
    const dispatch = useDispatch()
    const infoMap = useSelector(state => state.LocationReducer[0])

    const getTimes = async () => {

        const lat = infoMap === undefined ? latitude : infoMap.latitude
        const lon = infoMap === undefined ? longitude : infoMap.longitude

        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${process.env.APIKEY}`);
        const data = await res.json();

        dispatch({ type: ADD_TIME, payload: data })
    };
    useEffect(() => {
        getTimes()
    })

    const infoTime = useSelector(state => state.TimeReducer[1])
    let hours = new Date();

    return (
        <View >
            {infoTime?.cod ? <TextApp text={infoTime.message} style={styles.titleApp} />
                :
                <>
                    {infoTime ?
                        <View style={styles.container}>
                            <View style={styles.containerInfo}>
                                <View>
                                    <TextApp text={infoTime.timezone} style={styles.titles} />
                                    <TextApp text={`${infoTime.lat}  ${infoTime.lon}`} style={styles.subTitles} />
                                </View>
                                <View style={styles.containerBoxChip}>
                                    <FadeInView>
                                        <ChipsApp text="Alterar Localização"
                                            onPressAction={() =>
                                                navigation.navigate('Register')}
                                            style={styles.containerChip}
                                            styleTitle={styles.titleChip} />
                                        <ChipsApp text="Ver lista salva"
                                            onPressAction={() =>
                                                navigation.navigate('List')}
                                            style={styles.containerSubChip}
                                            styleTitle={styles.subTitleChip} />
                                    </FadeInView>
                                </View>
                            </View>
                            <View style={styles.time}>
                                <FadeInView style={styles.summaryTime}>

                                    <TextApp text={`${Math.floor(infoTime.current.temp - 274)}°C`} style={styles.titlesSummaryTemp} />
                                </FadeInView>
                                <View style={styles.summaryInfo}>
                                    <TextApp text={`${hours.getHours(infoTime.current.dt)}:${hours.getMinutes(infoTime.current.dt)}`} style={styles.titlesSummary} />
                                    <TextApp text={`percepção humana do clima: ${infoTime.current.feels_like}`} style={styles.subTitlesSummary} />
                                    <TextApp text={`Umidade: ${infoTime.current.humidity}%`} style={styles.subTitlesSummary} />
                                    <TextApp text={`${infoTime.current.weather[0].description}`} style={styles.subTitlesSummary} />
                                </View>
                            </View>
                            <TextApp text="Previsão dos ultimos 7 dias" style={styles.title} />
                            <TextApp text="Deslize para o lado para conseguir ver as previsões dos próximos dias" style={styles.subTitlesInfo} />
                            <CarouselApp carouselItems={infoTime.daily} styleItem={styles.carouselContainer} styleTitle={styles.subTitlesCarousel} />
                        </View>
                        :
                        <View>
                            <TextApp text="Serviço está fora do ar, clique no botão para tentar novamente!" style={styles.titleApp} />
                            <ChipsApp text="Tentar novamente"
                                onPressAction={() =>
                                    getTimes()}
                                style={styles.containerChipApp}
                                styleTitle={styles.titleChip} />
                        </View>}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    time: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    summaryTime: {
        width: 200,
        height: 170,
        backgroundColor: 'powderblue',
        borderRadius: 20,
        padding: 20,
    },
    summaryInfo: {
        height: 170,
        width: 180,
        justifyContent: "flex-start",
        alignItems: 'flex-end',

    },
    titlesSummary: {
        color: "#000",
        fontSize: 37,
        fontWeight: '700',
    },
    titlesSummaryTemp: {
        color: "#000",
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 35,
    },
    subTitlesSummary: {
        color: "#000",
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'right',
    },
    containerInfo: {
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titles: {
        color: "#000",
        fontSize: 18,
        fontWeight: '700',
    },
    subTitles: {
        color: "#000",
        fontSize: 12,
        fontWeight: '300',
    },
    subTitlesInfo: {
        color: "#000",
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center'
    },
    containerChip: {
        backgroundColor: 'powderblue',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        paddingTop: 3,
        width: 200
    },
    containerChipApp: {
        backgroundColor: 'powderblue',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        paddingTop: 3,
        width: 300,
        alignItems: 'center',
        margin: 50,
    },
    titleChip: {
        color: "#000",
        fontSize: 15,
        fontWeight: '700',
        textAlign: "center",
    },
    containerBoxChip: {
        justifyContent: "flex-start",
        alignItems: 'flex-end'
    },
    containerSubChip: {
        backgroundColor: 'powderblue',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        paddingTop: 3,
        width: 140,
        marginTop: 5
    },
    subTitleChip: {
        color: "#000",
        fontSize: 15,
        fontWeight: '300',
        textAlign: "center",
    },
    carouselContainer: {
        backgroundColor: '#dca92c',
        borderRadius: 20,
        height: 300,
        padding: 20,
        marginLeft: 25,
        marginRight: 25,
        width: 300,
        marginTop: 20
    },
    subTitlesCarousel: {
        color: "#000",
        fontSize: 18,
        fontWeight: '300',
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: "#fff"
    },
    title: {
        color: "#000",
        fontSize: 25,
        fontWeight: '700',
        marginTop: 20,
        textAlign: 'center'
    },
    titleApp: {
        color: "#000",
        fontSize: 25,
        fontWeight: '700',
        marginTop: 20,
        textAlign: 'center',
        padding: 20
    }
})
