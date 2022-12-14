import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../user/user";
import type { RootState } from '../../app/store';
import { v4 } from "uuid";

export interface AuthState {
  isInit: boolean;
  isValid: boolean;
  isComplete: boolean;
  sessionId: string;
  accessToken: string;
  interval: ReturnType<typeof setInterval> | null;
}

const initialState: AuthState = {
  isInit: false,
  isValid: false,
  isComplete: false,
  sessionId: v4(),
  accessToken: '',
  interval: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthIsInit: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isInit: action.payload,
      };
    },
    setAuthIsValid: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isValid: action.payload,
      };
    },
    setAuthIsComplete: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isComplete: action.payload,
      }
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        sessionId: action.payload,
      };
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
    setTokenInterval: (state, action: PayloadAction<ReturnType<typeof setInterval> | null>) => {
      return {
        ...state,
        interval: action.payload,
      }
    },
    setLogin: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        isValid: true,
      };
    },
    setLogout: (state) => {
      return {
        ...state,
        isValid: false,
        isComplete: false,
        accessToken: '',
      };
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isInit: true,
        isValid: action.payload,
      }
    }
  },
});

export const {
  setAuthIsInit,
  setAuthIsValid,
  setAuthIsComplete,
  setSessionId,
  setTokenInterval,
  setAccessToken,
  setInit,
  setLogin,
  setLogout,
} = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectTokenInterval = (state: RootState) => state.auth.interval;
export const selectAuthIsInit = (state: RootState) => state.auth.isInit;
export const selectAuthIsValid = (state: RootState) => state.auth.isValid;
export const selectAuthIsComplete = (state: RootState) => state.auth.isComplete;
export const selectSessionId = (state: RootState) => state.auth.sessionId;

export default authSlice.reducer;