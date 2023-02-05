import React from 'react';
import {Text, View} from 'react-native';
export default function ReviewsLine(props) {
    let ReviewsLineWidth = (220/100)*(props.line * 10);

    return(
        <View style={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 0, paddingRight: 8 }}>{props.number}</Text>
            <View style={{
                paddingTop: 1, paddingBottom: 1, paddingLeft: 0, paddingRight: 0,
                width: 220, height: 3, 
                position: 'relative', 
                backgroundColor: "#fff", 
            }}>
                <View style={{ 
                    position: 'absolute', 
                    width: ReviewsLineWidth, height: 3, 
                    backgroundColor: "#000" 
                }} />
            </View>
        </View>
    )
} 