import React ,{ useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from './../component/container';
import axios from 'axios';
import config from './../config';

export default function Link({navigation}) {
    const [saved, setSaved] = useState([]);
    const [uid, setUid] = useState("");

    const userControl = async() => {
        setUid(await AsyncStorage.getItem("uid"))
        if(!uid){
            navigation.navigate("Account")
        }
    }
    const getAllSaved= async () => {
        try{
            let res = await axios.post(`${config.API_URI}/saved/get/`, {
                user_id: uid
            });
            console.log(res.data)
            setSaved(res.data)
        }catch(e){
            setSaved([])
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            function controller(){
                userControl()
                getAllSaved()
            }
            controller()
        })
    )

    return(
        <View>
            
        </View>
    )
}