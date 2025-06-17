import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/Admins/userSlice";
import langReducer from "./features/Language/LanguageSlice";
import settingsModalReducer from "./features/settings/settingsModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "./features/Admins/userApi";
import { CoursesApi } from "./features/Courses/CoursesApi";
import { CurriculumsApi } from "./features/Curriculum/CurriculumApi";
import { OfferApi } from "./features/Offer/OfferApi";
import { ComplaintsApi } from "./features/Complaints/ComplaintsApi";
import { SubjectsApi } from "./features/Curriculum/Subject/SubjectApi";
import { StagesApi } from "./features/Curriculum/Stage/StageApi";
import { usersApi } from "./features/Users/usersApi";
export const store = configureStore({
  reducer: {
    user: userReduser,
    // uiSlice: uiReduser,
    language: langReducer,
    settingsModal: settingsModalReducer,
    [userApi.reducerPath]: userApi.reducer,
    [CoursesApi.reducerPath]: CoursesApi.reducer,
    [CurriculumsApi.reducerPath]: CurriculumsApi.reducer,

    [OfferApi.reducerPath]: OfferApi.reducer,
    [ComplaintsApi.reducerPath]: ComplaintsApi.reducer,
    [SubjectsApi.reducerPath]: SubjectsApi.reducer,
    [StagesApi.reducerPath]: StagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  // 1- Using Api middleware

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      CoursesApi.middleware,
      CurriculumsApi.middleware,

      OfferApi.middleware,
      ComplaintsApi.middleware,
      SubjectsApi.middleware,
      StagesApi.middleware,
      usersApi.middleware
    ), // إضافة middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
