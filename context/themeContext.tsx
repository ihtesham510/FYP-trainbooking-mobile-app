import { type Theme, darkTheme, lightTheme } from '@/theme'
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

type TypeTheme = 'dark' | 'light'
interface ThemeContext {
	mode: TypeTheme
	theme: Theme
	toggleMode: () => void
}
const themeContext = createContext<ThemeContext | null>(null)

export default function ThemeProvider({ children }: PropsWithChildren) {
	const [mode, setTheme] = useState<TypeTheme>('dark')
	const toggleMode = useCallback(
		() => setTheme(prev => (prev === 'light' ? 'dark' : 'light')),
		[mode],
	)
	const theme = useMemo(
		() => (mode === 'dark' ? darkTheme : lightTheme),
		[mode],
	)
	return (
		<themeContext.Provider value={{ mode, toggleMode, theme }}>
			{children}
		</themeContext.Provider>
	)
}

export const useTheme = () => {
	const ctx = useContext(themeContext)
	if (!ctx) {
		throw new Error('Theme Context Must be provided')
	}
	return ctx
}
