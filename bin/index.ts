import getMode from '../lib/mode/get-mode';
import add from '../lib/mode/add';
import message from '../lib/interactive/message';

const main = async () => {
	try {
		const argv = require('minimist')(process.argv.slice(2), {
			alias: {
				n: 'name',
				g: 'group',
			},
		});
		const mode = getMode(argv);
		switch (mode) {
			case 'add':
				message(['[ADD]: Create new component'], 'default');
				add(argv);
				break;
			default:
				message(
					[
						'Usage:',
						'  $ blanc <command> [options]',
						'',
						'Commands:',
						'  add  Create new component',
						'',
						'Options:',
						`  -n  Shortcut to input new component's name`,
						`  -g  Shortcut to input new component's group`,
					],
					'default'
				);
		}
	} catch (e) {
		console.log('canceld');
	}
};

(async () => {
	await main();
})();
