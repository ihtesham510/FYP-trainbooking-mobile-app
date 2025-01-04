import { useTheme } from '@/context/themeContext'
import { StyleProp, View, ViewStyle } from 'react-native'
import PhoneInput from 'react-native-phone-input'
export default function ThemedPhoneInput(props: {
	value: string
	onChange: (e: string) => void
	style?: StyleProp<ViewStyle>
}) {
	const { theme } = useTheme()
	return (
		<View style={props.style}>
			<PhoneInput
				onChangePhoneNumber={e => props.onChange && props.onChange(e)}
				textStyle={{ color: theme.colors.primary }}
				initialCountry='pk'
				initialValue={props.value}
			/>
		</View>
	)
}
