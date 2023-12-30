import { StyleSheet, Text, TouchableOpacity } from "react-native"
import useSession from "../../utils/hooks/session"

const Logout = () => {
    const { logout } = useSession()

    return (
        <TouchableOpacity style={styles.button} onPress={logout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'pink'
    }
})

export default Logout