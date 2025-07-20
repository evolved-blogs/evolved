import { Urls } from "./enum";

export const authenticatedRoutes = [
  Urls.Home,
  Urls.CreateBlog,
  Urls.ProfileView,
];

export const unauthenticatedRoutes = [Urls.Login, Urls.CreateAccount];
