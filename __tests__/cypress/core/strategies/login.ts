import { auth } from 'test/cypress/core/pom/auth.pom';

export function loginLogout() {
	auth.init();
	auth.logOutIfUserIsLoggedIn();
}
