import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItem = async (key: string): Promise<any> => {
	try {
		const data = await AsyncStorage.getItem(key)
		if (data) {
			return JSON.parse(data)
		}
		return null
	} catch (err) {
		throw new Error('Error while getting storage')
	}
}
export const setItem = async (key: string, value: any): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value))
	} catch (err) {
		throw new Error('Error while setting value')
	}
}

export const removeItem = async (key: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key)
	} catch (err) {
		throw new Error('Error while removing Item')
	}
}
