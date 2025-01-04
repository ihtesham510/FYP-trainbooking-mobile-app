import { useTheme } from '@/context/themeContext'
import { useState } from 'react'
import {
	Pressable,
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	type TextInputProps,
	type ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface PasswordInputProps extends Omit<TextInputProps, 'style'> {
	inputStyle: StyleProp<ViewStyle>
}
export default function PasswordInput(props: PasswordInputProps) {
	const [visible, setVisibility] = useState<boolean>(false)
	const { theme } = useTheme()
	const style = StyleSheet.create({
		inputView: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
	})
	return (
		<View style={[style.inputView, props.inputStyle]}>
			<TextInput
				secureTextEntry={!visible}
				{...props}
				style={{
					width: '85%',
					color: theme.colors.primary,
				}}
			/>
			<Pressable
				style={{
					paddingHorizontal: '3%',
					paddingVertical: 10,
				}}
				onPress={() => setVisibility(prev => !prev)}
			>
				<Icon
					name={visible ? 'eye' : 'eye-off'}
					size={18}
					color={theme.colors.primary}
				/>
			</Pressable>
		</View>
	)
}
