import i18n, { type TSupportedLanguages } from "@/config/i18n";
import { zustandStorage } from "@/config/storage";
import createSelectors from "@/utils/createSelectors";
import { ThemeStorage } from "@/utils/themeStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface AppStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  locale: TSupportedLanguages | null;
  setLocale: (locale: TSupportedLanguages) => void;
}

// const useAppBase = create<AppStore>()((set) => ({
//   theme: "light",
//   setTheme: (theme: Theme) => {
//     set(() => {
//       ThemeStorage.storeTheme(theme);
//       return { theme };
//     });
//   },
//   toggleTheme: () => {
//     set((state) => {
//       const newTheme = state.theme === "light" ? "dark" : "light";
//       ThemeStorage.storeTheme(newTheme);
//       return { theme: newTheme };
//     });
//   },
// }));

const useAppBase = create<AppStore>()(
  persist(
    (set) => ({
      locale: null,
      setLocale: (locale: TSupportedLanguages) => {
        i18n.changeLanguage(locale);
        set({ locale });
      },
      theme: "light",
      setTheme: (theme: Theme) => {
        set(() => {
          ThemeStorage.storeTheme(theme);
          return { theme };
        });
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          ThemeStorage.storeTheme(newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: "app",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

const useApp = createSelectors(useAppBase);

export default useApp;
