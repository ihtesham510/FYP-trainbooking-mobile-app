import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useTheme } from '@/context/themeContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidPhoneNumber } from 'react-phone-number-input'
import ThemedButton from '@/components/ui/ThemedButton'
import PasswordInput from '@/components/ui/PasswordInput'
import ThemedPhoneInput from '@/components/ui/phoneInput'
import { useState } from 'react'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAuth } from '@/context/authContext'
import { useNavigation, useRouter } from 'expo-router'
import { isEmail } from '@/lib/utils'

export default function SignInForm() {
	const [form, setForm] = useState(false)
	const styles = useFormStyles()
	return (
		<View>
			{form ? <SignInWithPhoneNoForm /> : <SignInWithUserNameOrEmail />}
			<View style={styles.switchButton}>
				<Text style={styles.text}>Sign in with</Text>
				<TouchableOpacity onPress={() => setForm(prev => !prev)}>
					<Text style={[styles.text, { color: 'skyblue' }]}>
						{form ? 'Username Or Email' : 'Phone No.'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

function SignInWithUserNameOrEmail() {
	const { theme } = useTheme()
	const convex = useConvex()
	const styles = useFormStyles()

	const formSchema = z
		.object({
			emailOrUserName: z.string().min(2),
			password: z.string().min(8),
		})
		.superRefine(async (values, ctx) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

			if (emailRegex.test(values.emailOrUserName)) {
				const emailExists = await convex.query(api.user.userExists, {
					email: values.emailOrUserName,
				})
				if (!emailExists) {
					ctx.addIssue({
						code: 'custom',
						path: ['emailOrUserName'],
						message: 'Email Does not exists',
					})
				}
				const id = await convex.mutation(api.user.authenticateUser, {
					email: values.emailOrUserName,
					password: values.password,
				})
				if (!id) {
					ctx.addIssue({
						code: 'custom',
						path: ['password'],
						message: 'Inncorrect Password',
					})
				}
			} else {
				const usernameExists = await convex.query(api.user.userExists, {
					username: values.emailOrUserName,
				})
				if (!usernameExists) {
					ctx.addIssue({
						code: 'custom',
						path: ['emailOrUserName'],
						message: 'Username Does not exists',
					})
				}
				const id = await convex.mutation(api.user.authenticateUser, {
					username: values.emailOrUserName,
					password: values.password,
				})
				if (!id) {
					ctx.addIssue({
						code: 'custom',
						path: ['password'],
						message: 'Inncorrect Password',
					})
				}
			}
		})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		reValidateMode: 'onSubmit',
	})
	const { signIn } = useAuth()
	const router = useRouter()
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log('Values', values)
		try {
			if (isEmail(values.emailOrUserName)) {
				signIn({
					email: values.emailOrUserName,
					password: values.password,
				})
			} else {
				signIn({
					username: values.emailOrUserName,
					password: values.password,
				})
			}
			router.navigate('/dashboard/(tab)/trains')
		} catch (err) {
			console.log('Error while signing in', err)
		}
	}
	return (
		<View>
			<Controller
				control={form.control}
				name='emailOrUserName'
				render={({ field: { onBlur, onChange, value } }) => (
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Username Or Email</Text>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor={theme.colors.primary50}
							style={styles.input}
							placeholder='@user123 Or user123@example.com'
						/>
						{form.formState.errors.emailOrUserName && (
							<Text style={styles.errorText}>
								{form.formState.errors.emailOrUserName.message}
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
				title={form.formState.isSubmitting ? 'Loading ...' : 'Submit'}
				style={styles.button}
				disabled={form.formState.isSubmitting}
				onPress={form.handleSubmit(onSubmit)}
			/>
		</View>
	)
}
function SignInWithPhoneNoForm() {
	const { theme } = useTheme()
	const convex = useConvex()
	const styles = useFormStyles()
	const formSchema = z
		.object({
			phoneNo: z.string().refine(isValidPhoneNumber, {
				message: 'Invalid phone number',
			}),
			password: z.string().min(8),
		})
		.superRefine(async (values, ctx) => {
			const phoneNoExists = await convex.query(api.user.userExists, {
				phone_no: values.phoneNo,
			})
			if (!phoneNoExists) {
				ctx.addIssue({
					code: 'custom',
					path: ['phoneNo'],
					message: 'PhoneNo. Does not exists',
				})
			}

			const id = await convex.mutation(api.user.authenticateUser, {
				phone: values.phoneNo,
				password: values.password,
			})
			if (!id) {
				ctx.addIssue({
					code: 'custom',
					path: ['password'],
					message: 'Inncorrect Password',
				})
			}
		})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		reValidateMode: 'onSubmit',
	})

	const { signIn } = useAuth()
	const router = useRouter()
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log('Values', values)
		try {
			signIn({
				phone: values.phoneNo,
				password: values.password,
			})
			router.navigate('/dashboard/(tab)/trains')
		} catch (err) {
			console.log('Error while signing in', err)
		}
	}

	return (
		<View>
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
				title={form.formState.isSubmitting ? 'Loading ...' : 'Submit'}
				style={styles.button}
				disabled={form.formState.isSubmitting}
				onPress={form.handleSubmit(onSubmit)}
			/>
		</View>
	)
}

function useFormStyles() {
	const { theme } = useTheme()
	return StyleSheet.create({
		inputWrapper: {
			marginVertical: 15,
			marginHorizontal: 15,
		},
		switchButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 4,
		},
		text: {
			fontSize: 16,
			color: theme.colors.primary,
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
