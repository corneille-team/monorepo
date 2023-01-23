import { getOpenai, openaiModelAdapter, openaiModelsType } from '../openai';

export function youtube_script(payload) {
  const openai = getOpenai();

  const { subject, tone, language } = payload;

  const maxTokens = 3000;

  const promptToSend = `create youtube script for a video of 10-15min from this subject: ${subject}. in a ${tone} tone in ${language}`;

  return openai.createCompletion({
    model: openaiModelAdapter(openaiModelsType.text_davinci_003),
    prompt: promptToSend,
    max_tokens: maxTokens,
    user: payload.userId,
  });
}
