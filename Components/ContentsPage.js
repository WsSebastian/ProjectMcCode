import React, { useState, useEffect } from 'react';
import Firebase from './Firebase'

export function ContentsPage(){

    const currentCollection = Firebase.getContents();

    function ColContent(props){
        const text = props.currentCollection;

        return (
            <div className={'test'}>
            <p>{text}</p>
            </div>
        )
    }

    return(
        <View>
            <div>
                {currentCollection && currentCollection.map(cont => <ColContent key={cont.id} currentCollection={cont}/>)}
            </div>

        </View>
    )
}
