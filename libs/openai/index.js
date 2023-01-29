import { Configuration, OpenAIApi } from 'openai';

export * from './models';

let openai;
export const connectOpenai = (apiKey) => {
  const configuration = new Configuration({
    apiKey,
  });

  openai = new OpenAIApi(configuration);
  return openai;
};

export const getOpenai = () => openai;
