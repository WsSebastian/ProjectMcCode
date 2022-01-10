import React, { useState, useEffect } from 'react';

export function ContentsPage(){

    return(
        <View>

            <Button
                title="Back"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>
    )
}
