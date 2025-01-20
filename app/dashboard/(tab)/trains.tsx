import ThemedText from '@/components/ui/ThemedText'
import { useTheme } from '@/context/themeContext'
import { View } from 'react-native'

export default function Trains() {
	const { theme } = useTheme()
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				flex: 1,
			}}
		>
			<ThemedText>Hellow world</ThemedText>
		</View>
	)
}
