import { configureStore, combineReducers } from "@reduxjs/toolkit";
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

// استيراد أداة التخزين - هنا بنستخدم localStorage افتراضيًا
import storage from "redux-persist/lib/storage";

// استيراد الأدوات اللازمة للتخزين الدائم
import { persistReducer, persistStore } from "redux-persist";

// إعداد config لـ redux-persist
const persistConfig = {
  key: "root-dashbord-h-platform",
  storage, // طريقة التخزين (localStorage)
  whitelist: [
    CoursesApi.reducerPath,
    userApi.reducerPath,
    OfferApi.reducerPath,
    CurriculumsApi.reducerPath,
    SubjectsApi.reducerPath,
    StagesApi.reducerPath,
    ComplaintsApi.reducerPath,
    usersApi.reducerPath,
  ],
};

// دمج كل الـ reducers العادية مع RTK Query reducers
const rootReducer = combineReducers({
  user: userReduser,
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
});

// تغليف الـ rootReducer بـ persistReducer لنفعّل التخزين الدائم
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      userApi.middleware,
      CoursesApi.middleware,
      CurriculumsApi.middleware,

      OfferApi.middleware,
      ComplaintsApi.middleware,
      SubjectsApi.middleware,
      StagesApi.middleware,
      usersApi.middleware
    ),
});
// إنشاء persistor يلي مسؤول عن تحميل/تخزين الحالة تلقائيًا
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
