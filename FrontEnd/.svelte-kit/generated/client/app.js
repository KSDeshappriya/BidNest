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
		"/": [~2],
		"/about": [12],
		"/(auction)/auction-details/[id]": [~3],
		"/(blog)/blog-details": [9],
		"/(blog)/blog": [8],
		"/contact": [~13],
		"/dashboards/bidder": [~14],
		"/dashboards/seller": [~15],
		"/faq": [~16],
		"/how-works": [17],
		"/(auction)/live-auction": [~4],
		"/(auth)/login": [~6],
		"/(payment)/payment-success": [11],
		"/(auction)/payments": [5],
		"/(payment)/payment/[bidId]": [10],
		"/(auth)/signup": [7]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';