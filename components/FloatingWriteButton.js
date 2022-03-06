import React, {useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform, Pressable, StyleSheet, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FloatingWriteButton({hidden}) {
  const {navigate} = useNavigation();
  const onPress = () => {
    navigate('Write');
  };

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animated.timing(animation, {
    //   toValue: hidden ? 1 : 0,
    //   useNativeDriver: true,
    // }).start();
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      tension: 45,
      friction: 5,
    }).start();
  }, [hidden, animation]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && {opaticy: pressed ? 0.6 : 1},
        ]}
        android_ripple={{color: 'white'}}>
        <Icon name="add" color={styles.icon} size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#ffffff',
  },
});
