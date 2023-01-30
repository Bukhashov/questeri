import React ,{ useState } from 'react';
import {Button, StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button_tag from '../component/button_tag';
import Container from '../component/container';
import Content from './content';
import config from '../config';
import axios from 'axios';

config.API_URI
// Globale
const tags = ["barlığı", "qonaq üy", "meyramxana", "kafe", "murajaylar"]
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const ccontainers

function Main({navigation}) {
    const [currentTag, setCurrentTag] = useState('barlığı');
    
    const ChangeCurrentTag = (newTag) => {
        setCurrentTag(newTag)
    }

    const getContent = async() => {
        const req = await axios.get(`${config.API_URI}/questeri/get/all`)
        console.log(res)
    }
    getContent()

    return(
        <SafeAreaView>
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', }} >
                            {
                                tags.map((tag) =>  <Button_tag tag={tag} changeCurrentTag={ChangeCurrentTag} /> )
                            }
                        </View>
                </ScrollView>
            </View>
            <View>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10, paddingBottom: 6, paddingLeft: 15, paddingRight: 15, }} >
                    <View> 
                        <Text>Karaganda</Text>
                    </View>
                    <View> 
                        <Text>#{currentTag}</Text>
                    </View>
                </View>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                    <View style={{justifyContent: 'center'}}>
                        {
                            containers.map((vel) => (
                                <Container 
                                    navigation={navigation}
                                    title={vel.title}
                                    img_uri={vel.img_uri}
                                    description={vel.description}
                                    tag={vel.tag}
                                    city={vel.city}
                                />
                            ))
                        }
                    </View>
                   
                
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default function Quests() {
    const Stack = createNativeStackNavigator();
    return (
          <Stack.Navigator>
            <Stack.Screen 
                name="Main" 
                options={{ headerShown: false }} 
                component={Main} 
            />
            <Stack.Screen 
                name="container" 
                options={{ headerShown: false }} 
                component={Content}
            />
          </Stack.Navigator>
    );
}


const style = StyleSheet.create({

    // Content
    content_title: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        // borderBottomWidth: width,
    },
    connect: {
        margin: 15,
        width: width-35,
        height: 250,
        backgroundColor: '#000'
    },
})