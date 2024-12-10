import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  profileImage: string | null; // Stores the profile image URI
}

const initialState: GlobalState = {
  profileImage: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setUserProfileImage } = globalSlice.actions;

export default globalSlice.reducer;
