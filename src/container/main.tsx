import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from "../component/ScrollToTop";
import SuspenseLoader from "../component/SuspenseLoader";
import { AuthRoute, DashboardRoute } from "../navigation/routes";
import "./styles.scss";

export interface IMain {}

const Main: React.FunctionComponent<IMain> = () => {
    const AuthScreen = lazy(() => import("../screens/Auth"))
    const DashboardScreen = lazy(() => import("../screens/Dashboard"))
  return (
    <div className="main">
        <Suspense fallback={<SuspenseLoader />}>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path={AuthRoute} element={<AuthScreen />} />
                    <Route path={DashboardRoute} element={<DashboardScreen />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    </div>
  );
};

export default Main;