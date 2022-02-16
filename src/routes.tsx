import {
    SpouseAdd,
    CustomerAdd,
    ClientEdit,
    NoteEdit,
    SpouseEdit,
    DependentEdit,
    HealthPolicyEdit,
    ManagementEdit,
    BeneficiaryEdit,
} from "./pages/dashboard/Customer/AddEdit"
import {
    ClientList,
    CustomerDetails,
    AllList,
    PolicyList,
    ProspectList,
    LostList,
    SearchAll,
} from "./pages/dashboard/Customer/View"
import { Suspense, lazy } from "react"
import { Navigate } from "react-router-dom"
import AuthGuard from "./components/AuthGuard"
import BlogLayout from "./components/blog/BlogLayout"
import DashboardLayout from "./components/dashboard/DashboardLayout"
import GuestGuard from "./components/GuestGuard"
import LoadingScreen from "./components/LoadingScreen"
import MainLayout from "./components/MainLayout"
import Overview from "./pages/dashboard/Overview"

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    )

//Policies Add

const HealthPolicyAdd = Loadable(
    lazy(() => import("./pages/dashboard/Customer/AddEdit/HealthPolicyAdd"))
)

const LifePolicyAdd = Loadable(
    lazy(() => import("./pages/dashboard/Customer/AddEdit/LifePolicyAdd"))
)
const LifePolicyEdit = Loadable(
    lazy(() => import("./pages/dashboard/Customer/AddEdit/LifePolicyEdit"))
)

const BeneficiaryAdd = Loadable(
    lazy(() => import("./pages/dashboard/Customer/AddEdit/BeneficiaryAdd"))
)

const DependentAdd = Loadable(
    lazy(() => import("./pages/dashboard/Customer/AddEdit/DependentAdd"))
)

// Authentication pages

const Login = Loadable(lazy(() => import("./pages/authentication/Login")))
const PasswordRecovery = Loadable(
    lazy(() => import("./pages/authentication/PasswordRecovery"))
)
const Register = Loadable(lazy(() => import("./pages/authentication/Register")))
const VerifyCode = Loadable(
    lazy(() => import("./pages/authentication/VerifyCode"))
)

// Blog pages

const BlogPostCreate = Loadable(
    lazy(() => import("./pages/blog/BlogPostCreate"))
)
const BlogPostDetails = Loadable(
    lazy(() => import("./pages/blog/BlogPostDetails"))
)
const BlogPostList = Loadable(lazy(() => import("./pages/blog/BlogPostList")))

// Dashboard pages

const Account = Loadable(lazy(() => import("./pages/dashboard/Account")))
const Analytics = Loadable(lazy(() => import("./pages/dashboard/Analytics")))
const Calendar = Loadable(lazy(() => import("./pages/dashboard/Calendar")))
const Chat = Loadable(lazy(() => import("./pages/dashboard/Chat")))
const Finance = Loadable(lazy(() => import("./pages/dashboard/Finance")))

const Kanban = Loadable(lazy(() => import("./pages/dashboard/Kanban")))
const Mail = Loadable(lazy(() => import("./pages/dashboard/Mail")))

// Error pages

const AuthorizationRequired = Loadable(
    lazy(() => import("./pages/AuthorizationRequired"))
)
const NotFound = Loadable(lazy(() => import("./pages/NotFound")))
const ServerError = Loadable(lazy(() => import("./pages/ServerError")))

// Other pages

const Checkout = Loadable(lazy(() => import("./pages/Checkout")))
const Contact = Loadable(lazy(() => import("./pages/Contact")))
const Home = Loadable(lazy(() => import("./pages/Home")))
const Pricing = Loadable(lazy(() => import("./pages/Pricing")))

const routes = [
    {
        path: "authentication",
        children: [
            {
                path: "login",
                element: (
                    <GuestGuard>
                        <Login />
                    </GuestGuard>
                ),
            },
            {
                path: "login-unguarded",
                element: <Login />,
            },
            {
                path: "password-recovery",
                element: <PasswordRecovery />,
            },
            {
                path: "register",
                element: (
                    <GuestGuard>
                        <Register />
                    </GuestGuard>
                ),
            },
            {
                path: "verify-code",
                element: <VerifyCode />,
            },
        ],
    },
    {
        path: "blog",
        element: <BlogLayout />,
        children: [
            {
                path: "/",
                element: <BlogPostList />,
            },
            {
                path: "new",
                element: <BlogPostCreate />,
            },
            {
                path: ":postId",
                element: <BlogPostDetails />,
            },
        ],
    },
    {
        path: "contact",
        element: <Contact />,
    },
    {
        path: "dashboard",
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: "/",
                element: <Overview />,
            },
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "analytics",
                element: <Analytics />,
            },
            {
                path: "calendar",
                element: <Calendar />,
            },
            {
                path: "chat",
                children: [
                    {
                        path: "/",
                        element: <Chat />,
                    },
                    {
                        path: "new",
                        element: <Chat />,
                    },
                    {
                        path: ":threadKey",
                        element: <Chat />,
                    },
                ],
            },
            {
                path: "customers",
                children: [
                    {
                        path: "/",
                        element: <AllList />,
                    },
                    {
                        path: "/search",
                        element: <SearchAll />,
                    },
                    {
                        path: "/prospects",
                        element: <ProspectList />,
                    },
                    {
                        path: "/clients",
                        element: <ClientList />,
                    },
                    {
                        path: "/policies",
                        element: <PolicyList />,
                    },
                    {
                        path: "/lost",
                        element: <LostList />,
                    },
                    {
                        path: "/:id",
                        element: <CustomerDetails />,
                    },
                    {
                        path: `/add`,
                        element: <CustomerAdd />,
                    },
                    {
                        path: `/edit-client-details/:id`,
                        element: <ClientEdit />,
                    },
                    {
                        path: `/edit-management/:id`,
                        element: <ManagementEdit />,
                    },
                    {
                        path: `/add-spouse/:id`,
                        element: <SpouseAdd />,
                    },
                    {
                        path: `/edit-spouse/:id`,
                        element: <SpouseEdit />,
                    },
                    {
                        path: `/add-dependent/:id`,
                        element: <DependentAdd />,
                    },
                    {
                        path: `/:id/dependent/:dependentId`,
                        element: <DependentEdit />,
                    },
                    {
                        path: `/add-beneficiary/:id`,
                        element: <BeneficiaryAdd />,
                    },
                    {
                        path: `/:id/beneficiary/:beneficiaryId`,
                        element: <BeneficiaryEdit />,
                    },
                    {
                        path: `/add-health-policy/:id`,
                        element: <HealthPolicyAdd />,
                    },
                    {
                        path: `/:id/health-policy-edit/:policyId`,
                        element: <HealthPolicyEdit />,
                    },
                    {
                        path: `/add-life-policy/:id`,
                        element: <LifePolicyAdd />,
                    },
                    {
                        path: `/:id/life-policy-edit/:policyId`,
                        element: <LifePolicyEdit />,
                    },
                    {
                        path: `/:id/note-edit/:policyId`,
                        element: <NoteEdit />,
                    },
                ],
            },
            {
                path: "kanban",
                element: <Kanban />,
            },
            {
                path: "mail",
                children: [
                    {
                        path: "/",
                        element: <Navigate to="/dashboard/mail/all" replace />,
                    },
                    {
                        path: "label/:customLabel",
                        element: <Mail />,
                    },
                    {
                        path: "label/:customLabel/:emailId",
                        element: <Mail />,
                    },
                    {
                        path: ":systemLabel",
                        element: <Mail />,
                    },
                    {
                        path: ":systemLabel/:emailId",
                        element: <Mail />,
                    },
                ],
            },

            {
                path: "finance",
                element: <Finance />,
            },
        ],
    },
    {
        path: "*",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "pricing",
                element: <Pricing />,
            },
            {
                path: "401",
                element: <AuthorizationRequired />,
            },
            {
                path: "404",
                element: <NotFound />,
            },
            {
                path: "500",
                element: <ServerError />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]

export default routes
