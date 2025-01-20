import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import TabBarButton from './TabBarButton'
import { useTheme } from '@/context/themeContext'
import { useState } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

export default function TabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const styles = useStyles()
	const {
		theme: { colors },
	} = useTheme()
	const [dimensions, setDimensions] = useState({ height: 20, width: 100 })
	const tabBarWidth = dimensions.width / state.routes.length
	const tabPositionX = useSharedValue(0)
	const onLayout = (e: LayoutChangeEvent) => {
		setDimensions({
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
		})
	}

	const animatedTabBarButton = useAnimatedStyle(() => ({
		transform: [{ translateX: tabPositionX.value }],
	}))

	return (
		<View style={styles.container} onLayout={onLayout}>
			<Animated.View
				style={[
					animatedTabBarButton,
					{
						backgroundColor: colors.background,
						marginHorizontal: 84,
						position: 'absolute',
						width: tabBarWidth - 10,
						height: dimensions.height - 10,
						borderRadius: 35,
					},
				]}
			/>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name
				const isFocused = state.index === index
				const onPress = () => {
					tabPositionX.value = withSpring(tabBarWidth * (index - 1), {
						duration: 2000,
						stiffness: 20,
					})
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}
				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					})
				}
				return (
					<TabBarButton
						key={index}
						title={label.toString()}
						isFocused={isFocused}
						onLongPress={onLongPress}
						onPress={onPress}
					/>
				)
			})}
		</View>
	)
}

function useStyles() {
	const {
		theme: { colors },
	} = useTheme()
	return StyleSheet.create({
		container: {
			backgroundColor: colors.primary,
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 27,
			marginHorizontal: 84,
			borderRadius: 35,
			justifyContent: 'center',
			alignItems: 'center',
			gap: 15,
			flexDirection: 'row',
			paddingVertical: 8,
		},
	})
}
