export enum RoutePath {
  Login = "/login",
  Register = "/register",
  PaymentSuccess = "/success",
  PaymentCancel = "/cancel",
  SpecificProduct = "/products/:productId-:productTitle",
  Member = "/members/:userId",
  MainPage = '/',
  AddProduct = "/products/new",
  Followers = "/members/:userId/followers",
  EditProfile = "/settings/profile",
  MenCatalog = "/catalog/men",
  WomenCatalog = "/catalog/women",
  SearchBarText = "/q/:search_text?",
  Inbox = "/inbox/:userId*",
  AdminDashboard = "/dashboard/:tab",
  Followings = "/members/:userId/followings",
  
}
