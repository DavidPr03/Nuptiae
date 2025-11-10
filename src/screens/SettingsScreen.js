import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarImage,
  Pressable,
  Icon,
} from '@gluestack-ui/themed';
import { ChevronLeft, ChevronRight, Home, FileText, CreditCard, Users } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <VStack flex={1}>
          {/* Header */}
          <HStack
            px="$4"
            py="$3"
            alignItems="center"
            borderBottomWidth={1}
            borderBottomColor="$borderLight200"
          >
            <Pressable onPress={() => console.log('Go back')}>
              <Icon as={ChevronLeft} size="xl" color="$textLight800" />
            </Pressable>
            <Text fontSize="$lg" fontWeight="$semibold" ml="$3">
              Configuración de cuentas
            </Text>
          </HStack>

          {/* Content */}
          <VStack flex={1} px="$4" pt="$6">
            {/* Código de cuenta dúo */}
            <VStack alignItems="center" mb="$6">
              <Text fontSize="$3xl" fontWeight="$bold" color="$textLight900">
                456
              </Text>
              <Text fontSize="$sm" color="$textLight600">
                Código de cuenta dúo
              </Text>
            </VStack>

            {/* Jessica - Novia */}
            <Pressable onPress={() => console.log('Jessica pressed')}>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                py="$4"
                borderBottomWidth={1}
                borderBottomColor="$borderLight100"
              >
                <HStack alignItems="center" space="md">
                  <Avatar size="md" bg="$pink300">
                    <AvatarImage
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                      }}
                      alt="Jessica"
                    />
                  </Avatar>
                  <VStack>
                    <Text fontSize="$md" fontWeight="$medium" color="$textLight900">
                      Jessica
                    </Text>
                    <Text fontSize="$sm" color="$textLight500">
                      Novia
                    </Text>
                  </VStack>
                </HStack>
                <Icon as={ChevronRight} size="lg" color="$textLight400" />
              </HStack>
            </Pressable>

            {/* Michael - Novio */}
            <Pressable onPress={() => console.log('Michael pressed')}>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                py="$4"
                borderBottomWidth={1}
                borderBottomColor="$borderLight100"
              >
                <HStack alignItems="center" space="md">
                  <Avatar size="md" bg="$blue300">
                    <AvatarImage
                      source={{
                        uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                      }}
                      alt="Michael"
                    />
                  </Avatar>
                  <VStack>
                    <Text fontSize="$md" fontWeight="$medium" color="$textLight900">
                      Michael
                    </Text>
                    <Text fontSize="$sm" color="$textLight500">
                      Novio
                    </Text>
                  </VStack>
                </HStack>
                <Icon as={ChevronRight} size="lg" color="$textLight400" />
              </HStack>
            </Pressable>

            {/* Planner de boda button */}
            <Pressable
              onPress={() => console.log('Planner de boda pressed')}
              mt="$6"
            >
              <Box
                bg="$pink100"
                borderRadius="$full"
                py="$4"
                alignItems="center"
              >
                <Text fontSize="$md" fontWeight="$medium" color="$pink800">
                  Planner de boda
                </Text>
              </Box>
            </Pressable>
          </VStack>

        </VStack>
      </SafeAreaView>
    </>
  );
}