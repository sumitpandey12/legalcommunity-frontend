export default class APIURLs {
  static baseURL = "https://ifstatic.com";
  static register = "/auth/register";
  static login = "/auth/login";

  //Public routes
  static library = "/public/libraries";
  static posts = "/public/posts";
  static categories = "/public/categories";
  static comment = "/public/comments";
  static getExperts = "/public/experts";
  static getPost = "/public/post";
  static getLibrary = "/public/library";
  static search = "/public/search";

  //User routes
  static profile = "/user/profile";
  static applyExpert = "/user/apply-expert";
  static votePost = "/user/vote-post";
  static commentPost = "/user/comment-post";
  static raiseQuery = "/user/raise-query";
  static modifyQuery = "/user/modify-query";
  static requestConsultation = "/user/request-consultation";
  static reportUser = "/user/report-user";
  static reportQuery = "/user/report-query";
  static followUnfolow = "/user/follow-unfollow";
  static friends = "/user/friends";
  static myqueries = "/user/queries";
  static deleteQuery = "/user/delete-query";
  static updateProfile = "/user/update-profile";
  static reviewQuery = "/user/review-query";
  static getUsers = "/user/users";

  //Lawyer routes
  static submitCase = "/lawyer/submit-case";
  static getMyCases = "/lawyer/cases";
  static getRequestConsultation = "/lawyer/consultation-requests";
  static updateConsultation = "/lawyer/update-consultation";
  static requestPromosion = "/lawyer/request-promotion";
  static acceptRequest = "/lawyer/accept-request";
  static rejectRequest = "/lawyer/reject-request";
  static promos = "/lawyer/promos";
  static markResolved = "/lawyer/mark-resolved";
  static getAllReviews = "/lawyer/reviews";

  //chats
  static getChats = "/chat/chats";
  static createChat = "/chat/create";
  static addMessage = "/chat/message";
  static getMessages = "/chat/messages";
  static getUnreadCount = "/chat/unread-count";
  static setMessageRead = "/chat/set-message-read";
}
