/* --------------Auth---------------- */
export const LOGIN = "/api/login";
export const REGISTER = "/api/register";
export const LOGOUT = "/api/logout";
export const REGISTERBYGOOGLE = "/api/registerEmail";

export const SEND_CODE = "/api/SendCode";
export const NEW_PASSWORD = "/api/getNewPassword";
export const USERVERIFYEMAIL = "/api/UserVerifyEmail";

/* --------------Profile---------------- */
export const CHANGE_IMAGE = "/api/ChangeImage";
export const CHANGE_PASSWORD = "/api/ChangePassword";
export const USER_INFO = "/api/UserInformation";

/* --------------Users---------------- */
export const MAKE_ADMIN = "/api/MakeAdmin";
export const DELETE_USER = "/api/deleteUser";
export const GET_ALL_USERS = "/api/allUser";

/* --------------Courses---------------- */
export const GET_ALL_ADMIN_COURSES = "/api/AdminAllCourse";
export const GET_COURSE_BY_ID = "/api/getCourseById";
export const UPDATE_COURSE = "/api/updateCourse";
export const ADD_COURSE = "/api/addCourse";
export const DELETE_COURSE = "/api/deleteCourse";
export const CHANGE_STATUS_COURSE = "/api/ChangeActiveCourse";

/* -------------- Comments ------------*/
export const ACCEPT_COMMINTS = "/api/AcceptComment";
export const DELETE_COMMINTS = "/api/AdminDeleteComment";

/* -------------- Offers ------------*/
export const GET_ALL_OFFERS = "/api/UserAllOffers";
export const ADD_OFFERS = "/api/UserAllOffers";
export const UPDATE_OFFERS = "/api/UserAllOffers";
export const DELETE_OFFERS = "/api/UserAllOffers";

/* -------------- Curriculums ------------*/
export const GET_ALL_CURRICULUMS = "/api/AdminAllCurriculums";
export const ADD_CURRICULUMS = "/api/AddCurriculum";
export const DELETE_CURRICULUMS = "/api/deleteCurriculum";
export const UPDTAE_CURRICULUMS = "/api/updateCurriculum";

/* -------------- Subjects ------------*/
export const GET_ALL_SUBJECT = "/api/AdminAllSubject";
export const ADD_SUBJECT = "/api/AddSubject";
export const DELETE_SUBJECT = "/api/deleteSubject";
export const UPDTAE_SUBJECT = "/api/updateSubject";

/* -------------- Subjects ------------*/
export const GET_ALL_STAGE = "/api/AdminAllStage"; // ??
export const ADD_STAGE = "/api/AddStage";
export const DELETE_STAGE = "/api/deleteStage";
export const UPDTAE_STAGE = "/api/updateStage";

/* --------------- Complaints -------------- */
export const DELETE_COMPLAINT = "/api/deleteComplaint";
export const ALL_COMPLAINT = "/api/AllComplaints";

/* --------------- Statistics -------------- */
export const GET_ALL_STATISTICS = "/api/AllStatistics";
