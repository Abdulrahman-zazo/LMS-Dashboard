import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/User/userSlice";
import langReducer from "./features/Language/LanguageSlice";
import settingsModalReducer from "./features/settings/settingsModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "./features/User/userApi";
import { CoursesApi } from "./features/Courses/CoursesApi";
import { CurriculumsApi } from "./features/Curriculum/CurriculumApi";
import { CommentsApi } from "./features/Comments/CommentsApi";
import { OfferApi } from "./features/Offer/OfferApi";
import { ComplaintsApi } from "./features/Complaints/ComplaintsApi";
import { SubjectsApi } from "./features/Curriculum/Subject/SubjectApi";
import { StagesApi } from "./features/Curriculum/Stage/StageApi";
export const store = configureStore({
  reducer: {
    user: userReduser,
    // uiSlice: uiReduser,
    language: langReducer,
    settingsModal: settingsModalReducer,
    [userApi.reducerPath]: userApi.reducer,
    [CoursesApi.reducerPath]: CoursesApi.reducer,
    [CurriculumsApi.reducerPath]: CurriculumsApi.reducer,
    [CommentsApi.reducerPath]: CommentsApi.reducer,
    [OfferApi.reducerPath]: OfferApi.reducer,
    [ComplaintsApi.reducerPath]: ComplaintsApi.reducer,
    [SubjectsApi.reducerPath]: SubjectsApi.reducer,
    [StagesApi.reducerPath]: StagesApi.reducer,
  },

  // 1- Using Api middleware

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      CoursesApi.middleware,
      CurriculumsApi.middleware,
      CommentsApi.middleware,
      OfferApi.middleware,
      ComplaintsApi.middleware,
      SubjectsApi.middleware,
      StagesApi.middleware
    ), // إضافة middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
