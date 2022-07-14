import React from 'react';
import { View, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux'

import { ADD_LOCATION } from "../../reducer/Types";
import ChipsApp from "../../components/ChipsApp"


export default function List({ navigation }) {
    const dispatch = useDispatch()
    const coordinate = useSelector(state => state.CoordinateReducer)

    const goTime = (item) => {
        const data = {
            latitude: item.latitude,
            longitude: item.longitude
        }
        dispatch({ type: ADD_LOCATION, payload: data })
        navigation.navigate('Time')
    }

    return (
        <View style={styles.container}>
            {coordinate ?
                <>
                    {coordinate.map(item =>
                        <ChipsApp text={`Lat:${item.latitude} Lon: ${item.longitude}`}
                            onPressAction={() =>
                                goTime(item)}
                            style={styles.containerChip}
                            styleTitle={styles.titleChip} />
                    )}
                </>
                : null
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    title: {
        color: "#000",
        fontSize: 25,
        fontWeight: '700',
        marginTop: 20,
        textAlign: 'center'
    },
})
