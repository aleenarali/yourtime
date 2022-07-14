import React from 'react';
import { Text } from 'react-native';

const TextApp = (props) => {

    return (
        <Text
            style={{
                ...props.style,
            }}
        >
            {props.text}
        </Text>
    );
}

export default TextApp 