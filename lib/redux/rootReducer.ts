/* Instruments */
import { customerApi } from "@/lib/redux/api/customerApi";
import authSlice from "./slices/auth/authSlice";

console.log(authSlice)
// console.log(customerApi)
export const reducer = {
    // counter: counterSlice.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    auth: authSlice,
};