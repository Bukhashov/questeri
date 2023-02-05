import React from 'react';
import {Button, View} from 'react-native';

export default function Button_tag(props) {
    return(
        <View 
            key={props.tag} 
            style={{padding: 5, 
                    flexDirection: 'row', 
                    alignItems: 'center'
                }}
            >
                <Button 
                    color="#000"
                    title={'#'+props.tag} 
                    key={props.tag.toString()} 
                    onPress={()=> props.changeCurrentTag(props.tag) }
                >
                </Button>
        </View>
    )
}
