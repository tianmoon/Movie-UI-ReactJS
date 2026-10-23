import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import PageLoader from "../components/PageLoader/PageLoader";
import ErrorFallback from "../components/ErrorFallBack/ErrorFallBack";

function RouteBoundary({ children }) {
    const location = useLocation();
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[location.pathname, location.search]}>
            <Suspense fallback={<PageLoader />}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}

export default RouteBoundary;