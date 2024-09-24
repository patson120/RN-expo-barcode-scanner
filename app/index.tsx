import { useCameraPermissions } from "expo-camera";
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

const Home = () => {

    const route = useRouter()

    const [permission, requestPermission] = useCameraPermissions()

    const isPermissionGranted = Boolean(permission?.granted)

    const openScanner = () => {
        route.push('/scanner')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>QR code</Text>
                <Pressable
                    onPress={requestPermission}
                    style={{ borderColor: '#cecece', borderWidth: 2, borderStyle: 'solid', marginVertical: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", }}>Request Permission</Text>
                </Pressable>
                <Pressable
                    onPress={openScanner}
                    disabled={!isPermissionGranted}
                    style={{ opacity: isPermissionGranted ? 1 : 0.5, backgroundColor: isPermissionGranted ? 'blue': 'white', borderColor: '#cecece', borderWidth: 2, borderStyle: 'solid', marginBottom: 10, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", color: isPermissionGranted ? '#fff': '#000' }}>Scan QR code</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
export default Home