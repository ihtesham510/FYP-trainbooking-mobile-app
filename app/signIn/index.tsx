import SignInForm from '@/components/SignInForm'
import { useTheme } from '@/context/themeContext'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function SignUp() {
	const { theme } = useTheme()
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
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.para}>Sign In to Continue</Text>
			</View>
			<SignInForm />
		</ScrollView>
	)
}
