import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import authReducer from './auth/index'
import globalReducer from './global/index'
import invitedContactsReducer from './global/index'


const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    invitedContacts: invitedContactsReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
