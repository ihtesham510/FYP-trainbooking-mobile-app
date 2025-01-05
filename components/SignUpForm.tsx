import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useTheme } from '@/context/themeContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidPhoneNumber } from 'react-phone-number-input'
import ThemedButton from '@/components/ui/ThemedButton'
import PasswordInput from '@/components/ui/PasswordInput'
import ThemedText from '@/components/ui/ThemedText'
import { Link } from 'expo-router'
import ThemedPhoneInput from '@/components/ui/phoneInput'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAuth } from '@/context/authContext'

export default function SignUpForm() {
	const { theme } = useTheme()
	const convex = useConvex()
	const { signUp } = useAuth()
	const styles = useStyles()
	const formSchema = z
		.object({
			firstName: z.string().min(2),
			lastName: z.string().min(2),
			username: z.string().min(2),
			email: z.string().email(),
			phoneNo: z.string().refine(isValidPhoneNumber, {
				message: 'Invalid phone number',
			}),
			password: z.string().min(8),
		})
		.superRefine(async (values, ctx) => {
			const { email, username, phoneNo } = values

			const emailExists = await convex.query(api.user.userExists, { email })

			const phone_no_exists = await convex.query(api.user.userExists, {
				phone_no: phoneNo,
			})

			const user_name_exists = await convex.query(api.user.userExists, {
				username,
			})

			if (user_name_exists) {
				ctx.addIssue({
					code: 'custom',
					path: ['username'],
					message: 'Username already taken',
				})
			}

			if (phone_no_exists) {
				ctx.addIssue({
					code: 'custom',
					path: ['phoneNo'],
					message: 'Phone_no already exists',
				})
			}

			if (emailExists) {
				ctx.addIssue({
					code: 'custom',
					path: ['email'],
					message: 'Email already exists',
				})
			}
		})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		try {
			console.log(values)
			signUp({
				first_name: values.firstName,
				last_name: values.lastName,
				user_name: values.username,
				email: values.email,
				gender: 'male',
				phone: values.phoneNo,
				password: values.password,
			})
		} catch (err) {
			console.log('Error while signing up', err)
		}
	}
	return (
		<View>
			<Controller
				control={form.control}
				name='firstName'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>First Name</Text>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							style={styles.input}
							placeholder='@First_Name'
						/>
						{form.formState.errors.firstName && (
							<Text style={styles.errorText}>
								{form.formState.errors.firstName.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={form.control}
				name='lastName'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Last Name</Text>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							style={styles.input}
							placeholder='@Last_Name'
						/>
						{form.formState.errors.lastName && (
							<Text style={styles.errorText}>
								{form.formState.errors.lastName.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={form.control}
				name='username'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Username</Text>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							style={styles.input}
							placeholder='@user123'
						/>
						{form.formState.errors.username && (
							<Text style={styles.errorText}>
								{form.formState.errors.username.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={form.control}
				name='email'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Email</Text>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							style={styles.input}
							placeholder='user@example.com'
						/>
						{form.formState.errors.email && (
							<Text style={styles.errorText}>
								{form.formState.errors.email.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={form.control}
				name='phoneNo'
				render={({ field }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Phone No.</Text>
						<ThemedPhoneInput
							onChange={field.onChange}
							value={field.value}
							style={styles.input}
						/>
						{form.formState.errors.phoneNo && (
							<Text style={styles.errorText}>
								{form.formState.errors.phoneNo.message}
							</Text>
						)}
					</View>
				)}
			/>

			<Controller
				control={form.control}
				name='password'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Password</Text>
						<PasswordInput
							value={value}
							inputStyle={[
								styles.input,
								{
									paddingVertical: 7,
								},
							]}
							onChangeText={onChange}
							textContentType='password'
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							placeholder='Enter Your Password'
						/>
						{form.formState.errors.password && (
							<Text style={styles.errorText}>
								{form.formState.errors.password.message}
							</Text>
						)}
					</View>
				)}
			/>
			<ThemedButton
				title='Submit'
				style={styles.button}
				onPress={form.handleSubmit(onSubmit)}
			/>
			<View style={styles.linkWrapper}>
				<Text style={styles.text}>Already Have a Account ?</Text>
				<Link style={styles.link} href='/signIn'>
					Sign In
				</Link>
			</View>
		</View>
	)
}
function useStyles() {
	const { theme } = useTheme()
	return StyleSheet.create({
		inputWrapper: {
			marginVertical: 15,
			marginHorizontal: 15,
		},
		linkWrapper: {
			marginVertical: 15,
			marginHorizontal: 15,
			marginBottom: 30,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 8,
		},
		text: {
			color: theme.colors.primary,
			fontSize: 16,
			fontWeight: 'bold',
		},
		link: {
			color: 'skyblue',
			fontSize: 16,
			fontWeight: 'bold',
		},

		checkBoxWrapper: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 14,
		},
		inputLabel: { color: theme.colors.primary, fontSize: 18 },
		input: {
			color: theme.colors.primary,
			backgroundColor: theme.colors.input,
			marginTop: 6,
			borderRadius: 4,
			paddingHorizontal: 20,
			paddingVertical: 15,
		},

		errorText: {
			color: theme.colors.destructive,
		},
		button: {
			marginVertical: 15,
			marginHorizontal: 15,
		},
	})
}
