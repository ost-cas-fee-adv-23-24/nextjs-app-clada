'use server';

import { redirect } from 'next/navigation';

export const search = async (formData: FormData) => {
  const searchParams = formData.get('tags')?.toString().split(' ');

  redirect(`/tags?${searchParams?.map((param) => 'tag=' + param).join('&')}`);
};
