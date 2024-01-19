// utils/openai.test.ts
import { openaiProcess } from './openai';

describe('OpenAI Integration', () => {
  test('Processes text with OpenAI', async () => {
    const text = 'Test text';  // Replace with actual text
    const result = await openaiProcess(text);
    expect(result).toEqual({
      policyHolderName: 'John Smith',
      dateOfBirth: 'January 15, 1985',
      // Add more attributes based on your data
    });
  });
});
