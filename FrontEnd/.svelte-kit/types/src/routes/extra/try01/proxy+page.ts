// @ts-nocheck
// src/routes/+page.ts
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ data }) {
    return {
        serverMessage: data.serverMessage, // Accessing server data
        universalMessage: 'hello from universal load function'
    };
}
