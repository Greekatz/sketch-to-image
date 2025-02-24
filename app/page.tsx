import { on } from 'events';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export default function Home() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      

    </main>
  );
}