import { z } from 'zod';

export const decodeULIDTimestamp = (ulid: string) => {
  const validatedUlid = z
    .string()
    .ulid({ message: 'Invalid ULID' })
    .parse(ulid);
  const timestampPart = validatedUlid.substring(0, 10);
  const characters = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  const timestamp = timestampPart.split('').reduce((acc, char) => {
    return acc * 32 + characters.indexOf(char);
  }, 0);

  return new Date(timestamp);
};
