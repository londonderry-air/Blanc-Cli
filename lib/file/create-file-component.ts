import createDirIfNotExist from '$/file/create-dir';
import getDirs from '$/file/get-dirs';
import fs from 'fs';
import getInitialComponentFileContent from '$/file/get-initial-component';
import { ComponentInfo } from '$/types';

export default (info: ComponentInfo) => {
	const dir = getDirs();
	const componentDir = dir.component + `/${info.group}`;
	const filePath = componentDir + `/blanc-element-${info.name}.ts`;

	createDirIfNotExist(componentDir);
	createComponentFileIfNotExist(filePath, info);
};

const createComponentFileIfNotExist = (
	filePath: string,
	info: ComponentInfo
) => {
	if (!fs.existsSync(filePath)) {
		const fd = fs.openSync(filePath, 'w');
		const initialFileContent = getInitialComponentFileContent(info);
		initialFileContent.forEach((line) => fs.writeSync(fd, line));
		fs.closeSync(fd);
	}
};
