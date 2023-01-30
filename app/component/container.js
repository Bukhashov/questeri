import React from 'react';
import {Button, Image, Text, View, Dimensions, TouchableOpacity} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function Container(props) {
    console.log(width)
    return(
        <TouchableOpacity onPress={() => props.navigation.navigate('container', { 
            content: { 
                id: '',
                title: '', 
                city: props.city,
                tag: props.tag                
            }
        })}>
            <View key={props.title} 
            style={{ padding: 5, display:'flex', flexDirection:'row', width: width-180 }} 
        >
            <View style={{ margin: 5 }}>
                <Image style={{ width: 160, height: 200 }} 
                    source={{uri: props.img_uri}} />
            </View>            
            <View style={{marginRight: 0}}>
                <View>
                    <Text style={{fontSize: 20, marginLeft: 2, marginTop: 5, marginBottom: 8}}>{props.title}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 10, marginBottom: 5}} >{props.description}</Text>
                </View>
                
                {/* footer */}
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text>{props.city}</Text>
                    <Text>#{props.tag}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>   
    )
} 