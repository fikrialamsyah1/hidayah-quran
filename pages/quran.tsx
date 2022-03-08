// Eksternal
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Box,
  AspectRatio,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRef, useState } from 'react';

// Internal
import { useColors } from '@hooks';
import { iContact, iHandleChangeInput, iHandleSubmitForm } from '@interfaces';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const toast = useToast();

  const initialValues = { name: '', email: '', message: '' };
  const [values, setValues] = useState<iContact>(initialValues);
  const handleChangeInput = (event: iHandleChangeInput) => {
    const { name, value } = event.target;
    const newValues = { ...values };
    newValues[name] = value;
    setValues(newValues);
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitForm = (event: iHandleSubmitForm) => {
    event.preventDefault();

    let feedback;
    if (form.current !== null) {
      feedback = new FormData(form.current);
    }

    const url =
      'https://script.google.com/macros/s/AKfycbx-JUKUUL4kQDDhmlzpElo-eY5YDBwkYvgAK3b-EIxFoCV3KZqD2CuvccMouYz4TTi8/exec';

    setIsLoading(true);
    fetch(url, { method: 'POST', body: feedback })
      .finally(() => setIsLoading(false))
      .then(() => {
        setValues(initialValues);
        toast({
          position: 'top',
          title: 'Pesan berhasil dikirim.',
          description: 'Jazakumullahu khairo atas kritik dan sarannya.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() =>
        toast({
          position: 'top',
          title: 'Pesan gagal dikirim.',
          description: 'Mohon dicoba beberapa saat lagi.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      );
  };

  // Dark/light mode colors
  const { bgButtonHighlight, textLight } = useColors();

  return (
    <>
      {/* Head */}
      <NextSeo
        title="Baca Quran • "
        description="Silakan sampaikan kritik dan saran."
      />

      <AspectRatio ratio={16 / 33}>
        <iframe src="https://quran.com" />
      </AspectRatio>
    </>
  );
};

export default Contact;
