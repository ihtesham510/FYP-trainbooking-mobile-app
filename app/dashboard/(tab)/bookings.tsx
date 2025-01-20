import ThemedButton from '@/components/ui/ThemedButton'
import ThemedText from '@/components/ui/ThemedText'
import { useTheme } from '@/context/themeContext'
import { View } from 'react-native'

export default function Bookings() {
	const { theme, toggleMode } = useTheme()
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ThemedText>Booking</ThemedText>
			<ThemedButton title='change theme' onPress={toggleMode} />
		</View>
	)
}
