export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/auction-details": [4],
		"/auction-details/[id]": [~5],
		"/blog-details": [7],
		"/blog": [6],
		"/contact": [~8],
		"/dashboards/bidder": [~9],
		"/dashboards/seller": [~10],
		"/extra/try01": [~11],
		"/faq": [~12],
		"/how-works": [13],
		"/live-auction": [~14],
		"/login": [15],
		"/payments": [16],
		"/signup": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';