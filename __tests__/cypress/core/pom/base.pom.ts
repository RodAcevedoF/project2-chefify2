export class BasePOM {
	private cyConfig: { defaultCommandTimeout: number; [key: string]: unknown };
	protected loc: Record<string, string | ((...args: unknown[]) => string)>;
	private _constants: Readonly<{
		EXP_XPATH_STARTWITH_BRACKET: string;
		EXP_XPATH_STARTWITH_SLASH: string;
		TEXT_FUNCTION: string;
	}>;

	constructor(
		locators: Record<string, string | ((...args: unknown[]) => string)>,
	) {
		const config = Cypress.config();
		this.cyConfig = {
			defaultCommandTimeout: config.defaultCommandTimeout,
		} as { defaultCommandTimeout: number; [key: string]: unknown };
		this.loc = locators;
		this._constants = Object.freeze({
			EXP_XPATH_STARTWITH_BRACKET: '(//',
			EXP_XPATH_STARTWITH_SLASH: '//',
			TEXT_FUNCTION: 'function',
		});
	}

	visitUrl(url: string, timeout = 80000): this {
		cy.visit(url, { timeout });
		return this;
	}

	get(
		locator: string | ((...args: unknown[]) => string),
		//_options: { exitIframe?: boolean } = {},
		locatorFind: string | undefined = undefined,
		timeout: number = this.cyConfig.defaultCommandTimeout,
	): Cypress.Chainable<JQuery<HTMLElement>> {
		const resolvedLocator: string =
			typeof locator === 'function' ? locator() : locator;

		if (
			resolvedLocator.startsWith(this._constants.EXP_XPATH_STARTWITH_SLASH) ||
			resolvedLocator.startsWith(this._constants.EXP_XPATH_STARTWITH_BRACKET)
		) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const cyWithXpath = this.getCy() as any;
			return locatorFind
				? cyWithXpath
						.xpath(resolvedLocator, { timeout: timeout })
						.find(locatorFind)
				: cyWithXpath.xpath(resolvedLocator, { timeout: timeout });
		}

		return locatorFind
			? this.getCy()
					.get(resolvedLocator, { timeout: timeout })
					.find(locatorFind)
			: this.getCy().get(resolvedLocator, { timeout: timeout });
	}

	getElementInsideIframe(
		iframeLocator: string,
		elToFind: string,
	): Promise<JQuery<HTMLElement>> {
		return new Promise((resolve) => {
			this.get(iframeLocator).then(($iframe) => {
				const iframe = $iframe.contents();
				const element = iframe.find(elToFind) as JQuery<HTMLElement>;
				resolve(element);
			});
		});
	}

	type(
		locatorName: string | ((...args: unknown[]) => string),
		text: string,
		textToCheck: string | undefined = undefined,
		n = 0,
	): this {
		const resolvedLocator =
			typeof locatorName === 'function' ? locatorName() : locatorName;
		const element = this.get(resolvedLocator).eq(n);
		element.should('exist').should('be.visible');
		element.click({ force: true }).clear().type(text);
		if (textToCheck) {
			element.should('have.value', textToCheck);
		}
		return this;
	}

	clickElement(
		locatorName: string | ((...args: unknown[]) => string),
		n = 0,
		options: { force: boolean } = { force: false },
	): this {
		const name =
			typeof locatorName === 'function' ? locatorName() : locatorName;
		const element = this.get(name).eq(n);
		element.should('exist').should('be.visible');
		element.click({ force: options.force });
		return this;
	}

	scrollIntoView(locatorName: string, n = 0): this {
		const element = this.get(locatorName).eq(n);
		element.scrollIntoView();
		return this;
	}

	getLocation(): string | undefined {
		let locationPath: string | undefined;
		cy.location().then((loc) => (locationPath = loc.pathname));
		return locationPath;
	}

	selectOption(locator: string, option: string): this {
		const element = this.get(locator);
		element.select(option);
		return this;
	}

	selectOptionMui(locator: string, option: string): void {
		const element = this.get(locator);
		element.parent().click().get(`ul > li[data-value="${option}"]`).click();
	}

	fillInputRange(locator: string, val: number): this {
		const element = this.get(locator);
		element.invoke('val', val).trigger('change');
		return this;
	}

	pause(ms?: number): this {
		if (ms === undefined) {
			cy.pause();
		} else {
			cy.wait(ms);
		}
		return this;
	}

	getCy(): Cypress.cy {
		return cy;
	}
}
