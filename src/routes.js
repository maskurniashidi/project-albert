import { lazy } from "react";
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

const Patient = lazy(() => import("./pages/Patient/Patient/Patient"));
const DetailPatient = lazy(() => import("./pages/Patient/DetailPatient/Detailpatient"));
const AddPatient = lazy(() => import("./pages/Patient/AddPatient/AddPatient"));
const EditPatient = lazy(() => import("./pages/Patient/EditPatient/EditPatient"));

const Admin = lazy(() => import("./pages/Admin/Admin/Admin"));
const AddAdmin = lazy(() => import("./pages/Admin/AddAdmin/AddAdmin"));
const DetailAdmin = lazy(() => import("./pages/Admin/DetailAdmin/DetailAdmin"));
const EditAdmin = lazy(() => import("./pages/Admin/EditAdmin/EditAdmin"));
const Profile = lazy(() => import("./pages/Profile/Profile/Profile"));

const AddHistory = lazy(() => import("./pages/History/AddHistory/AddHistory"));
const History = lazy(() => import("./pages/History/History/History"));
export const APP_ROUTE = [
  {
    name: "Login",
    path: "/",
    exact: true,
    component: Login,
    restricted: true,
  },
  // {
  //   name: "Notification",
  //   path: "/notification",
  //   exact: true,
  //   component: Notification,
  //   restricted: true,
  // },
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    private: true,
  },
  {
    name: "Patient",
    path: "/user",
    exact: true,
    component: Patient,
    private: true,
  },
  {
    name: "DetailPatient",
    path: "/user/detail-user/:id",
    exact: true,
    component: DetailPatient,
    private: true,
  },
  {
    name: "EditPatient",
    path: "/user/edit-user/:id",
    exact: true,
    component: EditPatient,
    private: true,
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    component: Profile,
    private: true,
  },
  {
    name: "AddPatient",
    path: "/user/tambah-user",
    exact: true,
    component: AddPatient,
    private: true,
  },
  {
    name: "Admin",
    path: "/admin",
    exact: true,
    component: Admin,
    private: true,
  },
  {
    name: "AddAdmin",
    path: "/admin/tambah-admin",
    exact: true,
    component: AddAdmin,
    private: true,
  },
  {
    name: "DetailAdmin",
    path: "/admin/detail-admin/:id",
    exact: true,
    component: DetailAdmin,
    private: true,
  },
  {
    name: "EditAdmin",
    path: "/admin/edit-admin/:id",
    exact: true,
    component: EditAdmin,
    private: true,
  },
  {
    name: "History",
    path: "/history",
    exact: true,
    component: History,
    private: true,
  },
  {
    name: "AddHistory",
    path: "/history/add-record",
    exact: true,
    component: AddHistory,
    private: true,
  },
];
