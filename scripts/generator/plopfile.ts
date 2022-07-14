import { NodePlopAPI } from "plop";

module.exports = (plop: NodePlopAPI) => {
  plop.setGenerator("component", {
    description: "Generate new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (e.g: Users):",
      },
      {
        type: "input",
        name: "pageName",
        message: "Page name:",
      },
      {
        type: "input",
        name: "route",
        message: "Home url (e.g: users):",
      },
      {
        type: "input",
        name: "apiUrl",
        message: "Api url (e.g: /users):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../src/pages/dashboard/{{pascalCase name}}.tsx",
        templateFile: "./NewPage.ts.hbs",
      },
      {
        type: "add",
        path: "../../src/features/{{lowerCase route}}/{{pascalCase name}}View.tsx",
        templateFile: "./ViewPage.ts.hbs",
      },
      {
        type: "add",
        path: "../../src/features/{{lowerCase route}}/hooks.ts",
        templateFile: "./hooks.ts.hbs",
      },
      {
        type: "add",
        path: "../../src/features/{{lowerCase route}}/{{pascalCase}}Form.tsx",
        templateFile: "./form.ts.hbs",
      },
      {
        type: "add",
        path: "../../src/_apis_/{{lowerCase route}}.ts",
        templateFile: "./Services.ts.hbs",
      },
      {
        type: "append",
        path: "../../src/routes/path.ts",
        pattern: `/* ROUTE_PATH_GENERATOR_IMPORT */`,
        template: `{{camelCase name}}: path(ROOTS_DASHBOARD, "/{{route}}"),`,
      },
      {
        type: "append",
        path: "../../src/routes/index.tsx",
        pattern: `/* COMPONENT_GENERATOR_FEATURES_IMPORT */`,
        template: `const {{pascalCase name}}Form = Loadable(lazy(() => import("features/{{lowerCase route}}/{{pascalCase name}}Form")));`,
      },
      {
        type: "append",
        path: "../../src/routes/index.tsx",
        pattern: `/* COMPONENT_GENERATOR_PAGE_IMPORT */`,
        template: `const {{pascalCase name}}Page = Loadable(lazy(() => import("pages/dashboard/{{pascalCase name}}")));`,
      },

      {
        type: "append",
        path: "../../src/routes/index.tsx",
        pattern: `/* PAGE_ROUTER */`,
        template: `{
          path: "{{route}}",
          children: [
            {
              path: "create",
              element: <{{pascalCase name}}Form />,
            },
            {
              path: ":id/edit",
              element: <{{pascalCase name}}Form />,
            },
            {
              index: true,
              element: <{{pascalCase name}}Page />,
            },
          ],
        },`,
      },

      {
        type: "append",
        path: "../../src/layouts/sidebarConfig.tsx",
        pattern: `/* SIDEBAR_ELEMENT_GENERATOR */`,
        template: `{
            title: "{{pageName}}",
            path: PATH_DASHBOARD.{{camelCase name}},
            icon: <></>,
          },`,
      },

      {
        type: "append",
        path: "../../src/apis/index.ts",
        pattern: `/* APIS_GENERATOR_IMPORT */`,
        template: `export * from "./{{lowerCase route}}";`,
      },
    ],
  });
};
