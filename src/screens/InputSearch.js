import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function InputSearch({ visible, onClose, onApplyFilters, initialFilters }) {
  const [filters, setFilters] = useState({
    sortBy: initialFilters?.sortBy || null,
    priceRange: {
      min: initialFilters?.priceRange?.min || '',
      max: initialFilters?.priceRange?.max || ''
    },
    rating: initialFilters?.rating || null,
  });

  const handlePriceInput = (text, type) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: text }
    }));
  };

  const resetFilters = () => {
    setFilters({
      sortBy: null,
      priceRange: { min: '', max: '' },
      rating: null,
    });
  };

  const handleConfirm = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Tùy chỉnh lọc theo điều kiện</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sắp xếp theo</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['Gợi ý cho bạn', 'Giá cao nhất', 'Giá thấp nhất.'].map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.sortButton, filters.sortBy === option && styles.selectedButton]}
                    onPress={() => setFilters(prev => ({ ...prev, sortBy: option }))}>
                    <Text style={[styles.sortText, filters.sortBy === option && styles.selectedText]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Khoảng giá</Text>
              <View style={styles.priceContainer}>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Giá tối thiểu"
                  value={filters.priceRange.min}
                  onChangeText={text => handlePriceInput(text, 'min')}
                  keyboardType="numeric"
                />
                <Text style={styles.currencyText}>đ</Text>
                </View>
                <Text style={styles.priceSeparator}>-</Text>
                <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Giá tối đa"
                  value={filters.priceRange.max}
                  onChangeText={text => handlePriceInput(text, 'max')}
                  keyboardType="numeric"
                />
                <Text style={styles.currencyText}>đ</Text>
              </View>
            </View>
            </View>

            <View style={styles.section}>
             <Text style={styles.sectionTitle}>Đánh giá</Text>
             <View style={styles.ratingContainer}>
               {[5, 4, 3, 2, 1].map(rating => (
                 <TouchableOpacity
                   key={rating}
                   style={[styles.ratingButton, filters.rating === rating && styles.selectedRatingButton]}
                   onPress={() => setFilters(prev => ({...prev, rating}))}>
                   <Image
                     source={require('../assets/star.png')}
                     style={[styles.starIcon, filters.rating === rating && styles.selectedStarIcon]}
                   />
                   <Text style={[styles.ratingText, filters.rating === rating && styles.selectedRatingText]}>
                     {rating}
                   </Text>
                 </TouchableOpacity>
               ))}
             </View>
           </View>

          </ScrollView>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Đặt lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleConfirm}>
              <Text style={styles.applyButtonText} >Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  selectedButton: {
    backgroundColor: '#000000',
  },
  sortText: {
    fontSize: 15,
    color: '#000',
  },
  selectedText: {
    color: '#FFF',
  },
  // Khoảng giá
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  priceInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  currencyText: {
    color: '#000',
    marginLeft: 4,
  },
  priceSeparator: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  // Đánh giá
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 15,
    mginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  selectedRatingButton: {
    backgroundColor: '#000000',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: '#FFD700',
  },
  selectedStarIcon: {
    tintColor: '#FFF',
  },
  ratingText: {
    color: '#000',
  },
  selectedRatingText: {
    color: '#FFF',
  },

  // Nút "Đặt lại" & "Áp dụng"
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 8,
    paddingVertical: 12,
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});