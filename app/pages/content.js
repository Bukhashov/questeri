import React ,{ useState } from 'react';
import {Button, StyleSheet, Image, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

// title, dis, imgs,  #tag
export default function Content(props) {
    // console.log()
    const images =  props.route.params.content.images ? props.route.params.content.images : []
    
    return(
        <SafeAreaView key={props.route.params.content.key+props.route.params.content.title}>
            {/* title */}
            <View style={{ width: width, display: 'flex', justifyContent: 'center', flexDirection: 'row', padding: 5, }}>  
                <Text style={{ fontSize: 22, fontWeight: '500'}}>{props.route.params.content.title}</Text>
            </View>

            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            images.map((img) => <Image style={{ width: width, height: 220 }} source={{uri: img }}/>)
                        }

                </ScrollView>
            </View>

        </SafeAreaView>
        
    );
}