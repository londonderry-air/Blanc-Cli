import ask from '$/interactive/ask';
import message from '$/interactive/message';

export const getAddArgs = async (argv: any) => {
	let cmpName: string = argv.name ? argv.name.toLowerCase() : '';
	let cmpGroup: string = argv.group ? argv.group.toLowerCase() : '';
	const excludeGroupList = ['base', ''];
	const isGroupValid = (enteredGroup: string) =>
		excludeGroupList.indexOf(enteredGroup.toLowerCase()) === -1;
	const isGroupLetterAndNumber = (cmpGroup: string) =>
		cmpGroup.match(/^[A-Za-z0-9]*$/);
	const isNameEmpty = (cmpName: string) => cmpName === '';

	while (isNameEmpty(cmpName)) {
		const enterComponentName = await ask('Enter name of component');
		const isValidName = enterComponentName.match(/^[A-Za-z0-9]*$/);
		if (isValidName) {
			cmpName = enterComponentName.toLowerCase();
		} else {
			message(['[ERROR]: Enter name only letters and numbers!'], 'error');
		}
	}

	while (!isGroupValid(cmpGroup) || !isGroupLetterAndNumber(cmpGroup)) {
		if (cmpGroup === '') cmpGroup = 'common';

		if (!isGroupLetterAndNumber(cmpGroup)) {
			message(['[ERROR]: Enter group only letters and numbers!'], 'error');
		}

		if (!isGroupValid(cmpGroup)) {
			const messages = [
				'[ERROR]: Following names is not able to use as group-name!',
			];
			excludeGroupList.forEach((group) => {
				if (group !== '') messages.push(`* ${group}`);
			});
			message(messages, 'error');
		}

		cmpGroup = await ask(`Enter group of component (default: common)`);
	}

	return { name: cmpName.toLowerCase(), group: cmpGroup.toLowerCase() };
};
