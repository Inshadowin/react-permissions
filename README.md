# react-permissions

Lightweight package that resolves permissions in your app

## How to use

Wrap your App in `PermissionsProvider`

```jsx
const Main = () => {
  return <PermissionsProvider>// your app code</PermissionsProvider>;
};
```

Provide `initialPermissions?: CheckResult` and/or `onCheckPermissions?: OnCheckPermissionsType`
If you have all permissions somewhere, and you don't need dynamic checks - use only `initialPermissions`

```jsx
type CheckResult = {
  action: string,
  allowed?: boolean,
}[];

type OnCheckPermissionsType = (
  actions: string[]
) => Promise<CheckResult> | CheckResult;

const exampleInitialPermissions = [
  { action: 'can_view_transactions', allowed: true },
  { action: 'can_edit_people', allowed: false },
];

const exampleCheckPermissions = (actions: string[]) => {
  return [
    { action: 'this_is_allowed', allowed: true },
    { action: 'denied_this_is', allowed: false },
    { action: 'undefined_is_allowed' },
  ];
};

return (
  <PermissionsProvider
    onCheckPermissions={exampleCheckPermissions}
    initialPermissions={exampleInitialPermissions}
  >
    // children
  </PermissionsProvider>
);
```

## Utilities

### PermissionCheck

This component allows you to hide content based on permissions

```jsx
type PermissionCheckProps = {
  // this action will be checked upon
  // if it's allowed - we will show content
  action: string,

  // content that must be shown if action is allowed
  children: React.ReactNode,

  // content that must be shown if action is not allowed
  // default = null
  fallback?: React.ReactNode,

  // content that must be shown while we check if action is allowed
  // default = null
  loading?: React.ReactNode,

  // event when action is denied
  // fire alerts, write logs or redirects - do anything
  onDenied?: (action: string) => void,
};

return <PermissionCheck>Secure Content</PermissionCheck>;
```

### useCheckPermission

Documentation TBD

### useCheckPermissions

Documentation TBD
