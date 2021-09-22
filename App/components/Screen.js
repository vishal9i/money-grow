import React from 'react'
import { StyleSheet, ImageBackground,  } from 'react-native'

const Screen = ({children}) => {
    return (
        <ImageBackground style={styles.background}
        source={require('./../assets/bg.png')}
        >
            {children}
        </ImageBackground>
    )
}

export default Screen

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
      },
    
})
