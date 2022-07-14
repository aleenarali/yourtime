import React from 'react';
import { TouchableOpacity } from 'react-native';

import TextApp from "./TextApp"

const ChipsApp = (props) => {

  return (
    <TouchableOpacity
      style={{
        ...props.style,
      }}
      onPress={props.onPressAction}>
      <TextApp text={props.text} style={props.styleTitle} />
    </TouchableOpacity>
  );
}

export default ChipsApp 