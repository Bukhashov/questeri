import React ,{ useState, useEffect} from 'react';
import {Button, StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
import axios from 'axios';
import SlaiderImages from '../../component/slaiderImages';
import TestComponent from '../../component/test';
var width = Dimensions.get('window').width; //full width

//
// id       type    object 
// title    type    string
// image    type    string
//

export default function Tests(props){
    const [tests, setTests] = useState(null);
    const [uid, setUid] = useState("");
    const [testCount, setTestCount] = useState(0);
    const [backCount, setBackCount] = useState(false);
    const [runCount, setRunCount] = useState(true);

    const [auth, setAuth] = useState(false);
    
    useFocusEffect(
        React.useCallback(()=> {
            async function getTests() {
                try{
                    let id = await AsyncStorage.getItem("uid");
                    if(id == "" || id == null) {
                        setAuth(false)
                    }
                    else{
                        setAuth(true)
                        setUid(id)
                    } 

                    axios.post(`${config.API_URI}/test/get`, {
                        questeri_id: props.route.params.content.id
                    }).then((response) => setTests(response.data))
                }
                catch(e){
                    setTests([])
                }
            }
            getTests()
        }, [])
    )

    if(!tests) return <View><Text>loading...</Text></View>
    if(tests) console.log(tests)


    const choiceVariant = (variant) => {
        console.log(variant)
    }

    // if (testCount == tests.length) setRunCount(false);
    // else setRunCount(true);
    
    // if (testCount == 0) setBackCount(false);
    // else setBackCount(true);

    return(
        <View key={props.route.params.content.id}>
            
            <SafeAreaView>
                <ScrollView bounces={false} horizontal={false} showsHorizontalScrollIndicator={false} >
                    <SlaiderImages title={props.route.params.content.title} images={[props.route.params.content.image]} />
                    
                    <View style={auth ? {display: 'none'} : {display: 'flex'}}>
                       <View style={{paddingTop: 45, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Text>Testtirdi tapsyrý úshin avtorızasıalaý kerek</Text>
                       </View>
                    </View>
                    {/* Tests */}
                    <View style={auth ? {display: 'flex'} : {display: 'none'}}> 
                        <View style={{paddingTop: 15, paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{color: "", fontSize: 18, textAlign: 'center', }}>{testCount+1}. {tests[testCount].question}</Text>
                            
                            <View style={{ paddingTop: 15, paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ borderTopWidth: 1, width: width-18, }} />
                            </View>
                           
                            <View>
                                {
                                    tests[testCount].option.map((otp) => (
                                        <TestComponent key={"tests_variants_keys__id"+tests[testCount]._id+"_var_"+otp} variant={otp} choiceVariant={choiceVariant} />
                                    ))
                                }
                            </View>    
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}