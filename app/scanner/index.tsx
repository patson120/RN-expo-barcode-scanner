import { View, Text, SafeAreaView, StyleSheet, Alert, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraView, Camera } from "expo-camera";
import { StatusBar } from 'expo-status-bar'
import { Overlay } from './Overlay';


const index = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])

    const handleBarcodeScanned = ({ type, data }: { type: any, data: any }) => {
        setScanned(true)
        Alert.alert(
            'Scanned!',
            `Bar code with type ${type} and data ${data} has been scanned!`
        )
    }

    if (!hasPermission) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Please grant camera permission to App</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject} >
            {Platform.OS == 'android' ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                facing='back'
                barcodeScannerSettings={{
                    barcodeTypes: [
                        'aztec',
                        'codabar',
                        'code128',
                        'code39',
                        'datamatrix',
                        'ean13',
                        'ean8',
                        'itf14',
                        'pdf417',
                        'qr',
                        'upc_a',
                        'upc_e',
                    ],

                }}
            />
            <Overlay />
            {
                scanned && <View
                    style={{ position: 'absolute', minWidth: '100%', bottom: 150, left: 0, right: 0, backgroundColor: 'transparent', width: 150 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Pressable
                            style={{ backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 6,  borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setScanned(false)}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff' }}>Scan Again ?</Text>
                        </Pressable>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default index