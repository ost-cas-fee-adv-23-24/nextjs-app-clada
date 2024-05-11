export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

export const createSnippet = (htmlString?: string, limit?: number) => {
  htmlString = htmlString ?? '';
  const text = stripHtml(htmlString);
  limit = limit ?? 100;

  if (text.length <= limit) {
    return text;
  }

  let truncatedText = text.slice(0, limit);
  const lastSpace = truncatedText.lastIndexOf(' ');
  if (lastSpace > 0) {
    truncatedText = truncatedText.slice(0, lastSpace);
  }

  return `${truncatedText}...`;
};
