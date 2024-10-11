import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import dynamic generated routes
import { generatedRoutes } from './GeneratedRoutes';
// PreLoader to all pages
import LoadingWrapper from './components/LoadingWrapper';

function App() {
  return (
    <Router>
      <LoadingWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {generatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}  // Render lazy-loaded component
                />
              ))}
            </Routes>
          </Suspense>
      </LoadingWrapper>
    </Router>
  );
}

export default App;
