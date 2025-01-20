import { useTheme } from '@/context/themeContext'
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet, Pressable } from 'react-native'
import { parseLabeltoIcon } from '@/lib/utils'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'
interface TabBarButtonProps {
	isFocused: boolean
	title: string
	onPress: () => void
	onLongPress: () => void
}
export default function TabBarButton(props: TabBarButtonProps) {
	const styles = useStyles()

	const {
		theme: { colors },
	} = useTheme()

	const textopacity = useSharedValue(1)
	const iconSize = useSharedValue(1)
	const iconPosition = useSharedValue(0)

	useEffect(() => {
		textopacity.value = withTiming(props.isFocused ? 0 : 1, { duration: 200 })
		iconSize.value = withTiming(props.isFocused ? 1.2 : 1, { duration: 300 })
		iconPosition.value = withSpring(props.isFocused ? 7 : 0, { duration: 400 })
	}, [props.isFocused])

	const textStyle = useAnimatedStyle(() => {
		return {
			opacity: textopacity.value,
			color: colors.background,
		}
	})
	const iconScaleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: iconSize.value,
				},
				{
					translateY: iconPosition.value,
				},
			],
		}
	})

	return (
		<Pressable
			onPress={props.onPress}
			style={[styles.pressable]}
			onLongPress={props.onLongPress}
		>
			<Animated.View style={[iconScaleStyle]}>
				<Icon
					size={25}
					color={props.isFocused ? colors.primary : colors.background}
					name={parseLabeltoIcon(props.title)}
				/>
			</Animated.View>
			<Animated.Text style={[styles.text, textStyle]}>
				{props.title}
			</Animated.Text>
		</Pressable>
	)
}
function useStyles() {
	return StyleSheet.create({
		pressable: {
			width: 60,
			height: 60,
			gap: 4,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 28,
		},
		text: {
			fontSize: 12,
			fontWeight: 'bold',
		},
	})
}
