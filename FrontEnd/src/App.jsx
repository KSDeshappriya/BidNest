import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import dynamic generated routes
import { generatedRoutes } from './GeneratedRoutes';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
