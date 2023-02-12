import React from 'react';
import {Text, View, Pressable} from 'react-native';

// 
// images   type    [] map
// title    type    string
//

export default function Test(props) {
    const choice = () => {
        props.choiceVariant(props.variant)
    }

    return(
        <Pressable onPress={() => choice()} style={{padding: 5, marginBottom: 5, marginTop: 5, backgroundColor: "#ABB2B9" }} key={props.variant}>
            <Text style={{textAlign: 'center', fontSize: 16, color: "#fff"}}>{props.variant}</Text>
        </Pressable>
    )
} 