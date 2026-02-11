import { describe, expect, test } from 'vitest';
import { GET } from './route';

describe('GET /api/health', () => {
  test('returns status ok with a valid ISO timestamp', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toEqual(200);
    expect(body).toEqual({
      status: 'ok',
      timestamp: expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      ),
    });
  });
});
