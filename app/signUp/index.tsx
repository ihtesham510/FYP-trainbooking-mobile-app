import SignUpForm from '@/components/SignUpForm'
import { useAuth } from '@/context/authContext'
import { useTheme } from '@/context/themeContext'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function SignUp() {
	const { theme } = useTheme()
	const { user } = useAuth()
	const router = useRouter()
	useEffect(() => {
		if (user) {
			router.navigate('/dashboard/(tab)/trains')
		}
	}, [user])
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		headerContainer: {
			marginHorizontal: 20,
			marginVertical: 20,
		},
		title: {
			color: theme.colors.primary,
			fontSize: 52,
		},
		para: {
			color: theme.colors.primary75,
			fontSize: 18,
		},
	})
	return (
		<ScrollView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Register</Text>
				<Text style={styles.para}>Register to book your first ticket</Text>
			</View>
			<SignUpForm />
		</ScrollView>
	)
}
