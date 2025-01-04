import { getItem, removeItem, setItem } from '@/lib/asyncStorage'
import { useEffect, useState } from 'react'

export default function useStoredState<T>(key: string) {
	const [state, setState] = useState<T | null>(null)

	useEffect(() => {
		;(async () => {
			const data = await getItem(key)
			if (!data) {
				setState(null)
			}
			setState(data as T)
		})()
	}, [])

	useEffect(() => {
		;(async () => (state !== null ? await setItem(key, state) : undefined))()
	}, [state])
	const removeState = () => {
		removeItem(key)
		setState(null)
	}
	return [state, setState, removeState] as const
}
