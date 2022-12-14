import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import arrowSlice from '../features/arrow/arrowSlice';
import authSlice from '../features/auth/authSlice';
import cursorSlice from '../features/cursor/cursorSlice';
import entrySlice from '../features/entry/entrySlice';
import searchSlice from '../features/search/searchSlice';
import sheafSlice from '../features/sheaf/sheafSlice';
import spaceSlice from '../features/space/spaceSlice';
import tabSlice from '../features/tab/tabSlice';
import twigSlice from '../features/twig/twigSlice';
import userSlice from '../features/user/userSlice';
import voteSlice from '../features/vote/voteSlice';

export const store = configureStore({
  reducer: {
    arrow: arrowSlice,
    auth: authSlice,
    cursor: cursorSlice,
    entry: entrySlice,
    search: searchSlice,
    sheaf: sheafSlice,
    space: spaceSlice,
    tab: tabSlice,
    twig: twigSlice,
    user: userSlice,
    vote: voteSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


