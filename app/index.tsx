import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ThemedText from '@/components/ui/ThemedText'
import trainImage from '../components/assets/train.jpg'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import Icon from 'react-native-vector-icons/Feather'

export default function Index() {
	const router = useRouter()
	const { user } = useAuth()
	useEffect(() => {
		if (user) {
			router.navigate('/dashboard')
		}
	}, [user, router])
	return (
		<ImageBackground
			source={trainImage}
			resizeMode='cover'
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: 'rgba(0,0,0,0.7)',
				}}
			>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						paddingVertical: 190,
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontFamily: 'SpaceMono Regular',
							fontSize: 70,
							color: 'white',
						}}
					>
						Welcome
					</Text>
					<Text
						style={{
							fontWeight: 'light',
							fontSize: 23,
							width: 250,
							textAlign: 'center',
							color: 'gray',
						}}
					>
						Create an Account to book <ThemedText>Your First Trip</ThemedText>
					</Text>
				</View>

				<Link
					href={user ? '/dashboard' : '/signUp'}
					style={{
						backgroundColor: 'white',
						marginHorizontal: '10%',
						marginVertical: '10%',
						padding: 14,
						borderRadius: 10,
					}}
				>
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text
							style={{
								color: 'black',
								fontSize: 18,
								width: '90%',
							}}
						>
							{user ? 'DashBoard' : 'Get Started'}
						</Text>
						<Icon name='arrow-right' size={25} color='black' />
					</View>
				</Link>
			</View>
		</ImageBackground>
	)
}
