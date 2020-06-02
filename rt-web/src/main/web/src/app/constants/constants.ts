// 'http://localhost:9080/api/'
//  'http://localhost:9080/login'
//  'http://localhost:9080/logout'
//  'http://localhost:9080/socket'

// 'http://192.168.43.238:7001/rt-settlement/api/';
//  'http://192.168.43.238:7001/rt-settlement/login'
//  'http://192.168.43.238:7001/rt-settlement/logout'
//  'http://192.168.43.238:7001/rt-settlement/socket'

const baseAddress = 'http://localhost:9080/api/';
const login = 'http://localhost:9080/login';
const logout = 'http://localhost:9080/logout';
const socket = 'http://localhost:9080/socket';

export const link = {
    baseAddress: baseAddress,
    login: login,
    logout: logout,
    socket: socket    

};

export const fillSessionVariables = {
    apiUrl: link.baseAddress + 'users/fillsessionvariables'
  };

// Dashboard
export const getFailedPendingTransPartners = {
        apiUrl: link.baseAddress + 'generic/getFailedPendingTransPartners'
  };

export const getTotalPercDashStats = {
    apiUrl: link.baseAddress + 'generic/getTotalPercDashStats'
};

export const getGraphStatsDashboard = {
    apiUrl: link.baseAddress + 'generic/getGraphStatsDashboard'
};

// Live summary page
export const getNosTransFrchannels = {
    apiUrl: link.baseAddress + 'generic/getNosTransFrchannels'
};

// Search Page
export const getSearchTransactions = {
    apiUrl: link.baseAddress + 'search/getSearchTransactions'
};

export const getSearchTransactionDetail = {
    apiUrl: link.baseAddress + 'search/getSearchTransactionDetail'
};

export const getSenderKycDetails = {
    apiUrl: link.baseAddress + 'search/getSenderKycDetails'
};

export const getReceiverKycDetails = {
    apiUrl: link.baseAddress + 'search/getReceiverKycDetails'
};

export const getSearchReportDetails = {
    apiUrl: link.baseAddress + 'search/getReportDetails'
};

// Stats Page
export const getTranResponseMsgCount = {
    apiUrl: link.baseAddress + 'generic/getTranResponseMsgCount'
};

export const getGraphFrStatsTab = {
    apiUrl: link.baseAddress + 'generic/getGraphFrStatsTab'
};

export const getGraphFrStatsTabCustom = {
  apiUrl: link.baseAddress + 'generic/getGraphFrStatsTabCustom'
};
// User management
export const fetchAdUser = {
    apiUrl: link.baseAddress + 'users/fetchaduser/{email}/'
};

export const createCustomUser = {
    apiUrl: link.baseAddress + 'users/createCustomUser'
};

// Report Page
export const getReportTotals = {
    apiUrl: link.baseAddress + 'generic/getTransStatesTotalReport'
};

export const getReportTransactionTable = {
    apiUrl: link.baseAddress + 'generic/getReportDetailsfrReport'
};
export  const getReportDetailTotals = {
  apiUrl: link.baseAddress + 'generic/getTransVolValReport'
};  //Error table on details

export  const getResponseErrorData = {
  apiUrl: link.baseAddress + 'generic/getErrorResponseReport'
};

export const getTransChannelsReport = {
  apiUrl: link.baseAddress + 'generic/getTransChannelsReport'
};

export const getReportResponseMessage = {

    apiUrl: link.baseAddress + 'generic/getTranResponseMsgCount'
};

export const getReportChannelStats = {
    apiUrl: link.baseAddress + 'generic/getTotalChannelTransStats'
};

// User management
export const getAllUsers = {
    apiUrl: link.baseAddress + 'users/findAll'
};

export const getAppprovedUsers = {
    apiUrl: link.baseAddress + 'users/fetchApproved'
};

export const getUnAppprovedUsers = {
    apiUrl: link.baseAddress + 'users/fetchUnApproved'
};

export const appproveUser = {
    apiUrl: link.baseAddress + 'users/approve/{id}'
};

export const findById = {
    apiUrl: link.baseAddress + 'users/findById/{id}'
};

export const rejectPending = {
    apiUrl: link.baseAddress + 'users/rejectPending/{id}'
};

export const fetchPending = {
    apiUrl: link.baseAddress + 'users/fetchRejected'
};

export const updateUser = {
    apiUrl: link.baseAddress + 'users/updateUser'
};

export const updatePassword = {
    apiUrl: link.baseAddress + 'users/updatePassword/{id}'
};

export const resetPassword = {
    apiUrl: link.baseAddress + 'users/resetPassword'
};

export const resetPasswordRequest = {
    apiUrl: link.baseAddress + 'users/sendEmailOnForgottenPassword'
};

// Mail
export const sendMail = {
    apiUrl: link.baseAddress + 'generateAndSendEmail'
};


