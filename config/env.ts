import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

const API_URL = extra?.API_URL ?? "";

export { API_URL };
