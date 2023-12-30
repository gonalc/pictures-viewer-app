import { Platform, ToastAndroid } from "react-native";

export function showToast(text: string) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(text, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }
}