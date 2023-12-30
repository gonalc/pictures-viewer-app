import { StyleSheet, Text, View } from "react-native"
import useBucket from "../../utils/hooks/bucket"
import Logout from "../Logout"

const Pictures = () => {
    useBucket()
    
    return (
        <View style={styles.container}>
            <Text>Holaaa pictures</Text>

            <View style={styles.logoutContainer}>
                <Logout />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    logoutContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Pictures