import { toolsType } from 'lib-enums';

const always = (payload) =>
  `. formality: ${payload.formality};tone: ${payload.tone}; language${payload.language}`;

export const promptByToolName = (tool, payload) => {
  switch (tool) {
    case toolsType.added_value_extractor:
      return `give me all advantages of this service: ${payload.content}${always(payload)}`;
    case toolsType.argument_generator:
      return `I want to be persuasive with my new clients, write advantages of my services: ${
        payload.content
      }${always(payload)}`;
    case toolsType.cold_email_generator:
      return `write an cold email from this linkedin user: ${payload.linkedinData}${always(
        payload,
      )}`;
    case toolsType.company_bio:
      return `write a bio for this company ${payload.subject}: ${payload.content}${always(
        payload,
      )}`;
    case toolsType.company_vision:
      return `write a vision for this company ${payload.content}${always(payload)}`;
    case toolsType.growth_ideas:
      return `my startup need growth ideas, write me some: ${payload.subject} ${
        payload.content
      } ${always(payload)}`;
    case toolsType.ice_breaker_generator:
      return `write a linkedin ice breaker from this linkedin user: ${payload.linkedinData}${always(
        payload,
      )}`;
    case toolsType.linkedin_post_generator:
      return `write a linkedin post from this instructions: ${payload.content}.${always(payload)}`;
    case toolsType.reformulation:
      return `rephrase this text: ${payload.content}${always(payload)}`;
    case toolsType.response_generator:
      return `${always(payload)}`;
    case toolsType.subsidiary_extractor:
      return `find and give me all subsidiaries services of this company: ${
        payload.subject
      }${always(payload)}`;
    case toolsType.tonality_changer:
      return `change tone of this text: ${payload.content}${always(payload)}`;
    default:
      return null;
  }
};
