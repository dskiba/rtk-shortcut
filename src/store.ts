import type { PreloadedState } from '@reduxjs/toolkit'
import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  name: string
  surname: string
  country: string
  city: string
  hobbies: string
}

const initialState: IUser = {
  name: 'John',
  surname: 'Doe',
  country: 'US',
  city: 'New-York',
  hobbies: ''

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setByKey: <T extends keyof IUser>(
      state: IUser,
      action: PayloadAction<{ k: T; v: IUser[T] }>
    ) => {
      const { k, v } = action.payload
      state[k] = v
      return state
    }
  }
})

const { setByKey } = userSlice.actions
export const actionSeyByKey = <K extends keyof IUser>(k: K, v: IUser[K]) => setByKey({ k, v })


const rootReducer = combineReducers({
  user: userSlice.reducer
})

export const setupStore = (preloadedState?: PreloadedState<TRootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}


export type TRootState = ReturnType<typeof rootReducer>;

export const selectUserField = (key: keyof IUser) => (state: TRootState) => state.user[key]
