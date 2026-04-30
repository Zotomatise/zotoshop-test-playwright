import { test, expect } from '@playwright/test';

const API_URL = process.env.API_URL ?? 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.PUBLISHABLE_API_KEY!;

test.describe('API Medusa Store', () => {
  test.skip(!API_URL.includes('localhost'), 'API uniquement en local (docker)');

  test('liste les régions', async ({ request }) => {
    const res = await request.get(`${API_URL}/store/regions`, {
      headers: { 'x-publishable-api-key': PUBLISHABLE_KEY },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.regions)).toBe(true);
  });

  test('liste les produits', async ({ request }) => {
    const res = await request.get(`${API_URL}/store/products`, {
      headers: { 'x-publishable-api-key': PUBLISHABLE_KEY },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.products.length).toBeGreaterThan(0);
  });
});
