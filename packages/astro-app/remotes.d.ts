declare module 'viteApp/*' {
	import type * as React from 'react';

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const ReactComponent: React.FC<any>;
	export default ReactComponent;
}