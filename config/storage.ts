import { MMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

export const storage = new MMKV();

export const standardStorage = {
  setItem: (key: string, value: boolean | string | number | ArrayBuffer) => {
    return storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    return storage.delete(key);
  },
};

export const zustandStorage: StateStorage = standardStorage
