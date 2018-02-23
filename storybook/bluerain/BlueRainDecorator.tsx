import BR, { BlueRain, BootOptions } from '@blueeast/bluerain-os';
// tslint:disable-next-line:no-implicit-dependencies
import React from 'react';

const BlueRainDecorator = (configs: BootOptions) => (storyFn: any) => {

	const Component = () => storyFn();

	const StorybookPlugin = {
		pluginName: 'Storybook Plugin',
		hooks: {
			'bluerain.system.initialized': (ctx: BlueRain) => {
				ctx.Components.replace('SystemLayout', Component);
			}
		}
	};

	const allConfigs = {
		renderApp: false,
		...configs
	};

	allConfigs.plugins = allConfigs.plugins || [];
	allConfigs.plugins.push(StorybookPlugin);

	const BluerainApp = BR.boot(allConfigs);
	return <BluerainApp />;
};

export default BlueRainDecorator;
