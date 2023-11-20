'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { useRegisterModal } from '@/hooks/use-register-modal';

export const FooterContent = () => {
  const registerModal = useRegisterModal();

  return (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />

      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {}}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <span>Already have an account?</span>

          <div
            role='button'
            onClick={registerModal.onClose}
            className='text-neutral-800 hover:underline'>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
