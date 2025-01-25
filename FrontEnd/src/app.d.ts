// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: {
			  id: string;
			  role: string;
			} | null;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

export interface BidDetails {
    amount: number; // Amount in cents
    itemTitle?: string; // Optional item title
}

export interface PageData {
    bidDetails: BidDetails;
    paymentIntent: {
        clientSecret: string; // Client secret for Stripe payment
    };
}