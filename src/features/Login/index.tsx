import { useReducer } from "react"
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import reducer, { LoginFormAction, LoginState } from "./reducer"
import { supabase } from "../../services/supabase"

const Login = () => {
    const initialState: LoginState = {
        loading: false,
        email: '',
        password: ''
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const { email, password, loading } = state

    const onEditInput = (action: LoginFormAction) => (value: string) => {
        dispatch({ type: action, payload: value })
    }

    const signInWithEmail = async () => {
        dispatch({ type: "start-login" })

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
    
        if (error) Alert.alert(error.message)

        dispatch({ type: "login-success" })
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Email</Text>

                <TextInput
                    onChangeText={onEditInput('modify-email')}
                    placeholder="email@address.com"
                    value={state.email}
                    keyboardType="email-address"
                    style={styles.input}
                />
            </View>

            <View>
                <Text>Password</Text>

                <TextInput
                    onChangeText={onEditInput('modify-password')}
                    placeholder="Your safe password"
                    value={state.password}
                    keyboardType="ascii-capable"
                    secureTextEntry
                    style={styles.input}
                    
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
                <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        paddingHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        fontSize: 16
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'lightblue'
    }
})

export default Login
