/* Core */
import {
    configureStore,
    type ThunkAction,
    type Action,
} from "@reduxjs/toolkit";
import {
    useSelector as useReduxSelector,
    useDispatch as useReduxDispatch,
    type TypedUseSelectorHook,
} from "react-redux";

/* Instruments */
import {reducer} from "./rootReducer";
import {customerApi} from "@/lib/redux/api/customerApi";
// import { middleware } from "./middleware";

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(customerApi.middleware);
    },
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>;