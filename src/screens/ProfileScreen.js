import React from 'react';
import { ScrollView, Image } from 'react-native';
import { VStack, HStack, Center, Text, Divider, Box } from '@gluestack-ui/themed';
import { UserIcon, HeartIcon, EyeOffIcon, InfoIcon } from 'lucide-react-native';
import { Avatar, AvatarImage, AvatarFallbackText } from '@gluestack-ui/themed';
import { Button, ButtonText } from '@gluestack-ui/themed';

function InfoCard({ title, description, color }) {
  return (
    <Box
      bg={color || '$red50'}
      borderRadius="$2xl"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={4}
      elevation={5}
      p="$4"
      mt="$4"
    >
      <HStack alignItems="center" space="sm">
        <InfoIcon color="#8e0909b5" size={22} />
        <VStack>
          <Text fontSize="$md" fontWeight="$bold" color="$red800">
            {title}
          </Text>
          <Text fontSize="$sm" color="$gray700">
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default function ProfileScreen() {
  return (
    <ScrollView>
      <VStack flex={1} bg="$backgroundLight0" p="$5" space="lg">
        <Center>
          <Avatar size="2xl" borderWidth={3} borderColor="$red800">
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80',
              }}
              alt="Avatar"
            />
            <AvatarFallbackText></AvatarFallbackText>
          </Avatar>

          <Text fontSize="$2xl" fontWeight="$bold" mt="$3" color="$black">
            Tadeo David Prieto Delgado
          </Text>
          <Text color="$gray600">Estudiante • Aguascalientes, MX</Text>
        </Center>

        <HStack justifyContent="space-around" mt="$5">
          <VStack alignItems="center">
            <Text fontSize="$lg" fontWeight="$bold">44</Text>
            <Text color="$gray600">Siguiendo</Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontSize="$lg" fontWeight="$bold">4</Text>
            <Text color="$gray600">Seguidores</Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontSize="$xl" fontWeight="$bold">0</Text>
            <Text color="$gray600">Likes</Text>
          </VStack>
        </HStack>

        <Divider my="$5" />

        <HStack justifyContent="space-evenly" mt="$3">
            <Button
            bg="$red600"
            borderRadius="$2xl"
            p="$3"
            w="30%"
            justifyContent="center"
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={4}
            elevation={4}>
            <HStack alignItems="center" justifyContent="center" space="sm">
            <UserIcon color="white" size={18} />
            <ButtonText color="white" fontWeight="$bold" fontsize="$sm">Seguir</ButtonText>
            </HStack>
            </Button>
            
            <Button
            bg="$red700"
            borderRadius="$2xl"
            p="$3"
            w="30%"
            justifyContent="center"
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={4}
            elevation={4}>
            <HStack alignItems="center" justifyContent="center" space="sm">
            <HeartIcon color="white" size={18} />
            <ButtonText color="white" fontWeight="$bold" fontsize="$sm">Favorito</ButtonText>
            </HStack>
            </Button>
            
            <Button
            bg="$red800"
            borderRadius="$2xl"
            p="$3"
            w="30%"
            justifyContent="center"
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={4}
            elevation={4}>
            <HStack alignItems="center" justifyContent="center" space="sm">
            <EyeOffIcon color="white" size={18} />
            <ButtonText color="white" fontWeight="$bold" fontsize="$sm">Ocultar</ButtonText>
            </HStack>
        </Button>
        </HStack>

        <Text fontSize="$xl" fontWeight="$semibold" color="$red700">
            Galería
        </Text>
        
        <VStack mt="$3" space="sm">
            <Image
            source={{
                uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            }}
            alt="Imagen destacada"
            style={{
                width: '100%',
                height: 160,
                borderRadius: 20,
            }}/>
            
            <HStack justifyContent="space-between">
                {[
                    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
                    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80',
                ].map((uri, i) => (
                
                <Box key={i} width="32%">
                    <Image
                    source={{ uri }}
                    alt={`Miniatura ${i + 1}`}
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 16,
                    }}/>
                    </Box>
                ))}
                </HStack>
        </VStack>


        <InfoCard
          title="Sobre mí"
          description="Apasionado al deporte y la Tecnología."
        />
        <InfoCard
          title="Experiencia"
          description="Tecnico en Soporte y Mantenimiento de Equipo de Computo."
          color="$red100"
        />
      </VStack>
    </ScrollView>
  );
}
