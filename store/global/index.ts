import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

interface GlobalState {
  profileImage: string | null; // Stores the profile image URI
  invitedContacts: Contact[]; 
  customLockButtonIsOpen?: boolean
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
  customLockButtonIsOpen: false

};



export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
    addInvitedContact: (state, action: PayloadAction<Contact>) => {
      if (state.invitedContacts.length > 5) {
        Alert.alert(
          "Limit Reached",
          "You can only invite up to 5 contacts.",
          [{ text: "OK" }],
          { cancelable: true }
        );
    
     
      } else if (state.invitedContacts.length <= 5) {
        state.invitedContacts.push(action.payload);
      }
    },
    setCustomLockButtonIsOpen: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.customLockButtonIsOpen = action.payload
    }
  },
});

export const { setUserProfileImage,  addInvitedContact, setCustomLockButtonIsOpen } = globalSlice.actions;

export default globalSlice.reducer;
