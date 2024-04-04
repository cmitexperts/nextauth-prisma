// DropdownContext.client.js

import { createContext, useContext } from 'react';
import { useClient } from 'next/dynamic';

const DropdownContext = createContext();

export const useDropdownContext = () => {
  const isClient = useClient();

  if (!isClient) {
    throw new Error('useDropdownContext only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/context-in-server-component');
  }

  return useContext(DropdownContext);
};

