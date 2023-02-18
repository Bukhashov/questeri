import React,{useState} from 'react';
import {ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
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
    const [isLoading, setLoading] = useState(true);
    const [tests, setTests] = useState(null);
    const [uid, setUid] = useState("");
    const [testCount, setTestCount] = useState(0);
    const [finish, setFinish] = useState(false);
    const [auth, setAuth] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(false);
    const [numberTests, setNumberTests] = useState(0)
    const [ball, setBall] = useState(0);
    
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
                    }).then((response) => {
                        setTests(response.data)
                        console.log(typeof(response.data.length))
                        setNumberTests(response.data.length)
                        setLoading(false)
                    })
                }
                catch(e){
                    setTests([])
                }
            }
            getTests()
        }, [])
    )

    const choiceVariant = (variant) => {
        let answer = {question: tests[testCount].question, answer: variant};
        
        setAnswers(answers.filter(item => item.question != tests[testCount].question))
        setAnswers([...answers, answer])

        if(testCount != tests.length-1) setTestCount(testCount+1)
        if(testCount == tests.length-2) setFinish(true);
    }

    const onPressBack = () => {
        if(testCount != 0) {
            setTestCount(testCount-1);
            setFinish(false);
        }
    }
    const onPressRun = async () => {
        if(testCount != tests.length-1) {
            setTestCount(testCount+1)
            setFinish(false)
        }
        if(testCount == tests.length-2) setFinish(true);
    }

    const onPressFinish = async () => {
        try{
            await axios.post(`${config.API_URI}/test/control`, {
                user_id: uid,
                questeri_id: props.route.params.content.id,
                answers: JSON.stringify(answers)
            }).then((res) => {
                setResult(true)
                setBall(res.data.count)
            })
        }catch(e){
            console.log(e)
        }
    }

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
                            {
                                isLoading 
                                ?  <ActivityIndicator size="large" 
                                    color="#000" 
                                    style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, }} />
                                : <View style={result ? {display: 'none'} : {display: 'flex'}}>
                                <View style={{paddingTop: 15, paddingLeft: 20, paddingRight: 20}}>
                                <Text style={{color: "", fontSize: 18, textAlign: 'center', }}>{testCount+1}. {tests[testCount].question}</Text>
                                
                                <View style={{ paddingTop: 15, paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ borderTopWidth: 1, width: width-18, }} />
                                </View>
                            
                                <View>
                                    {
                                        tests[testCount].option.map((otp) => (
                                            <TestComponent 
                                                key={"tests_variants_keys__id"+tests[testCount]._id+"_var_"+otp} 
                                                
                                                variant={otp} 
                                                choiceVariant={choiceVariant} 
                                                />
                                        ))
                                    }
                                </View>    
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity onPress={() => onPressBack()}>
                                        <View>
                                            <Text>artqa</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onPressRun()}>
                                        <View>
                                            <Text>kelesi</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => onPressFinish()}
                                        style={finish 
                                        ? {display: 'flex', justifyContent: 'center', flexDirection: 'row', } 
                                        : {display: 'none'}}> 
                                        <Text style={{ marginTop: 15, marginBottom: 5, paddingTop: 10,
                                            fontSize: 16, fontWeight: '500',}}>Finish</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>                                
                            }
                            <View style={result ? {paddingTop: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center'} : {display: 'none'}}>
                                    <View style={{display: 'flex', }}>
                                        <Text style={{padding: 15}}>Suraqtar sany</Text>
                                        <Text style={{padding: 15}}>Durys jaýaptar sany</Text>
                                    </View>
                                    <View style={{display: 'flex', }}>
                                        <Text style={{padding: 15}}>{numberTests}</Text>
                                        <Text style={{padding: 15}}>{ball}</Text>
                                    </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
        </View>
    )
}