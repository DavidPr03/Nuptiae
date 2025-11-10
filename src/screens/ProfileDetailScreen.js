import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  Alert, 
  Pressable, 
  TextInput, 
  StyleSheet, 
  View, 
  Text 
} from 'react-native';
import { Avatar, AvatarImage } from '@gluestack-ui/themed';
import { ChevronLeft, Camera, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, role, avatar, username, bgColor } = route.params;

  const [userAvatar, setUserAvatar] = useState(avatar);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleChangePhoto = () => {
    Alert.alert('Cambiar foto', 'Aquí puedes integrar un selector de imagen.');
  };

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Por favor ingresa la nueva contraseña y confírmala.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    Alert.alert('Contraseña cambiada', `Nueva contraseña: ${password}`);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#999" />
        </Pressable>
        <Text style={styles.headerText}>Perfil Detallado</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Pressable onPress={handleChangePhoto}>
          <Avatar size="2xl" mb={16} bg={bgColor}>
            <AvatarImage source={{ uri: userAvatar }} alt={name} />
            <Camera
              size={20}
              color="#fff"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Avatar>
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.username}>Usuario: {username}</Text>
      </View>

      {/* Cambiar contraseña */}
      <View style={styles.form}>
        {/* Nueva contraseña */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Nueva contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            autoCapitalize="none"
          />
          <Pressable
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeIcon}
          >
            {secureText ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
          </Pressable>
        </View>

        {/* Confirmar contraseña */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirmText}
            autoCapitalize="none"
          />
          <Pressable
            onPress={() => setSecureConfirmText(!secureConfirmText)}
            style={styles.eyeIcon}
          >
            {secureConfirmText ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
          </Pressable>
        </View>

        {/* Botón Guardar */}
        <Pressable style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  form: {
    marginTop: 16,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 40, // espacio para el icono
    backgroundColor: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 15,
  },
  saveButton: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
