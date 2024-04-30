'use client';

import { IconButton, LocationIcon } from 'clada-storybook';
import Link from 'next/link';

export const Location = ({ name }: { name: string }) => {
  return (
    <div>
      <IconButton
        Icon={LocationIcon}
        variant='base'
        href='https://www.google.com/maps/place/OST+%E2%80%93+Ostschweizer+Fachhochschule+%7C+Campus+Rapperswil/@47.2237549,8.8175528,19.44z/data=!4m15!1m8!3m7!1s0x479ab7c81618c2ab:0xf9db7e38adba80d9!2sRapperswil-Jona!3b1!8m2!3d47.2266239!4d8.8184374!16zL20vMDF0azYz!3m5!1s0x479ab6e12facc7ad:0x711fa65bf58f9c0f!8m2!3d47.2239212!4d8.8172596!16s%2Fm%2F055wmfd?entry=ttu'
        linkComponent={Link}
      >
        {name}
      </IconButton>
    </div>
  );
};
