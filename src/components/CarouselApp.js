import React, { useState, useEffect } from 'react';
import {
    Text,
    View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import TextApp from "./TextApp"


const CarouselApp = (props) => {
    const [carouselInfo, setCarouselInfo] = useState({})
    const { carouselItems, styleItem, styleTitle } = props

    const data = {
        activeIndex: 0,
        carouselItems
    }

    useEffect(() => {
        setCarouselInfo(data)
    }, [])

    function renderItem({ item }) {
        return (
            <View >
                <View style={styleItem}>
                    <Text style={{ fontSize: 30, paddingBottom: 22 }}>{` Dia: ${new Date(parseInt(item.dt) * 1000).getDate()}`}</Text>
                    <Text style={{ fontSize: 15, textAlign: 'center' }}>Temperatura do dia:</Text>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>{`${Math.floor(item.temp.day - 270)}°C`}</Text>
                    <Text style={{ fontSize: 15, textAlign: 'center' }}>Hora do nascer do sol:</Text>
                    <Text style={{ fontSize: 25, textAlign: 'center' }}>{` ${new Date(item.sunrise * 1000).toLocaleTimeString()}`}</Text>
                    <Text style={{ fontSize: 15, textAlign: 'center' }}>Hora do nascer do sol:</Text>
                    <Text style={{ fontSize: 25, textAlign: 'center' }}>{`${new Date(item.sunset * 1000).toLocaleTimeString()} `}</Text>
                </View>
                <TextApp text={item.weather[0].description} style={styleTitle} />
            </View>
        )
    }

    return (
        <Carousel
            layout={"tinder"}
            data={carouselInfo.carouselItems}
            sliderWidth={360}
            itemWidth={340}
            renderItem={renderItem}
            onSnapToItem={index => carouselInfo.activeIndex = index} />

    );
}

export default CarouselApp 