import { ConvexQueryCacheProvider } from '@/cache/provider'
import ConvexReactProvider from '@/components/convex-provider'
import { AuthProvider } from '@/context/authContext'
import ThemeProvider from '@/context/themeContext'
import { Stack } from 'expo-router'

export default function RootLayout() {
	return (
		<ConvexReactProvider>
			<ConvexQueryCacheProvider>
				<AuthProvider>
					<ThemeProvider>
						<Stack
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen name='index' />
							<Stack.Screen name='signIn/index' />
							<Stack.Screen name='signUp/index' />
							<Stack.Screen name='dashboard/_layout' />
						</Stack>
					</ThemeProvider>
				</AuthProvider>
			</ConvexQueryCacheProvider>
		</ConvexReactProvider>
	)
}
