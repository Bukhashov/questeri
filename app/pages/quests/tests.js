import React ,{ useState, useEffect} from 'react';
import {Button, StyleSheet, Image, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import config from '../../config';
import axios from 'axios';
import SlaiderImages from '../../component/slaiderImages';

var width = Dimensions.get('window').width; //full width

//
// id       type    object 
// title    type    string
// image    type    string
//

export default function Tests(props){
    
    
    useEffect(()=> {

    }, [])


    return(
        <View key={props.route.params.content.id}>
            <SafeAreaView>
                <ScrollView bounces={false} horizontal={false} showsHorizontalScrollIndicator={false} >
                    <SlaiderImages title={props.route.params.content.title} images={[props.route.params.content.image]} />

                    {/* Tests */}
                    <View>

                    </View>
                    
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}