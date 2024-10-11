import React from 'react';

// Automatically generate routes from folder structure
export const generatedRoutes = [];

const modules = import.meta.glob("./pages/**/*.jsx");

for (const path in modules) {
  const routePath = path
    .replace("./pages", "")      // Remove './pages' part
    .replace(/\.jsx$/, "")       // Remove the file extension
    .replace(/\/index/, "")      // Handle index files
    .toLowerCase();              // Convert to lowercase for consistency

  // Use React.lazy to load the component lazily
  const LazyComponent = React.lazy(modules[path]);

  generatedRoutes.push({
    path: routePath === "/home" ? "/" : routePath,  // Use '/' for Home page
    component: LazyComponent,  // Lazy load the component
  });
}
