import ask from '$/interactive/ask';
import createTypeFile from '$/file/create-file-type';
import createComponentFile from '$/file/create-file-component';
import getComponentDir from '$/file/get-dirs';
import message from '$/interactive/message';
import { getAddArgs } from './get-add-args';

export default async (argv: any) => {
	const dir = getComponentDir();
	const componentInfo = await getAddArgs(argv);

	message(
		[
			'',
			`New Component: ${componentInfo.group}-${componentInfo.name}`,
			'These files will be created and changed',
			`[Change]: ${dir.type}/$element.ts`,
			`[Create]: ${dir.component}/${componentInfo.group}/blanc-element-${componentInfo.name}.ts`,
			'',
		],
		'success'
	);

	while (true) {
		const confirm = await ask('Create (y/n)?');
		if (confirm === 'y' || confirm === 'yes') {
			createComponentFile(componentInfo);
			createTypeFile(componentInfo);
			message(
				[
					`New component [${componentInfo.group}-${componentInfo.name}] is created successfully!`,
				],
				'success'
			);
			break;
		} else if (confirm === 'n' || confirm === 'no') {
			message([`Canceled to create component`], 'caution');
			break;
		}
	}
};
