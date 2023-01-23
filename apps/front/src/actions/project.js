export const CHANGE_PROJECT = 'CHANGE_PROJECT';

export function changeProject(name) {
  return {
    type: CHANGE_PROJECT,
    name,
  };
}
