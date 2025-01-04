import { TextProps, Text } from 'react-native'
import { useTheme } from '@/context/themeContext'

interface ThemedTextProps extends TextProps {
	varient?: 'default' | 'muted' | 'destrcutive'
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

const ThemedText = (props: ThemedTextProps) => {
	const { theme } = useTheme()
	const getTextSize = () => {
		switch (props.size) {
			case 'sm':
				return 15
			case 'md':
				return 20
			case 'lg':
				return 25
			case 'xl':
				return 30
			case '2xl':
				return 34
			case '3xl':
				return 38
			case '4xl':
				return 42
			default:
				return 20
		}
	}
	const getTextColor = () => {
		switch (props.varient) {
			case 'destrcutive':
				return theme.colors.destructive
			case 'muted':
				return theme.colors.muted
			default:
				return theme.colors.primary
		}
	}
	return (
		<Text
			{...props}
			style={[
				props.style,
				{
					fontSize: getTextSize(),
					fontWeight: 100,
					color: getTextColor(),
				},
			]}
		/>
	)
}
export default ThemedText
