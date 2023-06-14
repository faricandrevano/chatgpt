import { configureStore } from "@reduxjs/toolkit";
//import reducer from features 
import userReducer from "../feature/userSlice";
import dataReducer from "../feature/dataSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer
    // thread: threadReducer,
  },
});