export const waitOnPage = async (time: number) => {
  await new Promise((r) => setTimeout(r, time * 1000));
};
