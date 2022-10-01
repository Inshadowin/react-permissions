import React from 'react';

import { PermissionCheck, PermissionsProvider } from '../../src';

const initialPermissions = [
  {
    action: 'has_this_permission' as any,
    allowed: true,
  },
  {
    action: 'not_available_permission' as any,
    allowed: false,
  },
  {
    action: 'no_allowed_specified_permission' as any,
  },
];
const emptyCheckPermissions = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    {
      action: 'checked_on_go' as any,
      allowed: true,
    },
    {
      action: 'denied_on_go' as any,
      allowed: false,
    },
    {
      action: 'no_allowed_info_on_go' as any,
    },
  ];
};

const SuccessfullResult = () => {
  return <span style={{ color: 'lightgreen' }}>✔</span>;
};

const FailedResult = () => {
  return <span style={{ color: 'red' }}>❌</span>;
};

const Permissions = () => {
  return (
    <>
      <PermissionsProvider
        initialPermissions={initialPermissions}
        onCheckPermissions={emptyCheckPermissions}
      >
        <h1>Permissions Playground</h1>
        {/* =============================================================================== */}
        <PermissionCheck
          fallback={<FailedResult />}
          action="has_this_permission"
        >
          <span>
            This is permitted <SuccessfullResult />
          </span>
        </PermissionCheck>
        <PermissionCheck action="not_available_permission">
          This is not permitted, but we see nothing <FailedResult />
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          fallback={
            <span>
              No Permission <SuccessfullResult />
            </span>
          }
          action="not_available_permission"
        >
          <span>
            This is not permitted, but we have fallback <FailedResult />
          </span>
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action="didnt check this action"
          loading={<span>This is loading for 2s</span>}
          fallback={
            <span>
              Server forgot about this permission <SuccessfullResult />
            </span>
          }
        >
          We didn't get permission from check <FailedResult />
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action="denied_on_go"
          loading={<span>This is loading for 2s</span>}
          fallback={
            <span>
              Server denied this permission <SuccessfullResult />
            </span>
          }
        >
          We got refected permission from check <FailedResult />
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action="no_allowed_info_on_go"
          loading={<span>This is loading for 2s</span>}
          fallback={
            <span>
              Server didn't send allowed check <SuccessfullResult />
            </span>
          }
        >
          We didn't get allowed permission from check <FailedResult />
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          loading={<span>This is loading for 2s</span>}
          action="checked_on_go"
          fallback={
            <span>
              Permission check failed <FailedResult />
            </span>
          }
        >
          <span>
            This content loaded <SuccessfullResult />
          </span>
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action={['checked_on_go']}
          loading={<span>This is loading for 2s</span>}
          fallback={
            <span>
              Permission check failed <FailedResult />
            </span>
          }
        >
          <span>
            Action was passed as array <SuccessfullResult />
          </span>
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action={['checked_on_go', 'not_available_permission']}
          loading={<span>This is loading for 2s</span>}
          isAllowed={allowed =>
            allowed.includes('checked_on_go') ||
            allowed.includes('not_available_permission')
          }
          fallback={
            <span>
              This message should not appear <FailedResult />
            </span>
          }
        >
          <span>
            Must handle custom logic <SuccessfullResult />
          </span>
        </PermissionCheck>
        {/* =============================================================================== */}
        <PermissionCheck
          action="checked_on_go"
          fallback={
            <span>
              This message should not appear <FailedResult />
            </span>
          }
        >
          <span>
            No Loading content must be shown <SuccessfullResult />
          </span>
        </PermissionCheck>
      </PermissionsProvider>
      {/* =============================================================================== */}
      <PermissionsProvider initialPermissions={initialPermissions}>
        <PermissionCheck
          action="this_permission_is_unknown"
          loading={
            <span>
              This message should not appear <FailedResult />
            </span>
          }
          fallback={
            <span>
              This message should appear <SuccessfullResult />
            </span>
          }
        >
          <span>
            No dynamic check means static permissions <SuccessfullResult />
          </span>
        </PermissionCheck>
      </PermissionsProvider>
    </>
  );
};

export default React.memo(Permissions);
