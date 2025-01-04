import { useTheme } from '@/context/themeContext'
import { useMemo } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	ViewStyle,
	TextStyle,
} from 'react-native'

interface ThemedButtonProps {
	title: string
	onPress?: () => void
	variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost'
	disabled?: boolean
	paddingVertical?: number
	fontSize?: number
	paddingHorizontal?: number
	style?: ViewStyle // To override button container styles
	textStyle?: TextStyle // To override text styles
}

export default function ThemedButton({
	title,
	onPress,
	variant = 'default',
	disabled = false,
	paddingVertical = 10,
	paddingHorizontal = 120,
	fontSize = 16,
	style, // New style prop for button container
	textStyle, // New textStyle prop for the text
}: ThemedButtonProps) {
	const { theme } = useTheme()

	const getTextColor = useMemo(() => {
		switch (variant) {
			case 'default':
				return disabled
					? theme.colors.mutedForeground
					: theme.colors.primaryForeground
			case 'outline':
				return disabled ? theme.colors.mutedForeground : theme.colors.primary
			case 'destructive':
				return disabled
					? theme.colors.mutedForeground
					: theme.colors.destructiveForeground
			case 'secondary':
				return disabled
					? theme.colors.mutedForeground
					: theme.colors.secondaryForeground
			case 'ghost':
				return disabled ? theme.colors.muted : theme.colors.primary
			default:
				return 'gray'
		}
	}, [theme, variant, disabled])

	const styles = StyleSheet.create({
		default: {
			backgroundColor: disabled ? theme.colors.muted : theme.colors.primary,
			borderRadius: 4,
			paddingVertical: paddingVertical,
			paddingHorizontal: paddingHorizontal,
		},
		outline: {
			borderColor: disabled ? theme.colors.muted : theme.colors.primary,
			borderWidth: 1,
			borderRadius: 4,
			paddingVertical: paddingVertical,
			paddingHorizontal: paddingHorizontal,
		},
		destructive: {
			backgroundColor: disabled ? theme.colors.muted : theme.colors.destructive,
			borderRadius: 4,
			paddingVertical: paddingVertical,
			paddingHorizontal: paddingHorizontal,
		},
		secondary: {
			backgroundColor: disabled ? theme.colors.muted : theme.colors.secondary,
			borderRadius: 4,
			paddingVertical: paddingVertical,
			paddingHorizontal: paddingHorizontal,
		},
		ghost: {
			paddingVertical: paddingVertical,
			paddingHorizontal: paddingHorizontal,
		},
		text: {
			color: getTextColor,
			fontSize: fontSize,
			textAlign: 'center',
		},
	})

	const buttonStyle = [styles[variant], style]
	const buttonTextStyle = [styles.text, textStyle]

	return (
		<TouchableOpacity
			onPress={() => onPress && onPress()}
			disabled={disabled}
			style={buttonStyle}
		>
			<Text style={buttonTextStyle}>{title}</Text>
		</TouchableOpacity>
	)
}
