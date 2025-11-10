import React from 'react';
import { ScrollView, Image } from 'react-native';
import {
  VStack,
  HStack,
  Text,
  Box,
  Center,
  Divider,
  Button,
  ButtonText,
  Badge,
  BadgeText,
  useToast,
  Toast,
  ToastTitle,
  Heading,
} from '@gluestack-ui/themed';
import { ShoppingCart, XCircle } from 'lucide-react-native';

export default function DisplayScreen() {
  const toast = useToast();

  const handleAddToCart = () => {
    toast.show({
      placement: 'bottom',
      render: () => (
        <Toast
          action="success"
          variant="solid"
          bg="#8e0909b5"
          borderRadius="$xl"
          p="$3"
        >
          <ToastTitle color="white">
            Producto agregado al carrito
          </ToastTitle>
        </Toast>
      ),
    });
  };

  return (
    <ScrollView>
      <VStack flex={1} bg="$backgroundLight0" p="$5" space="lg">


        <Box
          borderRadius="$2xl"
          bg="white"
          shadowColor="#000"
          shadowOpacity={0.15}
          shadowRadius={6}
          elevation={5}
          overflow="hidden"
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171',
            }}
            style={{
              width: '100%',
              height: 250,
              resizeMode: 'cover',
            }}
          />

          <VStack p="$4">
            <Text color="$gray600" fontSize="$sm">
              Fashion Clothing
            </Text>

            <Heading size="md" mt="$1" mb="$1">
              Cotton Kurta
            </Heading>

            <Text color="$gray500">
              Floral embroidered notch neck thread work cotton kurta in white and black.
            </Text>

            <VStack w="100%" mt="$4" space="sm">
              <Button bg="#8e0909b5" onPress={handleAddToCart}>
                <ButtonText>Add to cart</ButtonText>
              </Button>

              <Button variant="outline" borderColor="$gray300">
                <ButtonText color="$gray700">Wishlist</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Box>


        <Box
          mt="$5"
          borderRadius="$2xl"
          bg="white"
          p="$4"
          shadowColor="#000"
          shadowOpacity={0.15}
          shadowRadius={5}
          elevation={3}
        >
          <Heading size="sm" mb="$3">
            Recent Inventory
          </Heading>

          <VStack>

            <HStack
              justifyContent="space-between"
              borderBottomWidth={1}
              borderColor="$gray300"
              pb="$2"
            >
              <Text fontWeight="$bold" flex={1}>Product</Text>
              <Text fontWeight="$bold" flex={1}>Size</Text>
              <Text fontWeight="$bold" flex={1}>Available</Text>
              <Text fontWeight="$bold" flex={1}>Status</Text>
            </HStack>


            <HStack justifyContent="space-between" alignItems="center" mt="$3">
              <Text flex={1}>Dress</Text>
              <Text flex={1}>Medium</Text>
              <Text flex={1}>12</Text>
              <HStack flex={1} space="sm" alignItems="center">
                <Badge bg="$red600" borderRadius="$full">
                  <HStack alignItems="center" space="xs">
                    <XCircle color="white" size={12} />
                    <BadgeText color="white">Soldout</BadgeText>
                  </HStack>
                </Badge>
                <ShoppingCart size={16} color="#444" />
              </HStack>
            </HStack>

            <Divider my="$3" />

            <HStack justifyContent="space-between" alignItems="center">
              <Text flex={1}>Earring</Text>
              <Text flex={1}>Large</Text>
              <Text flex={1}>90</Text>
              <HStack flex={1} space="sm" alignItems="center">
                <Badge bg="$green600" borderRadius="$full">
                  <BadgeText color="white">In stock</BadgeText>
                </Badge>
                <ShoppingCart size={16} color="#444" />
              </HStack>
            </HStack>

            <Divider my="$3" />

            <HStack justifyContent="space-between" alignItems="center">
              <Text flex={1}>Kurta</Text>
              <Text flex={1}>Small</Text>
              <Text flex={1}>25</Text>
              <HStack flex={1} space="sm" alignItems="center">
                <Badge bg="$green600" borderRadius="$full">
                  <BadgeText color="white">In stock</BadgeText>
                </Badge>
                <ShoppingCart size={16} color="#444" />
              </HStack>
            </HStack>

            <Center mt="$4">
              <Text color="$gray500" fontStyle="italic">
                Showing recent product availability
              </Text>
            </Center>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
