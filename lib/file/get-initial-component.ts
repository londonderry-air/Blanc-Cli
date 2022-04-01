import { ComponentInfo } from '$/types';

export default (info: ComponentInfo) =>
	[
		`import {\n`,
		`    BlancElementText,\n`,
		`    BlancTextElementData\n`,
		`  } from '../base/blanc-element-text'\n`,
		`  \n`,
		`export const Blanc${capitalize(info.group)}${capitalize(
			info.name
		)} = (props: { data: BlancTextElementData }) => {\n`,
		`  return (\n`,
		`    <BlancElementText\n`,
		`      data={props.data}\n`,
		`      font={{ size: '2em', weight: '600' }}\n`,
		`      padding={'30px'}\n`,
		`      markup={'p'}\n`,
		`      align={'center'}\n`,
		`      placeholder={'テキストを入力してください'}\n`,
		`    />\n`,
		`  )\n`,
		`}\n`,
	] as const;

const capitalize = (str: string) =>
	str[0].toUpperCase() + str.slice(1).toLowerCase();
