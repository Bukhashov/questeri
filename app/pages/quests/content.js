import React ,{ useState } from 'react';
import {Button, Image, ScrollView, SafeAreaView, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReviewsLine from '../../component/review_line';
import SlaiderImages from '../../component/slaiderImages';
import axios from 'axios';
import config from '../../config';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
// title, dis, imgs,  #tag
export default function Content(props) {
    let IconKBU =  "https://www.topuniversities.com/sites/default/files/profiles/logos/academician-y.a.-buketov-karaganda-university_592560cf2aeae70239af52e9_large.jpg"
    
    const [saved, setSaved] = useState(false)

    let autherIs = false
    let reviewsIs = false
    let imagesIs = false

    if(typeof props.route.params.content.hasOwnProperty('auther')) autherIs = false
    if(typeof props.route.params.content.hasOwnProperty('reviews')) reviewsIs = false
    if(typeof props.route.params.content.hasOwnProperty('images')) imagesIs = true

    const autherIcon        = autherIs      ? props.route.params.content.auther.icon        : IconKBU
    const autherName        = autherIs      ? props.route.params.content.auther.name        : "Akademık E. A. Bóketov atyndaǵy Qaraǵandy ýnıversıtetis"
    const images            = imagesIs      ? props.route.params.content.images             : []
    const reviewsNumber     = reviewsIs     ? props.route.params.content.reviews.number     : 4.9

    const ReviewsLineMap = [
        [5, reviewsIs ? props.route.params.content.reviews.line.one   : 9], 
        [4, reviewsIs ? props.route.params.content.reviews.line.two   : 6], 
        [3, reviewsIs ? props.route.params.content.reviews.line.three : 3], 
        [2, reviewsIs ? props.route.params.content.reviews.line.four  : 0]
    ]

    const savedRequestApi = async(path) => {
        let res = await axios.post(`${config.API_URI}${path}`, {
            questeri_id: props.route.params.content.key,
            user_id: 1234,
        })
        return res
    }
    
    const onPressSaved = async () => {
        if(saved) {
            let res = await savedRequestApi('/saved/delete')
            console.log(res.status)
            if(res.status >= 200 && res.status < 400) {
                setSaved(false)
            }
        }
        else{
            let res = await savedRequestApi('/saved/add')
            console.log(res.status)
            if(res.status >= 200 && res.status < 400) {
                setSaved(true)
            }
        }
    }

    const onPressRederact = () => {
        props.navigation.navigate('Tests', {
            content: {
                kvestterid: props.route.params.content.key,
                image: images[0],
                title: props.route.params.content.title
            }
        })
    }

    return(
        <View key={props.route.params.content.key+props.route.params.content.title+ props.route.params.content.tag}>
            <SafeAreaView style={{position: 'relative'}}>
                <ScrollView bounces={false} horizontal={false} showsHorizontalScrollIndicator={false} >
                <View>
                    <SlaiderImages key={"slaider_images__"+props.route.params.content.title} title={props.route.params.content.title} images={props.route.params.content.images} />
                </View>
                <View style={{ 
                    paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, 
                    width: width, 
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between' 
                }}>
                    <View>
                        <Text>#{props.route.params.content.tag}</Text>
                    </View>
                    <View>
                        <Ionicons name={ saved ? 'bookmark' : 'bookmark-outline'} 
                            size={24} 
                            color={"black"}
                            onPress={() => onPressSaved()}
                        />
                    </View>
                </View>
                <View style={{
                    paddingTop: 2, paddingBottom: 8, paddingLeft: 12, paddingRight: 12,
                    display: 'flex', flexDirection: 'row', 
                }}>
                    <View style={{ paddingRight: 90 }}>
                        <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Qala:</Text>
                        <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Qashyqtyq:</Text>
                        <Text style={{ color: '#616A6B'}}>Uzaqtyǵy:</Text>
                    </View>
                    <View>
                        <Text style={{ paddingBottom: 3, color: '#000'}}>{props.route.params.content.city}</Text>
                        <Text style={{ paddingBottom: 3, color: '#000'}}>2 km deıin</Text>
                        <Text style={{ color: '#000'}}>40 min</Text>
                    </View>
                </View>
                
                {/* Description */}
                <View style={{ paddingTop: 2, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, }}>
                    <Text>{props.route.params.content.description}</Text>
                </View>
                
                {/* ---------------*/}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ borderTopWidth: 1, width: width-18, }} />
                </View>
                <View style={{ paddingTop: 2, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Ornalasqan jeri</Text>
                    <Text style={{ paddingBottom: 3, color: '#000'}}>{props.route.params.content.city}</Text>
                </View>
                
                {/* ---------------*/}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ borderTopWidth: 1, width: width-18, }} />
                </View>
                <View style={{ paddingTop: 2, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Mańyzdy aqparat</Text>
                    <Text style={{ paddingBottom: 3, color: '#000'}}>{props.route.params.content.city}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ borderTopWidth: 1, width: width-18, }} />
                </View>

                {/* Avtor */}
                <View style={{ width: width, paddingTop: 2, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Avtor</Text>
                    
                    <View style={{
                        borderColor: "#000",
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 8, paddingBottom: 8, paddingRight: 3, paddingLeft: 3,
                        backgroundColor: '#fff',
                        borderRadius: 20,
                    }}>
                        <Image style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 8, 
                            width: 60, height: 60, borderRadius: 15, }} source={{ uri: autherIcon }} />
                        <View style={{ width: width-62, paddingTop: 5, paddingBottom: 5, paddingRight: 10, paddingLeft: 10, }}>
                            <Text style={{ textAlign: 'left', }}>{autherName}</Text>
                        </View>
                    </View>
                </View>

                {/* reviews */}
                <View style={{ paddingTop: 2, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, }}>
                    <Text style={{ paddingBottom: 3, color: '#616A6B'}}>Pikirler</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                        <View style={{  paddingLeft: 12, paddingRight: 12, }}>
                            <Text style={{fontSize: 60, }}>{reviewsNumber}</Text>
                        </View>
                        <View style={{ }}>
                            {/* 1 <= line <= 10 */}
                            {
                                ReviewsLineMap.map((i)=> <ReviewsLine key={"content_reviews_line_"+i[0]+i[1]} number={i[0]} line={i[1]} />)
                            }
                        </View>
                    </View>
                </View>
                <View style={{ height: 90 }} />
            </ScrollView>
                
            {/*  */}
            <View  style={{ position: 'absolute', width: width, height: 80, bottom: 0,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <TouchableOpacity onPress={()=> onPressRederact()}>
                        <View>
                            <Text style={{ fontWeight: '400', fontSize: 14, }}>kvest suraqtaryn tapsyrý</Text>
                        </View> 
                </TouchableOpacity>
            </View> 
        </SafeAreaView>
    </View>
    );
}