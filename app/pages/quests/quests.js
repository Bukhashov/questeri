import React ,{ useState, useEffect} from 'react';
import {Button, StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button_tag from '../../component/button_tag';
import Container from '../../component/container';
import Content from './content';
import Tests from './tests';
import config from '../../config';
import axios from 'axios';

// Globale
const tags = ["barlığı", "qalamen tanysý", "murajaıdaǵy kvesterı", "jergilikti taǵamdar", "balalarǵa arnalǵan"]
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

function Main({navigation}) {
    const getUrlpath = `${config.API_URI}/questeri/get/all`;
    const [currentTag, setCurrentTag] = useState('barlığı');
    const [containers, setContainers] = useState([]);

    const ChangeCurrentTag = (newTag) => {
        setCurrentTag(newTag)
    }

    const featData = async () => {
        let response = await axios.get(getUrlpath);
        setContainers(response.data)
    }
    
    useEffect(() => {
        featData()
    }, [])

    return(
        <View>
        <SafeAreaView key={"questeries_Map"}>
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
                                    key={vel._id}
                                    navigation={navigation}
                                    title={vel.title}
                                    images={vel.imgPath}
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
    </View>
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
            <Stack.Screen
                name="Tests"
                options={{ headerShown: false }}
                component={Tests}
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