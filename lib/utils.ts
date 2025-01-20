export function isEmail(input: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(input)
}

export function parseLabeltoIcon(label: string) {
	switch (label) {
		case 'Search':
			return 'search'
		case 'Bookings':
			return 'bookmark'
		case 'Profile':
			return 'user'
		default:
			return ''
	}
}
