import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Raleway_700Bold, useFonts } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/onboarding/onboard';

export default function OnBoardingScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });
    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <LinearGradient colors={["#E5ECF9", "F6F7F9"]} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }} >
            <View style={styles.firstContainer} >
                <View>
                    <Image source={require("@/assets/logo.png")} style={styles.logo} />
                    <Image source={require("@/assets/onboarding/shape_9.png")} />
                </View>
                <View style={styles.titleWrapper} >
                    <Image source={require("@/assets/onboarding/shape_3.png")} style={styles.titleTextShape1} />
                    <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
                        Start Learing Wtih
                    </Text>
                    <Image source={require("@/assets/onboarding/shape_2.png")} style={styles.titleTextShape2} />
                </View>
                <View>
                    <Image source={require("@/assets/onboarding/shape_6.png")} style={styles.titleTextShape3} />
                    <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>ECourses</Text>
                </View>
                <View style={styles.dscpWrapper}>
                    <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
                        Explore a variety of interactive lesson,
                    </Text>
                    <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
                        video, quizze & assignment.
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => router.push("/(routes)/welcome-intro")}
                >
                    <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
                        Getting Started
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
