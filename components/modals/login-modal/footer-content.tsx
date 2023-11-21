'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

import { useRegisterModal } from '@/hooks/use-register-modal';
import { useLoginModal } from '@/hooks/use-login-modal';

import { Button } from '@/components/ui/button';

export const FooterContent = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />

      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <span>First time using Airbnb?</span>

          <div
            role='button'
            onClick={toggle}
            className='text-neutral-800 hover:underline'>
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
};
