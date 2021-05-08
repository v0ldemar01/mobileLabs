import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BooksImages} from '../../assets/images';
import IBook from '../models/IBook';
import {IBookProps} from '../models/props/IBook';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const styles = StyleSheet.create({
  rectButtonContainer: {
    width: '95%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 80,
    paddingLeft: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c',
    backgroundColor: 'white',
    height: 'auto',
  },
  textContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontStyle: 'italic',
  },
  price: {
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: 100,
  },
  leftAction: {
    flex: 1,
    width: 100,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 80,
  },
});

export const SwipeableBook: FunctionComponent<IBookProps> = ({
  item,
  onPress,
  onDelete,
}: IBookProps) => {
  let _swipeableRow: any;

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={close}>
        <View style={styles.leftAction}>
          <AnimatedIcon
            name="backspace-outline"
            size={30}
            color="#fff"
            style={[styles.actionIcon, {transform: [{scale}]}]}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="white"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };

  const close = () => _swipeableRow.close();
  const onDeleteHandle = (isbn13: string) => {
    close();
    onDelete(isbn13);
  };

  return (
    <Swipeable
      key={item.isbn13}
      ref={(ref) => (_swipeableRow = ref)}
      friction={1}
      leftThreshold={80}
      rightThreshold={80}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={() => onDeleteHandle(item.isbn13)}>
      <TouchableOpacity onPress={onPress}>
        <Book {...item} />
      </TouchableOpacity>
    </Swipeable>
  );
};

const Book = ({title, subtitle, price, image}: IBook) => (
  <RectButton style={styles.rectButtonContainer}>
    <Image style={styles.image} source={BooksImages[image]} />
    <View style={styles.textContainer}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={3} style={styles.subtitle}>
        {subtitle}
      </Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  </RectButton>
);
