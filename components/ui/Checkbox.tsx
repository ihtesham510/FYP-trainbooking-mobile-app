import { useTheme } from '@/context/themeContext'
import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface CheckBoxProps extends PressableProps {
	onChange?: (value: boolean) => void
	size?: number
	value?: boolean
}

export default function Checkbox({
	onChange,
	size = 20,
	value = false,
	...props
}: CheckBoxProps) {
	const [checked, setChecked] = useState(value)
	const { theme } = useTheme()
	const styles = StyleSheet.create({
		checkbox: {
			width: size,
			height: size,
			borderRadius: 4,
			borderWidth: 2,
			borderColor: theme.colors.muted,
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: 8,
		},
		checked: {
			backgroundColor: theme.colors.primary,
		},
		label: {
			fontSize: 16,
			color: theme.colors.background,
		},
	})

	useEffect(() => {
		if (onChange) {
			onChange(checked)
		}
	}, [checked])

	return (
		<Pressable
			style={[styles.checkbox, checked && styles.checked]}
			{...props}
			onPress={() => {
				setChecked(!checked)
			}}
		>
			{checked && (
				<Icon name='check' size={size - 5} color={theme.colors.background} />
			)}
		</Pressable>
	)
}
