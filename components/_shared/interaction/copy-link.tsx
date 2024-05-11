'use client';

import { Post } from '@/utils/models';
import { CopyLinkButton } from 'clada-storybook';

const copyLinkLabels = {
  default: 'Copy Link',
  active: 'Link copied',
};

export const CopyLink = ({ post }: { post: Post }) => {
  const copyToClipboard = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const postUrl = `${baseUrl}/post/${post.id}`;

    navigator.clipboard.writeText(postUrl);
  };

  return (
    <CopyLinkButton
      labels={copyLinkLabels}
      onClick={copyToClipboard}
      testid='single-post-copy-link'
    ></CopyLinkButton>
  );
};
