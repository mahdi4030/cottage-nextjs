function updateObject(target: Record<string, unknown>, src: Record<string, unknown>) {
	const res = {};
	Object.keys(target).forEach((k) => (res[k] = src[k] ?? target[k]));
	return res;
}

export default function () {
	return {
		updateObject,
	};
}
