import { useSelector } from 'react-redux';

export function useUserProperties() {
  const authState = useSelector(state => state.login);
  // Match Visitor impersonation with the "not logged in" identity so
  // ownership/self-checks that read from here (nickname, id, …) stop
  // recognising the real admin. See ImpersonationSwitcher.
  if (authState.impersonatedRole === 'Visitor') return {};
  return authState.authTokenDecoded ?? {};
}
