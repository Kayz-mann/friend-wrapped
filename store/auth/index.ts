import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

interface AuthState {
  userInfo?: UserProfile;
  isLoggedIn?: boolean;
}

interface UserProfile {
  // Define fields for UserProfile here
}

export interface RootState {
  auth: AuthState;
}

const initialState: AuthState = {
  userInfo: undefined,
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: "auth-v1",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserProfile>) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    reset: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { setUserInfo, reset, setIsLoggedIn } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const persistConfig = {
  key: "auth-x",
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, authSlice.reducer);
