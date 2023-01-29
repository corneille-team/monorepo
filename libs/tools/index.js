import { getOpenai, openaiModelAdapter, openaiModelsType } from '../openai';

export * from './toolsRequiredFields';

export function uesToolService(prompt, payload) {
  const openai = getOpenai();

  return openai.createCompletion({
    model: openaiModelAdapter(openaiModelsType.text_davinci_003),
    prompt,
    max_tokens: payload.max_tokens,
    n: payload.n,
    user: payload.user_id,
  });
}
