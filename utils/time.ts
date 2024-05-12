export const decodeULIDTimestamp = (ulid: string) => {
  const base32Chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const timestampChars = ulid.slice(0, 10);
  let timestamp = 0;

  for (let i = 0; i < timestampChars.length; i++) {
    const index = base32Chars.indexOf(timestampChars[i]);
    if (index === -1) {
      throw new Error('Invalid ULID character: ' + timestampChars[i]);
    }
    timestamp = timestamp * 32 + index;
  }

  return new Date(timestamp);
};

export const getTimeDifferenceInMinutes = (ulid: string): number => {
  let timestamp = decodeULIDTimestamp(ulid);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - timestamp.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  return Math.round(Math.abs(diffInMinutes));
};

export const isNewer = (ulid1: string, ulid2: string): boolean => {
  const date1 = decodeULIDTimestamp(ulid1);
  const date2 = decodeULIDTimestamp(ulid2);

  return date1 > date2;
};
