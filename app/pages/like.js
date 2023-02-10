import React ,{ useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from './../component/container';
import axios from 'axios';
import config from './../config';

export default function Link({navigation}) {
    const [saved, setSaved] = useState([]);
    const [uid, setUid] = useState("");


    useFocusEffect(
        React.useCallback(()=> {    
            async function getSaved() {
                let allSavedObj = await AsyncStorage.getItem("saved");
                let allSaved = JSON.parse(allSavedObj);
                setSaved(allSaved)
            }
            getSaved()
        }, [])
    )

    return(
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            <View>
            {
                saved.map((save) => (
                    <Container 
                        key={save.title + save._id}
                        navigation={navigation}
                        description={save.description}
                        title={save.title}
                        images={save.imgPath}
                        tag={save.tag}
                        city={save.city}
                    />
                ))
            }
            </View>
        </ScrollView>
    )
}