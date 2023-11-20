'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useRegisterModal } from '@/hooks/use-register-modal';

import { Modal } from '../modal';
import { BodyContent } from './body-content';
import { FooterContent } from './footer-content';

export const RegisterModal = () => {
  const isOpen = useRegisterModal((state) => state.isOpen);
  const onClose = useRegisterModal((state) => state.onClose);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    try {
      setIsLoading(true);

      await axios.post('api/register', data).then((response) => {
        onClose();
      });
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Register'
      actionLabel='Continue'
      body={
        <BodyContent
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      }
      footer={<FooterContent />}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
