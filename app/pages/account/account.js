import React ,{ useState, useEffect} from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfo from '../../component/user_info';

var width = Dimensions.get('window').width; 

export default function Acc({navigation}) {
    const [uid, setUid] = useState("")
    const [userFullName, setUserFullName] = useState("Bukhashov Berik");
    const [userEmail, setUserEmail] = useState("bukhashov@mail.ru");
    const [userCity, setUserCity] = useState("Karaganda");

    const imgIconUri = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

    useFocusEffect(
        React.useCallback(() => {
            async function userinfo(){
                setUid(await AsyncStorage.getItem("uid"))
                if(!uid) navigation.navigate('Singin')
                setUserFullName(await AsyncStorage.getItem("fullname"))
                setUserEmail(await AsyncStorage.getItem("email"))
            }
            userinfo()
        })
    )

    // useEffect(()=> {
    //     const control = async () => {
    //         setUid(await AsyncStorage.getItem("uid"))

    //         if(uid) navigation.navigate('Singin')

    //         setUserFullName(await AsyncStorage.getItem("fullname"))
    //         setUserEmail(await AsyncStorage.getItem("fullname"))
    //     }
    //     control()
    // }, [])
 
    const onPressLogOut = async () => {
        await AsyncStorage.removeItem("uid")
        await AsyncStorage.removeItem("fullname")
        await AsyncStorage.removeItem("email")

        navigation.navigate('Singin')
    }
    
    let userInf = [['Tolyq aty', userFullName], ['Email', userEmail], ['Qala', userCity], ['Ball', 200]]

    return(
        <View key={"navigator_account_main_acc"}>
            <View style={{ paddingTop: 20, }}>
                {/* user image */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image style={{ width: 140, height: 140, borderRadius: 60, }} source={{uri: imgIconUri }} />
                </View>
                {/* user info */}
                <View style={{ }}>
                {
                    userInf.map((inf) =>  <UserInfo key={inf[1]+inf[0]} option={inf[0]} info={inf[1]} /> )
                }
                </View>
                
                {/* log out */}
                <View style={{width: width, display: 'flex', justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity onPress={()=> onPressLogOut()}>
                        <View style={{ padding: 15, bottom: -220, }}>
                            <Text >júıeden shyǵý</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}