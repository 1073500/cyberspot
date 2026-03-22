import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Layout from "./Layout.jsx";
import SpotCards from "./components/SpotCards.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/spotcards",
                element: <SpotCards />,
            },

        ],
    },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;