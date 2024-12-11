import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  profileImage: string | null; // Stores the profile image URI
  invitedContacts: Contact[]; 
}

interface Contact {
  id: string; 
  firstName: string;
  lastName: string;
  image?: { uri: string };
}



const initialState: GlobalState = {
  profileImage: null,
  invitedContacts: [],

};



export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
    addInvitedContact: (state, action: PayloadAction<Contact>) => {
      if (state.invitedContacts.length < 5) {
        state.invitedContacts.push(action.payload);
      }
    },
  },
});

export const { setUserProfileImage,  addInvitedContact, } = globalSlice.actions;

export default globalSlice.reducer;
