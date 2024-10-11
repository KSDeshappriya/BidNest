import React from 'react';

// Automatically generate routes from folder structure
export const generatedRoutes = [];

const modules = import.meta.glob("./pages/**/*.jsx");

for (const path in modules) {
  let routePath = path
    .replace("./pages", "")      // Remove './pages' part
    .replace(/\.jsx$/, "")       // Remove the file extension
    .replace(/\/index/, "")      // Handle index files as root routes
    .toLowerCase();              // Convert to lowercase for consistency

  // If the file is named the same as its folder (e.g., /contact/contact.jsx),
  // then only use the folder name (e.g., /contact)
  const pathSegments = routePath.split("/");
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === pathSegments[pathSegments.length - 2]) {
    routePath = `/${pathSegments.slice(0, -1).join("/")}`;
  }

  // Use React.lazy to load the component lazily
  const LazyComponent = React.lazy(modules[path]);

  // Create the route, adjusting for the home page
  generatedRoutes.push({
    path: routePath === "/home" ? "/" : routePath,  // Use '/' for Home page
    component: LazyComponent,  // Lazy load the component
  });
}
