import type { Theme } from "@/stores/appStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class ThemeStorage {
	static THEME = "THEME";

	static async storeTheme(theme: Theme) {
		await AsyncStorage.setItem(ThemeStorage.THEME, theme);
	}

	static async getTheme() {
		return await AsyncStorage.getItem(ThemeStorage.THEME);
	}

	static async reset() {
		await AsyncStorage.removeItem(ThemeStorage.THEME);
	}
}
