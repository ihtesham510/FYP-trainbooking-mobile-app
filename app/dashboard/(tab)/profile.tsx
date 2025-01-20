import ThemedText from '@/components/ui/ThemedText'
import { useTheme } from '@/context/themeContext'
import { View } from 'react-native'

export default function Profile() {
	const { theme } = useTheme()
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ThemedText>Bookings</ThemedText>
		</View>
	)
}
