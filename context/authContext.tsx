import { useQuery } from '@/cache/useQuery'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useStoredState from '@/hooks/useStoredState'
import { type User } from '@/lib/types'
import { useConvex, useMutation } from 'convex/react'
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
} from 'react'

type SignInUser = {
	email?: string | undefined
	phone?: string | undefined
	username?: string | undefined
	password: string
}

interface AuthContext {
	user: User | null
	signUp: (user: Omit<User, '_id' | '_creationTime'>) => void
	signIn: (user: SignInUser) => void
	signOut: () => void
}

const authContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
	const [userId, setUserId, removeUserId] = useStoredState<Id<'user'>>('token')
	const user = useQuery(api.user.getUser, { userId: userId ?? undefined })
	const authenticate = useMutation(api.user.authenticateUser)
	const convex = useConvex()
	const signIn = useCallback(
		async (user: SignInUser) => {
			const key = await authenticate({
				username: user.username,
				email: user.email,
				phone: user.phone,
				password: user.password,
			})
			if (key) {
				return setUserId(userId)
			}
			if (!key) throw new Error('Error while signing in')
		},
		[setUserId],
	)
	const signUp = useCallback(
		async (user: Omit<User, '_id' | '_creationTime'>) => {
			const key = await convex.mutation(api.user.createUser, { ...user })
			if (key) {
				setUserId(key)
			}
		},
		[setUserId],
	)
	const signOut = removeUserId
	return (
		<authContext.Provider value={{ user, signIn, signUp, signOut }}>
			{children}
		</authContext.Provider>
	)
}
export function useAuth() {
	const ctx = useContext(authContext)
	if (!ctx) throw new Error('Auth Provider was not provided in the root folder')
	return ctx
}
