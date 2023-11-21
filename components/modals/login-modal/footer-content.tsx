'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import { useRegisterModal } from '@/hooks/use-register-modal';
import { useLoginModal } from '@/hooks/use-login-modal';

import { Button } from '@/components/ui/button';

export const FooterContent = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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
          <span>You don&rsquo;t have an account?</span>

          <div
            role='button'
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className='text-neutral-800 hover:underline'>
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};
