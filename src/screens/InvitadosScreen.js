import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Animated, Alert, Dimensions } from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Icon,
  Avatar,
  AvatarFallbackText,
  Fab,
  FabIcon,
} from '@gluestack-ui/themed';
import { Menu, User, ChevronRight, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const InvitadosScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('roles');
  const [menuOpen, setMenuOpen] = useState(false);

  const animInvitado = useRef(new Animated.Value(0)).current;
  const animItinerario = useRef(new Animated.Value(0)).current;

  const AnimatedFab = Animated.createAnimatedComponent(Fab);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      Animated.stagger(50, [
        Animated.timing(animItinerario, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animInvitado, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animInvitado, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animItinerario, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [menuOpen]);

  useEffect(() => {
    const addedIt = route?.params?.addedItinerario;
    const addedInv = route?.params?.addedInvitado;
    const show = route?.params?.showTab;

    if (addedIt) {
      setItinerarioItems((prev) => [addedIt, ...prev]);
      setActiveTab('itinerario');
      navigation.setParams({ addedItinerario: undefined, showTab: undefined });
    }

    if (addedInv) {
      const id = Date.now();
      setInvitados((prev) => [{ id, ...addedInv }, ...prev]);
      setActiveTab('roles');
      navigation.setParams({ addedInvitado: undefined, showTab: undefined });
    }

    if (show) {
      if (show === 'itinerario') setActiveTab('itinerario');
      else if (show === 'roles') setActiveTab('roles');
      navigation.setParams({ showTab: undefined });
    }
  }, [route?.params?.addedItinerario, route?.params?.addedInvitado, route?.params?.showTab]);

  const [invitados, setInvitados] = useState([
    { id: 1, nombre: 'Mauricio Rivera', rol: 'Padrino de anillos', tareas: [] },
    { id: 2, nombre: 'Omar Mendoza', rol: 'Dama de honor', tareas: [] },
    { id: 3, nombre: 'Diego Zamora', rol: 'Padre del novio', tareas: [] },
    { id: 4, nombre: 'Belén Ibarra', rol: 'Madre de la novia', tareas: [] },
    { id: 5, nombre: 'Zoé Montserrat', rol: 'Niña de las flores', tareas: [] },
  ]);

  const [itinerarioItems, setItinerarioItems] = useState([
    { time: '2:00 PM', title: 'Ceremonia en', subtitle: 'Iglesia' },
    { time: '4:00 PM', title: 'Recepción en', subtitle: 'Salón de fiesta' },
    { time: '5:00 PM', title: 'Presentación de', subtitle: 'los novios' },
    { time: '6:00 PM', title: 'Banquete', subtitle: '' },
    { time: '10:00 PM', title: 'Despedida de los', subtitle: 'novios' },
  ]);

  const InvitadoItem = ({ invitado, index }) => (
    <Pressable
      onPress={() =>
        Alert.alert(
          'Opciones',
          invitado.nombre,
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteInvitado(index) },
            { text: 'Editar', onPress: () => handleEditInvitado(invitado, index) },
          ],
          { cancelable: true }
        )
      }
    >
      <HStack
        alignItems="center"
        justifyContent="space-between"
        py="$4"
        px="$4"
        bg="$white"
        mb="$2"
        borderRadius="$lg"
      >
        <HStack alignItems="center" space="md" flex={1}>
          <Avatar size="md" bg="$coolGray300">
            <AvatarFallbackText>{invitado.nombre}</AvatarFallbackText>
            <Icon as={User} color="$coolGray600" size="xl" />
          </Avatar>
          <VStack flex={1}>
            <Text fontSize="$md" fontWeight="$semibold" color="$black">
              {invitado.nombre}
            </Text>
            <Text fontSize="$sm" color="$coolGray600">
              {invitado.rol}
            </Text>
          </VStack>
        </HStack>
        <Icon as={ChevronRight} color="$coolGray400" size="xl" />
      </HStack>
    </Pressable>
  );

  const handleEditInvitado = (item, index) => {
    navigation.navigate('AddInvitado', {
      initialItem: item,
      onSave: (newItem) => {
        setInvitados((prev) => prev.map((it, i) => (i === index ? { ...it, ...newItem } : it)));
        setActiveTab('roles');
      },
    });
  };

  const handleDeleteInvitado = (index) => {
    Alert.alert(
      'Eliminar invitado',
      '¿Deseas eliminar a este invitado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setInvitados((prev) => prev.filter((_, i) => i !== index)),
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditItinerario = (item, index) => {
    navigation.navigate('AddItinerario', {
      initialItem: item,
      onSave: (newItem) => {
        setItinerarioItems((prev) => prev.map((it, i) => (i === index ? newItem : it)));
        setActiveTab('itinerario');
      },
    });
  };

  const handleDeleteItinerario = (index) => {
    Alert.alert(
      'Eliminar evento',
      '¿Deseas eliminar este evento del itinerario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setItinerarioItems((prev) => prev.filter((_, i) => i !== index)),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Box flex={1} bg="$coolGray50">
      {/* Header */}
      <Box bg="$white" pb="$2" pt="$12" px="$4">
        <HStack alignItems="center" justifyContent="space-between" mb="$4">
          <Pressable onPress={() => navigation.openDrawer()}>
            <Icon as={Menu} size="xl" color="$black" />
          </Pressable>
          <Text fontSize="$xl" fontWeight="$bold" color="$black">
            Invitados
          </Text>
          <Box width="$8" />
        </HStack>

        {/* Tabs */}
        <HStack space="lg">
          <Pressable onPress={() => setActiveTab('roles')} flex={1}>
            <Box
              pb="$3"
              borderBottomWidth={activeTab === 'roles' ? 3 : 0}
              borderBottomColor="$red500"
            >
              <Text
                fontSize="$md"
                fontWeight="$semibold"
                color={activeTab === 'roles' ? '$black' : '$coolGray500'}
                textAlign="center"
              >
                Roles
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setActiveTab('itinerario')} flex={1}>
            <Box
              pb="$3"
              borderBottomWidth={activeTab === 'itinerario' ? 3 : 0}
              borderBottomColor="$red500"
            >
              <Text
                fontSize="$md"
                fontWeight="$semibold"
                color={activeTab === 'itinerario' ? '$black' : '$coolGray500'}
                textAlign="center"
              >
                Itinerario
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </Box>

      {/* Contenido con scroll vertical en cada tab */}
      <Box flex={1}>
        {activeTab === 'roles' ? (
          <ScrollView showsVerticalScrollIndicator={true} style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <VStack space="sm">
              {invitados.map((invitado, idx) => (
                <InvitadoItem key={invitado.id ?? idx} invitado={invitado} index={idx} />
              ))}
            </VStack>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={true} style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <VStack space="sm">
              {itinerarioItems.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    Alert.alert(
                      'Opciones',
                      `${item.time} — ${item.title}${item.subtitle ? ' • ' + item.subtitle : ''}`,
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteItinerario(index) },
                        { text: 'Editar', onPress: () => handleEditItinerario(item, index) },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <HStack
                    py="$4"
                    px="$4"
                    alignItems="center"
                    borderBottomWidth={1}
                    borderBottomColor="$gray200"
                    bg="$white"
                    mb="$2"
                    borderRadius="$lg"
                  >
                    <Text fontSize="$lg" fontWeight="$medium" width={80} color="$black">
                      {item.time}
                    </Text>
                    <VStack flex={1} ml="$2">
                      <Text fontSize="$md" color="$black">
                        {item.title}
                      </Text>
                      {item.subtitle !== '' && (
                        <Text fontSize="$md" color="$black">
                          {item.subtitle}
                        </Text>
                      )}
                    </VStack>
                    <Icon as={ChevronRight} size="xl" color="$gray400" />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        )}
      </Box>

      {/* Menú flotante animado */}
      <Box position="absolute" bottom={20} right={20} alignItems="flex-end">
        {/* Invitado */}
        <AnimatedFab
          style={{
            transform: [
              {
                translateY: animInvitado.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
            ],
            opacity: animInvitado,
            marginBottom: 8,
          }}
          size="md"
          bg="$red300"
          onPress={() => {
            setMenuOpen(false);
            navigation.navigate('AddInvitado', {
              onSave: (newInvitado) => {
                const id = Date.now();
                setInvitados((prev) => [{ id, ...newInvitado }, ...prev]);
                setActiveTab('roles');
              },
            });
          }}
        >
          <FabIcon as={User} color="$white" />
          <Text color="$white" ml="$2">
            Invitado
          </Text>
        </AnimatedFab>

        {/* Itinerario */}
        <AnimatedFab
          style={{
            transform: [
              {
                translateY: animItinerario.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -180],
                }),
              },
            ],
            opacity: animItinerario,
            marginBottom: 8,
          }}
          size="md"
          bg="$red300"
          onPress={() => {
            setMenuOpen(false);
            navigation.navigate('AddItinerario', {
              onSave: (item) => {
                setItinerarioItems((prev) => [item, ...prev]);
                setActiveTab('itinerario');
              },
            });
          }}
        >
          <FabIcon as={Plus} color="$white" />
          <Text color="$white" ml="$2">
            Itinerario
          </Text>
        </AnimatedFab>

        {/* FAB principal */}
        <Fab size="lg" bg="$red400" onPress={toggleMenu}>
          <FabIcon as={Plus} color="$white" />
        </Fab>
      </Box>
    </Box>
  );
};

export default InvitadosScreen;
