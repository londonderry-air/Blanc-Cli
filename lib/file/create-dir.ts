import fs from 'fs';

export default (dir: string) => {
	const layers = dir.split('/');
	let layer = '';
	layers.forEach((l) => {
		layer += `/${l}`;
		if (!fs.existsSync(layer)) {
			fs.mkdirSync(layer);
		}
	});
};
