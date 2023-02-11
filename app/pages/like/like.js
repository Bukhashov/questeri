import React ,{ useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../component/container';
import axios from 'axios';
import config from '../../config';

export default function Link({navigation}) {
    const [saved, setSaved] = useState([]);
    const [uid, setUid] = useState("");

    useFocusEffect(
        React.useCallback(()=> {    
            async function getSaved() {
                try{
                    await AsyncStorage.getItem("uid").then(async(id) => {
                        if(id == "" || id == null) navigation.navigate("Account");
                        setUid(id)
                    });

                    await axios.post(`${config.API_URI}/saved/get/`, {
                        user_id: uid
                    }).then((res) => setSaved(res.data))
                }
                catch(e){
                    console.log("uid"+uid)
                    console.log("saved"+saved)
                    setSaved([]);
                }
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
                        id={save._id}
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