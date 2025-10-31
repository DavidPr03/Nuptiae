import React, { useState } from 'react';
import { VStack, HStack, Text, Divider, Center } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';
import { CheckIcon, ChevronDownIcon, CircleIcon } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from '@gluestack-ui/themed';
import { Link, LinkText } from '@/components/ui/link';
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from '@/components/ui/radio';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@gluestack-ui/themed';
import { Switch } from '@/components/ui/switch';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@gluestack-ui/themed';
import { Button, ButtonText } from '@/components/ui/button';

export default function FormsScreen() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [textColor, setTextColor] = useState('#000');
  const [message, setMessage] = useState('Presióname para cambiar el color del texto');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  return (
    <ScrollView>
      <VStack space="xl" p="$5" bg="$backgroundLight0">
        {/* ---------- TÍTULO PRINCIPAL ---------- */}
        <Center>
          <Text fontSize="$3xl" fontWeight="$bold" color="$red800">
            Formulario
          </Text>
        </Center>

        <Divider my="$4" />

        {/* ---------- CHECKBOX GROUP ---------- */}
        <Text fontSize="$lg" fontWeight="$semibold" mb="$2" color="$red700">
          Selecciona los generos que te interesan
        </Text>
        <VStack space="sm">
          {['Terror', 'Documental', 'Acción', 'Comedia', 'Romanticas'].map((interest) => (
            <Checkbox
              key={interest}
              isChecked={selectedInterests.includes(interest)}
              onChange={() => toggleInterest(interest)}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel textTransform="capitalize">{interest}</CheckboxLabel>
            </Checkbox>
          ))}
        </VStack>

        <Text mt="$3" fontSize="$sm" color="$red500">
          Intereses seleccionados: {selectedInterests.join(', ') || 'Ninguno'}
        </Text>

        <Divider my="$4" />

        {/* ---------- PRESSABLE ---------- */}
        <Text fontSize="$lg" fontWeight="$semibold" mb="$2" color="$red700">
          Botón Presionable
        </Text>
        <Pressable
          onPressIn={() => setTextColor('#004a9aff')}
          onPressOut={() => setTextColor('#980000ff')}
          onPress={() => setMessage('¡Cambie de color!')}
        >
          <Text style={{ color: textColor, fontSize: 16 }}>{message}</Text>
        </Pressable>

        <Divider my="$4" />

        {/* ---------- LINK + ICON ---------- */}
        <Text fontSize="$lg" fontWeight="$semibold" mb="$2" color="$red700">
          Boton Link
        </Text>
        <Link href="https://cloud.aguascalientes.tecnm.mx/">
          <HStack alignItems="center" space="sm">
            <LinkText color="$red450" fontWeight="$bold">
              Plataforma Digital TECNM Aguascalientes
            </LinkText>
            <CheckIcon size={18} color="#a11e1eff" />
          </HStack>
        </Link>

        <Divider my="$4" />

        {/* ---------- RADIOGROUP ---------- */}
        <FormControl>
          <FormControlLabel mb="$4">
            <FormControlLabelText fontSize='$lg' fontWeight="$semibold" color='$red800'>Selecciona el Idioma</FormControlLabelText>
          </FormControlLabel>
          <RadioGroup
            value={selectedRadio}
            onChange={(val) => setSelectedRadio(val)}
          >
            <VStack space="sm">
              {['Español', 'Ingles', 'Frances', 'Chino'].map((option) => (
                <Radio key={option} value={option}>
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{option}</RadioLabel>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
          <Text mt="$2" color="$red500">
            Seleccionado: {selectedRadio || 'Ninguno'}
          </Text>
        </FormControl>

        <Divider my="$4" />

        {/* ---------- SELECT ---------- */}
        <FormControl>
          <FormControlLabel mb="$2">
            <FormControlLabelText fontSize='$lg' fontWeight="$semibold" color='$red800'>Selecciona tu mes</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={(val) => setSelectedOption(val)}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Selecciona un mes" />
              <SelectIcon as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Enero" value="01" />
                <SelectItem label="Febrero" value="02" />
                <SelectItem label="Marzo" value="03"/>
                <SelectItem label="Abril" value="04"/>
                <SelectItem label="Mayo" value="05" />
                <SelectItem label="Junio" value="06" />
                <SelectItem label="Julio" value="07" />
                <SelectItem label="Agosto" value="08" />
                <SelectItem label="Septiembre" value="09" />
                <SelectItem label="Octubre" value="10" />
                <SelectItem label="Noviembre" value="11" />
                <SelectItem label="Diciembre" value="12" />
              </SelectContent>
            </SelectPortal>
          </Select>
          <Text mt="$2" color="$red500">
            Seleccionado: {selectedOption || 'Ninguno'}
          </Text>
        </FormControl>

        <Divider my="$4" />

        {/* ---------- SLIDER ---------- */}
        <FormControl>
          <FormControlLabel mb="$2">
            <FormControlLabelText fontSize='$lg' fontWeight="$semibold" color='$red800'>Volumen</FormControlLabelText>
          </FormControlLabel>
          <Slider
            size="md"
            minValue={0}
            maxValue={100}
            value={sliderValue}
            onChange={setSliderValue}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt="$2" color="$red500">
            Valor actual: {sliderValue}
          </Text>
        </FormControl>

        <Divider my="$4" />

        {/* ---------- SWITCH ---------- */}
        <FormControl>
          <FormControlLabel mb="$2">
            <FormControlLabelText fontSize='$lg' fontWeight="$semibold" color='$red800'>Ubicación</FormControlLabelText>
          </FormControlLabel>
          <Switch
            size="md"
            isDisabled={false}
            trackColor={{ false: '#d4d4d4', true: '#8a0606ff' }}
            thumbColor="#fff"
            isChecked={isSwitchOn}
            onChange={() => setIsSwitchOn(!isSwitchOn)}
          />
          <Text mt="$2" color="$black500">
            Estado: {isSwitchOn ? 'Activada' : 'Desactivada'}
          </Text>
        </FormControl>

        <Divider my="$4" />

        {/* ---------- TEXTAREA ---------- */}
        <FormControl>
          <FormControlLabel mb="$2">
            <FormControlLabelText
            fontSize="$lg"
            fontWeight="$semibold"
            color="$red800">
              Deja un comentario
            </FormControlLabelText>
          </FormControlLabel>
          
          <Textarea size="md" isDisabled={false} className="w-full">
            <TextareaInput
                placeholder="Escribe aquí tu comentario..."
                value={textAreaValue}
                onChangeText={(text) => setTextAreaValue(text)}
                />
          </Textarea>
            <Text mt="$2" color="$red500" fontWeight="$medium">
              {textAreaValue.length} caracteres
            </Text>
        </FormControl>
                  
        <Divider my="$6" />


        

        {/* ---------- BUTTON ---------- */}
        <Center>
          <Button
            onPress={() => alert('Formulario enviado')}
            >
              <ButtonText color="#9b0b0bff" fontSize="$lg" fontWeight="$bold">
                Enviar Formulario
                </ButtonText>
            </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
}