import { ScrollView, View, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const ProductImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.imageContainer}
      >
        {images && images.length > 0 && images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.productImage} />
        ))}
      </ScrollView>

      {/* Dot indicator */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View key={index} style={[
            styles.dot,
            activeIndex === index && styles.activeDot
          ]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: 350
  },
  productImage: {
    width: width,
    height : '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 5
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#4caf50'
  }
});

export default ProductImageSlider;
