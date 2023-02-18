import React ,{ useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../component/container';
import axios from 'axios';
import config from '../../config';

export default function Link({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [saved, setSaved] = useState([]);
    const [uid, setUid] = useState("");

    useFocusEffect(
        React.useCallback(()=> {    
            async function getSaved() {
                try{
                    await AsyncStorage.getItem("uid").then(async (id) => {
                        if(id == "" || id == null) navigation.navigate("Account");
                        
                        setUid(id)
                        
                        await axios.post(`${config.API_URI}/saved/get/`, {
                            user_id: id
                        }).then((response) => {
                            setSaved(response.data);
                            setLoading(false);
                        })
                    });   
                }
                catch(e){
                    setSaved([]);
                }
            }
            getSaved()
        }, [])
    )

    return(
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {
                isLoading ? <ActivityIndicator 
                    size="large" 
                    color="#000" 
                    style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10, }} /> :
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
            }
           
        </ScrollView>
    )
}