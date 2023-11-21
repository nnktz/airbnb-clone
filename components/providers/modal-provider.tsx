'use client';

import { useEffect, useState } from 'react';

import { RegisterModal } from '../modals/register-modal';
import { LoginModal } from '../modals/login-modal';
import { RentModal } from '../modals/rent-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
    </>
  );
};
