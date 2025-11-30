import { locators } from 'test/cypress/core/lom/auth.lom';
import users from 'test/cypress/core/data/auth.json';
import { BasePOM } from './base.pom';

class AuthPOM extends BasePOM {
	constructor() {
		super(locators);
	}

	init(user = users.test_admin) {
		this.visitUrl('/');
		this.pause(1000);
		this.loginIfUserItsLoggedOut(user.email, user.password);
	}

	loginIfUserItsLoggedOut(
		email = users.test_admin.email,
		password = users.test_admin.password,
	) {
		this.getCy()
			.get('body')
			.then(($body) => {
				if ($body.find('[datatest-id="login-btn"]').length > 0) {
					this.goToSignin();
					this.fillLoginInputs(email, password);
					this.pause(2000);
				} else {
					this.getCy().log(
						'Login button not found, assuming user is already logged in',
					);
				}
			});
	}

	logOutIfUserIsLoggedIn() {
		this.getCy()
			.get('body')
			.then(($body) => {
				if ($body.find('[datatest-id="logout-btn"]').length > 0) {
					this.logOut();
					this.pause(1000);
				} else {
					this.getCy().log('User is not logged in');
				}
			});
	}

	goToSignin() {
		this.visitUrl('/');
		this.pause(1000);
		this.clickElement(this.loc['login-button']);
	}

	fillLoginInputs(
		email = users.test_admin.email,
		password = users.test_admin.password,
	) {
		this.pause(1000);
		this.type(this.loc['email-input'], email);
		this.type(this.loc['password-input'], password);
		this.clickElement(this.loc['submit-login-button']);
	}

	logOut() {
		this.clickElement(this.loc['main-logo']);
		this.pause(200);
		this.clickElement(this.loc['logout-button']);
	}
}

export const auth = new AuthPOM();
