import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

interface AuthState {
  userInfo?: UserProfile;
}

interface UserProfile {
  // Define fields for UserProfile here
}

export interface RootState {
  auth: AuthState;
}

const initialState: AuthState = {
  userInfo: undefined,
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
    reset: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { setUserInfo, reset } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const persistConfig = {
  key: "auth-x",
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, authSlice.reducer);
