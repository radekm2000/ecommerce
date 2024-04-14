import { Redirect, Route, Switch } from "wouter";
import { RoutePath } from "../config/constants/navigation";

import { Suspense, lazy } from "react";
import { FallbackProgress } from "../utils/FallbackProgress";
import { Layout } from "../components/Layout";

const ProductRoute = lazy(() =>
  import("../components/pages/Product").then((module) => ({
    default: module.Product,
  }))
);

const LoginRoute = lazy(() =>
  import("../components/pages/Login").then((module) => ({
    default: module.Login,
  }))
);

const RegisterRoute = lazy(() =>
  import("../components/pages/Register").then((module) => ({
    default: module.Register,
  }))
);

const PaymentSuccessRoute = lazy(() =>
  import("../components/pages/PaymentSuccess").then((module) => ({
    default: module.PaymentSuccess,
  }))
);

const PaymentCancelRoute = lazy(() =>
  import("../components/pages/PaymentCancel").then((module) => ({
    default: module.PaymentCancel,
  }))
);

const MainPageRoute = lazy(() =>
  import("../components/pages/MainPage").then((module) => ({
    default: module.MainPage,
  }))
);

const MemberRoute = lazy(() =>
  import("../components/pages/Member").then((module) => ({
    default: module.Member,
  }))
);

const AddProductRoute = lazy(() =>
  import("../components/pages/AddProduct").then((module) => ({
    default: module.AddProduct,
  }))
);

const FollowersRoute = lazy(() =>
  import("../components/pages/Followers").then((module) => ({
    default: module.Followers,
  }))
);

const EditProfileRoute = lazy(() =>
  import("../components/pages/EditProfile").then((module) => ({
    default: module.EditProfile,
  }))
);

const MenCatalogRoute = lazy(() =>
  import("../components/pages/MenCatalog").then((module) => ({
    default: module.MenCatalog,
  }))
);

const WomenCatalogRoute = lazy(() =>
  import("../components/pages/WomenCatalog").then((module) => ({
    default: module.WomenCatalog,
  }))
);

const SearchBarTextRoute = lazy(() =>
  import("../components/pages/SearchTextResults").then((module) => ({
    default: module.SearchTextResults,
  }))
);

const InboxRoute = lazy(() =>
  import("../components/pages/Inbox").then((module) => ({
    default: module.Inbox,
  }))
);

const AdminDashboardRoute = lazy(() =>
  import("../components/pages/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  }))
);

const FollowingsRoute = lazy(() =>
  import("../components/pages/Followings").then((module) => ({
    default: module.Followings,
  }))
);
export const Routes = () => {
  return (
    <Switch>
      <Route path={RoutePath.Register}>
        <Suspense fallback={<FallbackProgress />}>
          <RegisterRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.Login}>
        <Suspense fallback={<FallbackProgress />}>
          <LoginRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.PaymentSuccess}>
        <Suspense fallback={<FallbackProgress />}>
          <PaymentSuccessRoute />
        </Suspense>
      </Route>
      <Route path={RoutePath.PaymentCancel}>
        <Suspense fallback={<FallbackProgress />}>
          <PaymentCancelRoute />
        </Suspense>
      </Route>
      <Layout>
        <Route path={RoutePath.MainPage}>
          <Suspense fallback={<FallbackProgress />}>
            <MainPageRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.SpecificProduct}>
          <Suspense fallback={<FallbackProgress />}>
            <ProductRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.Member}>
          <Suspense fallback={<FallbackProgress />}>
            <MemberRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.AddProduct}>
          <Suspense fallback={<FallbackProgress />}>
            <AddProductRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.Followers}>
          <Suspense fallback={<FallbackProgress />}>
            <FollowersRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.EditProfile}>
          <Suspense fallback={<FallbackProgress />}>
            <EditProfileRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.MenCatalog}>
          <Suspense fallback={<FallbackProgress />}>
            <MenCatalogRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.WomenCatalog}>
          <Suspense fallback={<FallbackProgress />}>
            <WomenCatalogRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.SearchBarText}>
          <Suspense fallback={<FallbackProgress />}>
            <SearchBarTextRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.Inbox}>
          <Suspense fallback={<FallbackProgress />}>
            <InboxRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.AdminDashboard}>
          <Suspense fallback={<FallbackProgress />}>
            <AdminDashboardRoute />
          </Suspense>
        </Route>
        <Route path={RoutePath.Followings}>
          <Suspense fallback={<FallbackProgress />}>
            <FollowingsRoute />
          </Suspense>
        </Route>
      </Layout>
      <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
    </Switch>
  );
};
