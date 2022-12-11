const urlConstants = {
  /* User API */
  URL_USER_REGISTRATION: "/registration",
  URL_USER_REGISTRATION_GOOGLE: "/registrationGoogle",
  URL_USER_REGISTRATION_CHECK_FLAG: "/checkFlag",
  URL_USER_LOGIN: "/login",
  URL_USER_LIST: "/:user_role",

  /*Mentor Api*/
  URL_MENTOR_REGISTRATION: "/registration",
  URL_MENTOR_FETCH: "/fetch/:id",
  URL_MENTOR_BOOKING_ADD: "/booking/add",
  URL_MENTOR_PROFILE: "/profile",
  URL_BOOKING: "/createBooking",
  URL_ADD_MEET_LINK: "/addMeetLink",
  URL_GET_MENTOR_SLOT: "/getSlot",
  URL_SET_MENTOR_SLOT: "/setSlot",
  URL_GET_MENTOR_BOOKING: "/getMentorBooking",

  /* Candidate API */
  URL_CANDIDATE_REGISTRATION: "/registration",
  URL_CANDIDATE_LOGIN: "/login",
  URL_GET_CANDIDATE: "/",
  URL_LINKED_LOGIN: "/linkedin",
  URL_TEMP_USER_DATA_SAVE: "/temp/register",
  URL_GET_TEMP_USER_DATA: "/temp/data",
  URL_UPDATE_USER_REGISTRATION_STATUS: "/update/status",

  URL_GET_WORK_EXP: "/addWork",

  /* Expert API */
  URL_EXPERT_REGISTRATION: "/registration",
  URL_EXPERT_LOGIN: "/login",

  /* Employer API */
  URL_EMPLOYER_REGISTRATION: "/registration",

  /* Job API */
  URL_POST_JOB: "/save",
  URL_GET_JOB: "/list",
  URL_GET_JOBV2: "/listv2",
  URL_FILTER_JOB: "/filter",
  URL_GET_JOB_DETAILS: "/details/:id",
  URL_GET_ALL_JOBS: "/getALL",
  /* Graduation API */
  URL_GET_HEALTH: "/",

  /* Lookup API */
  URL_GET_LOOKUP: "/",
  URL_STORE_LOOKUP: "/storeAll",

  /* User Profile API */
  FILTER_BY_ID: "/applicant/:id",
  FILTER_USERS: "/filter",
  PAGINATE_USERS: "/paginate",
  URL_GET_USER_PROFILE: "/:user_id",
  URL_GET_USER_PROFILE_V2: "/getProfile",
  URL_GET_MENTOR_PROFILE: "/getMentorProfile",
  URL_UPDATE_USER_PROFILE: "/update/:user_id",

  /* Job application */

  URL_POST_JOB_APPLICATION: "/apply", 
  URL_APPLIED_JOB_STATUS: "/applied/status",
  URL_GET_JOB_APPLICATION: "/",
  URL_GET_APPLICANT: "/getApplicant",
  // RazorPay
  RAZOR_PAY_VERIFICATION: "/verification",
  RAZOR_PAY_PAY: "/razorpay",

  //BGV route url
  POST_BGV: "/apply",
  GET_USERS: "/users",
  UPLOAD_BGV: "/addPdf",
  FETCH_BGV: "/single/:id",
};
module.exports = urlConstants;
