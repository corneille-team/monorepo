import { toolsType } from 'lib-enums';

export const promptByToolName = (tool, payload) => {
  switch (tool) {
    case toolsType.youtube_script:
      return `create youtube script for a video of 10-15min from this subject: ${payload.subject}. in a ${payload.tone} tone in ${payload.language}`;
    default:
      return null;
  }
};
