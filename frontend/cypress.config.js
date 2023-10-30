import {defineConfig} from 'cypress';

export default defineConfig({
	projectId: '7ptkeq',
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});
