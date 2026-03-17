import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';

const CustomModal = ({ visible, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalButton, styles.exitButton]} 
              onPress={onConfirm}
            >
              <Text style={styles.exitButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  modalTitle: {
    fontFamily: Typography.bold,
    fontSize: 20,
    color: Colors.textMain,
    marginBottom: 10,
  },
  modalMessage: {
    fontFamily: Typography.regular,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.textMuted,
  },
  exitButton: {
    backgroundColor: Colors.error,
  },
  cancelButtonText: {
    fontFamily: Typography.semiBold,
    color: Colors.textMuted,
  },
  exitButtonText: {
    fontFamily: Typography.bold,
    color: Colors.textMain,
  },
});