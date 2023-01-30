import React ,{ useState } from 'react';
import {Button, StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';

// title, dis, imgs,  #tag
export default function Content(props) {
    // console.log()
    return (
        <View>
            <Text>{props.route.params.content.id}</Text>
        </View>
    );
}