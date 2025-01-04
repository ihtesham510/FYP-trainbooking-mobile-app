import { PropsWithChildren } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

export default function ConvexReactProvider({ children }: PropsWithChildren) {
	const client = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
		unsavedChangesWarning: false,
	})
	return <ConvexProvider client={client}>{children}</ConvexProvider>
}
