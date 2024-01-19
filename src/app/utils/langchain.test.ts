// utils/langchain.test.ts
import { langchainProcess } from './langchain';

describe('Langchain Integration', () => {
  test('Processes text with Langchain', async () => {
    const filePath = 'test.txt';  // Replace with an actual file path
    const result = await langchainProcess(filePath);
    expect(result).toEqual('Processed text from Langchain');
  });
});
