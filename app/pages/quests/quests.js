import React ,{ useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// components
import Button_tag from '../../component/button_tag';
import Container from '../../component/container';
// pages
import Content from './content';
import Tests from './tests';

import config from '../../config';
import axios from 'axios';

// Globale
const tags = ["barlığı", "qalamen tanysý", "murajaıdaǵy kvesterı", "jergilikti taǵamdar", "balalarǵa arnalǵan"]
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

function Main({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [currentTag, setCurrentTag] = useState(tags[0]);
    const [containers, setContainers] = useState([]);

    const ChangeCurrentTag = (newTag) => {
        setCurrentTag(newTag)
    }

    const featData = async () => {
        try{
            console.log(`${config.API_URI}/questeri/get/all`)
            await axios.get(`${config.API_URI}/questeri/get/all`)
            .then((response) => {
                setContainers(response.data)
                setLoading(false)
            })
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        featData()
    }, [])

    return(
        <View key={"questeries_Map"}>
            {
                isLoading ? (
                    <ActivityIndicator 
                        size="large" 
                        color="#000" 
                        style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, }} />
                ) : (
                    <SafeAreaView>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                                    {
                                        tags.map((tag) => (
                                            <Button_tag
                                                id={tag}
                                                key={tag} 
                                                tag={tag} 
                                                changeCurrentTag={ChangeCurrentTag} 
                                            /> 
                                        ))
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
                                        id={vel._id}
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
            )}
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
