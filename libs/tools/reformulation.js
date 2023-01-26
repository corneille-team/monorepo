import { getOpenai, openaiModelAdapter, openaiModelsType } from '../openai';

export function reformulation(prompt, payload) {
  const openai = getOpenai();

  const maxTokens = 500;

  return openai.createCompletion({
    model: openaiModelAdapter(openaiModelsType.text_davinci_003),
    prompt,
    max_tokens: maxTokens,
    n: payload.n,
    user: payload.userId,
  });
}
