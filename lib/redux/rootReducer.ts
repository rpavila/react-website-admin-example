/* Instruments */
import { customerApi } from "@/lib/redux/api/customerApi";
import authSlice from "./slices/auth/authSlice";

export const reducer = {
    [customerApi.reducerPath]: customerApi.reducer,
    auth: authSlice,
};