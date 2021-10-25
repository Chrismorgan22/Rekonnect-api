const urlConstants = {

    /* User API */
    URL_USER_REGISTRATION: '/registration',
    URL_USER_LOGIN: '/login',
    URL_USER_LIST: '/:user_role',

    /* Candidate API */
    URL_CANDIDATE_REGISTRATION: '/registration',
    URL_CANDIDATE_LOGIN: '/login',
    URL_GET_CANDIDATE: '/',
    URL_LINKED_LOGIN: '/linkedin',
    URL_TEMP_USER_DATA_SAVE: '/temp/register',
    URL_GET_TEMP_USER_DATA: '/temp/data',
    URL_UPDATE_USER_REGISTRATION_STATUS: '/update/status',


    /* Expert API */
    URL_EXPERT_REGISTRATION: '/registration',
    URL_EXPERT_LOGIN: '/login',

    /* Employer API */
    URL_EMPLOYER_REGISTRATION: '/registration',

    /* Job API */
    URL_POST_JOB: '/save',
    URL_GET_JOB: '/list',
    URL_FILTER_JOB: '/filter',

    /* Graduation API */
    URL_GET_HEALTH: '/',

    /* Lookup API */
    URL_GET_LOOKUP: '/',

    /* User Profile API */
    URL_GET_USER_PROFILE: '/:user_id',
    URL_UPDATE_USER_PROFILE: '/update/:user_id'
}
module.exports = urlConstants;
