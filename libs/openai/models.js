export const openaiModelsType = {
  text_babbage_001: 'text_babbage_001',
  text_curie_001: 'text_curie_001',
  text_davinci_003: 'text_davinci_003',
};

export const openaiModelAdapter = (str) => str.replace(/_/g, '-');
