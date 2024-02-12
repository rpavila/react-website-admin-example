import '@mantine/core/styles.css';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                // Single route in lazy file
                lazy: () => import("./components/login/Login"),
            },
            {
                path: "dashboard",
                async lazy() {
                    // Multiple routes in lazy file
                    let { DashboardLayout: Dashboard } = await import("./components/dashboard/Dashboard");
                    return { Component: Dashboard };
                },
                children: [
                    {
                        index: true,
                        async lazy() {
                            let { DashboardIndex } = await import("./components/dashboard/Dashboard");
                            return { Component: DashboardIndex };
                        },
                    },
                    // {
                    //     path: "messages",
                    //     async lazy() {
                    //         let { dashboardMessagesLoader, DashboardMessages } = await import(
                    //             "./pages/dashboard"
                    //             );
                    //         return {
                    //             loader: dashboardMessagesLoader,
                    //             Component: DashboardMessages,
                    //         };
                    //     },
                    // },
                ],
            },
            // {
            //     path: "*",
            //     element: <NoMatch />,
            // },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    );
}

export default App;
