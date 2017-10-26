var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"appRoutes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"signin","component":"SignInComponent"},{"path":"register","component":"RegisterUserComponent"},{"path":"authenticated","component":"AuthenticatedUserComponent","canActivate":["AuthGuard"],"children":[{"path":"","canActivateChild":["AuthGuard"],"children":[{"path":"","redirectTo":"workflow-maint","pathMatch":"full"},{"path":"workflow-detail/:id/:operation","component":"WorkflowDetailComponent","resolve":{"detail":"WorkflowDetailResolver"},"canDeactivate":["WorkflowDetailDeactivateGuard"]},{"path":"workflow-maint","component":"WorkflowMaintComponent"},{"path":"editor","component":"EditorComponent"},{"path":"connection","component":"ConnectionComponent"}]}]},{"path":"","component":"SignInComponent"},{"path":"**","component":"SignInComponent"}],"kind":"module"}]}