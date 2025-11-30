import { defineConfig } from 'cypress';
import { vitePreprocessor } from 'cypress-vite';

export default defineConfig({
	e2e: {
		// Match your tests location
		specPattern: '__tests__/cypress/e2e/**/*.cy.{js,ts,tsx,jsx}',
		// Adjust baseUrl if you run a local dev server
		baseUrl: 'http://localhost:5173',
		supportFile: '__tests__/cypress/support/e2e.ts',
		setupNodeEvents(on, config) {
			// Use vitePreprocessor so Vite resolves aliases/plugins the same as your app
			on('file:preprocessor', vitePreprocessor());

			// Uncomment to enable code-coverage task if you add @cypress/code-coverage
			// const codeCoverageTask = require('@cypress/code-coverage/task');
			// codeCoverageTask(on, config);

			return config;
		},
	},

	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
		setupNodeEvents(on, config) {
			// component tests run via a Vite dev server provided by Cypress
			return config;
		},
	},
});
