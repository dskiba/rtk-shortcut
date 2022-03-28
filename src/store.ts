import {
  combineReducers,
  configureStore,
  createReducer,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { pokemonApi } from "./services/pokemon";

// Define a type for the slice state
interface ITestState {
  name: string;
  surname: string;
}

// Define the initial state using that type
const initialState: ITestState = {
  name: "John",
  surname: "Doe"
};

export const testReducer = createSlice({
  name: "test",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setByKey: <T extends keyof ITestState>(
      state: ITestState,
      action: PayloadAction<{ k: T; v: ITestState[T] }>
    ) => {
      const { k, v } = action.payload;
      state[k] = v;
      return state;
    }
  }
});

export const { setByKey } = testReducer.actions;

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  test: testReducer.reducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
