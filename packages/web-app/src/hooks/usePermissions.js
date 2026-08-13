import { useSelector } from 'react-redux';
import { hasRole } from '../helpers/AuthHelper';

const isTokenExpired = authState => {
  try {
    if (authState.authTokenDecoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export function usePermissions() {
  const authState = useSelector(state => state.login);
  // Visitor impersonation is special: we want the UI to behave exactly as if
  // no one is logged in — login button back in the AppBar, PrivateRoutes
  // blocked, private queries disabled. Every other impersonated role keeps
  // isAuth true so the app still knows it has a session to hang requests off.
  const isVisitorMode = authState.impersonatedRole === 'Visitor';
  const hasLiveSession =
    authState.authTokenDecoded !== null && !isTokenExpired(authState);
  return {
    isAdmin: hasRole(authState, 'Administrator'),
    isAuth: hasLiveSession && !isVisitorMode,
    isLeader: hasRole(authState, 'Leader'),
    isModerator: hasRole(authState, 'Moderator'),
    isTokenExpired: isTokenExpired(authState),
    isUser: hasRole(authState, 'User'),
    // Ignore-impersonation flag so the ImpersonationSwitcher itself stays
    // visible when a real admin is currently masquerading as a lower role.
    isRealAdmin: hasRole(authState, 'Administrator', {
      ignoreImpersonation: true
    }),
    isImpersonating: Boolean(authState.impersonatedRole),
    impersonatedRole: authState.impersonatedRole ?? null
  };
}
