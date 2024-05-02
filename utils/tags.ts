export const replaceTags = (text?: string) => {
  if (!text) {
    return undefined;
  }

  return text.replace(
    /#(\w+)/g,
    '<a href="/tags?tag=$1" class="text-primary-600 hover:text-primary-900 hover:underline">#$1</a>'
  );
};
