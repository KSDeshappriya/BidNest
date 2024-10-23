import { writable } from 'svelte/store';

export const paymentStatus = writable<'idle' | 'processing' | 'success' | 'error'>('idle');