export type Theme = {
	colors: {
		background: string
		foreground: string
		card: string
		cardForeground: string
		popover: string
		popoverForeground: string
		primary: string
		primary50: string
		primary75: string
		primaryForeground: string
		secondary: string
		secondaryForeground: string
		muted: string
		mutedForeground: string
		accent: string
		accentForeground: string
		destructive: string
		destructiveForeground: string
		border: string
		input: string
		ring: string
		chart: {
			chart1: string
			chart2: string
			chart3: string
			chart4: string
			chart5: string
		}
	}
	radius: string
}

const lightTheme: Theme = {
	colors: {
		background: '#ffffff',
		foreground: '#3e3a3a',
		card: '#ffffff',
		cardForeground: '#3e3a3a',
		popover: '#ffffff',
		popoverForeground: '#3e3a3a',
		primary: '#181f2a',
		primary50: '#181f2a50',
		primary75: '#181f2a75',
		primaryForeground: '#f8f8f8',
		secondary: '#f1f5f9',
		secondaryForeground: '#181f2a',
		muted: '#f1f5f9',
		mutedForeground: '#757f91',
		accent: '#f1f5f9',
		accentForeground: '#181f2a',
		destructive: '#f75c5c',
		destructiveForeground: '#f8f8f8',
		border: '#c3c9d3',
		input: '#c3c9d3',
		ring: '#181f2a',
		chart: {
			chart1: '#f55e3b',
			chart2: '#2bc196',
			chart3: '#2e5f69',
			chart4: '#f2c531',
			chart5: '#f29b2d',
		},
	},
	radius: '8px',
}

const darkTheme: Theme = {
	colors: {
		background: '#111113',
		foreground: '#f8f8f8',
		card: '#1e1c1c',
		cardForeground: '#f8f8f8',
		popover: '#1e1c1c',
		popoverForeground: '#f8f8f8',
		primary: '#f8f8f8',
		primary50: '#f8f8f850',
		primary75: '#f8f8f875',
		primaryForeground: '#181f2a',
		secondary: '#2f2d3d',
		secondaryForeground: '#f8f8f8',
		muted: '#2f2d3d',
		mutedForeground: '#b3b3b3',
		accent: '#2f2d3d',
		accentForeground: '#f8f8f8',
		destructive: '#d23534',
		destructiveForeground: '#f8f8f8',
		border: '#2f2d3d',
		input: '#191c21',
		ring: '#d2c9d7',
		chart: {
			chart1: '#3a5aad',
			chart2: '#33b772',
			chart3: '#e35b2e',
			chart4: '#9a4ca7',
			chart5: '#e52a84',
		},
	},
	radius: '8px',
}

export { lightTheme, darkTheme }
