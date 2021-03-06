// Eksternal
import { EditIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  SkeletonText,
  Text,
  useDisclosure,
  useMediaQuery,
  Image,
  Grid,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

// Internal
import {
  Evening,
  Menu,
  Morning,
  Mosque,
  Pray,
  Prophet,
  Quran,
} from '@components/icons';
import { iIcons } from '@interfaces';
import { toc } from '@data';
import {
  useColors,
  useGregDate,
  useHijriDate,
  useInitialLocation,
  useQuote,
} from '@hooks';

// Internal dynamic
const Location = dynamic(() => import('@components/Location'));
const Settings = dynamic(() => import('@components/Settings'));

// Dynamic icons for table of contents
const Icons: iIcons = {
  1: <Morning h="125%" w="100%" />,
  2: <Evening h="100%" w="100%" />,
  3: <Quran h="100%" w="100%" />,
  4: <Prophet h="103%" w="100%" />,
  5: <Pray h="100%" w="100%" />,
};

const Home = () => {
  // Open location picker
  const {
    isOpen: isOpenLocation,
    onOpen: onOpenLocation,
    onClose: onCloseLocation,
  } = useDisclosure();

  // Open settings
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  // Toggle quote text
  const [showFullQuote, setShowFullQuote] = useState(false);
  const handleClickQuote = () => setShowFullQuote(!showFullQuote);

  // Dark/light mode colors
  const {
    bgBlue,
    bgCard,
    bgGradientBlue,
    bgGradientPurple,
    bgPurple,
    iconMenu,
    textDark,
    textLight,
    textPurpleDark,
    textPurpleLight,
  } = useColors();

  // Get default location from storage
  const { initialLocation: city } = useInitialLocation();

  const { gregDate, gregTime } = useGregDate();
  const { prayingTimes, hijriDate, isLoading } = useHijriDate(city);
  const [isSmallerThan360] = useMediaQuery('(max-width: 360px)');
  const { quote, narrator } = useQuote();

  return (
    <>
      {/* Head */}
      <NextSeo
        title="Muslim ??? Jadwal Sholat, Dzikir, dan Doa."
        description="Jadwal sholat, dzikir, dan kumpulan doa dalam genggaman."
      />
      {/* Header */}
      <Flex as="header" align="center" justify="space-between">
        {/* Menu */}
        <IconButton
          aria-label="Open menu drawer"
          bgColor={bgCard}
          borderRadius={10}
          icon={<Menu color={iconMenu} />}
          onClick={onOpenSettings}
          p={2.5}
        />
        {/* Date */}
        <Flex direction="column">
          <Text
            fontSize={['md', 'lg']}
            fontWeight="extrabold"
            textAlign="right"
          >
            {gregDate}
          </Text>
          <SkeletonText isLoaded={!isLoading} noOfLines={1}>
            <Text
              color={textPurpleDark}
              fontSize={['xs', 'sm']}
              fontWeight="extrabold"
              textAlign="right"
            >
              {hijriDate}
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>
      {/* Main */}
      <Flex as="main" direction="column" sx={{ gap: 30 }}>
        {/* Praying Times */}
        <AspectRatio
          as="section"
          ratio={16 / 9}
          bgGradient={`linear(to-bl, ${bgGradientPurple}, ${bgGradientBlue})`}
          borderRadius={25}
          boxShadow="sm"
        >
          <Box>
            <Flex
              direction="column"
              justify="space-between"
              h="100%"
              w="100%"
              p={isSmallerThan360 ? 3 : 7}
            >
              <Flex direction="column">
                <Flex align="center" sx={{ gap: 5 }}>
                  <Text
                    color={textLight}
                    fontSize={['xl', '2xl']}
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {city}
                  </Text>
                  <IconButton
                    aria-label="Open location modal"
                    bgColor="transparent"
                    onClick={onOpenLocation}
                    h={5}
                    w={5}
                    minW={5}
                    p={0}
                    icon={<EditIcon color="gray.300" />}
                    zIndex={1}
                    _active={{ bgColor: 'transparent' }}
                    _hover={{ bgColor: 'transparent' }}
                  />
                </Flex>
                <Text
                  color={textLight}
                  fontSize={['xl', '2xl']}
                  fontWeight="bold"
                >
                  {gregTime}
                </Text>
              </Flex>
              <Flex
                justify="space-evenly"
                zIndex={1}
                sx={{ gap: isSmallerThan360 ? 5 : 15 }}
              >
                {prayingTimes.map(item => (
                  <SkeletonText
                    key={item.id}
                    isLoaded={!isLoading}
                    noOfLines={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Flex direction="column" align="center">
                      <Text
                        color={textLight}
                        fontSize={['sm', 'md']}
                        fontWeight="bold"
                        textShadow=".5px .5px #000"
                      >
                        {item.name}
                      </Text>
                      <Text
                        color={textLight}
                        fontSize={['sm', 'md']}
                        fontWeight="bold"
                        textShadow=".5px .5px #000"
                      >
                        {item.time}
                      </Text>
                    </Flex>
                  </SkeletonText>
                ))}
              </Flex>
            </Flex>
            <Mosque
              position="absolute"
              right={-12}
              top={4}
              h="85%"
              w="85%"
              opacity={0.35}
              zIndex={0}
            />
          </Box>
        </AspectRatio>
        {/* Dzikir */}
        <Flex as="section" sx={{ gap: 20 }}>
          {toc
            .filter(({ category }) => category === 'dzikir')
            .map(content => {
              const { id, title, link } = content;
              const bgColor = id === 1 ? bgPurple : bgBlue;
              const color = id === 1 ? textDark : textLight;
              return (
                <Link href={link} passHref={true} key={id}>
                  <AspectRatio flex={1} ratio={1} cursor="pointer">
                    <Flex
                      bgColor={bgColor}
                      borderRadius="20%"
                      direction="column"
                      sx={{ gap: '10px' }}
                    >
                      <Flex align="flex-end" h={['50px', '75px']}>
                        {Icons[id]}
                      </Flex>
                      <Text
                        color={color}
                        fontSize={['sm', 'md']}
                        fontWeight="bold"
                      >
                        {title}
                      </Text>
                    </Flex>
                  </AspectRatio>
                </Link>
              );
            })}
        </Flex>
        {/* Baca Quran */}
        <Flex as="section" direction="column" sx={{ gap: 10 }}>
          <Heading fontSize={['md', 'lg']} fontWeight="bold">
            Baca Quran
          </Heading>
          <Link href="/quran">
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <Image src="https://i.ibb.co/cLV1BDh/Frame-98.png" alt="Quran" />
            </Grid>
          </Link>
        </Flex>
        {/* Quotes */}
        <Flex
          as="section"
          direction="column"
          bgColor={bgCard}
          borderRadius={25}
          boxShadow="md"
          p={5}
          sx={{ gap: 10 }}
        >
          <Heading fontSize={['md', 'lg']} fontWeight="bold">
            Mutiara Hikmah
          </Heading>
          <Flex direction="column" sx={{ gap: 10 }}>
            <Collapse startingHeight={40} in={showFullQuote}>
              <Text
                cursor="pointer"
                fontSize={['sm', 'md']}
                fontStyle="italic"
                onClick={handleClickQuote}
              >
                {quote}
              </Text>
            </Collapse>
            <Text
              color={textPurpleLight}
              fontSize={['xs', 'sm']}
              fontWeight="bold"
            >
              {narrator}
            </Text>
          </Flex>
        </Flex>
        {/* Doa */}
        <Flex as="section" direction="column" sx={{ gap: 10 }}>
          <Heading fontSize={['md', 'lg']} fontWeight="bold">
            Kumpulan Doa
          </Heading>
          <Flex sx={{ gap: 10 }}>
            {toc
              .filter(({ category }) => category === 'doa')
              .map(content => {
                const { id, title, link } = content;
                return (
                  <Link href={link} passHref={true} key={id}>
                    <AspectRatio flex={1} ratio={1} cursor="pointer">
                      <Flex
                        bgColor={bgCard}
                        borderRadius="15%"
                        boxShadow="md"
                        direction="column"
                        sx={{ gap: '10px' }}
                      >
                        <Flex align="flex-end" h={['35px', '60px']}>
                          {Icons[id]}
                        </Flex>
                        <Text fontSize={['xs', 'sm']} fontWeight="bold">
                          {title}
                        </Text>
                      </Flex>
                    </AspectRatio>
                  </Link>
                );
              })}
          </Flex>
        </Flex>
      </Flex>

      {/* Settings */}
      <Settings isOpen={isOpenSettings} onClose={onCloseSettings} />
      {/* Location Picker */}
      <Location isOpen={isOpenLocation} onClose={onCloseLocation} />
    </>
  );
};

export default Home;
