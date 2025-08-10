export const extractPublicId = (url: string) => {
  // cloudinary
  const withoutVersion = url.split("/upload/")[1];
  const withoutExt = withoutVersion.split(".")[0];
  return withoutExt.replace(/^v[0-9]+\//, "");
};
