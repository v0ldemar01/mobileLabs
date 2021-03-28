import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeSegmentedControlIOSChangeEvent,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {Plot} from '../components/Plot';
import Diagram from '../components/Diagram';

const styles = StyleSheet.create({
  control: {
    width: 300,
    maxWidth: '90%',
    marginTop: 100,
    height: 50,
  },
  container: {
    flex: 1,
    maxHeight: '95%',
    alignItems: 'center',
    padding: 10,
  },
});

const Draw = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onChange = (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
  ) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        style={styles.control}
        fontStyle={{
          fontSize: 20,
          color: 'black',
        }}
        values={['Графік', 'Діаграма']}
        selectedIndex={selectedIndex}
        onChange={onChange}
      />
      {
        [<Plot max={3} min={-3} height={400} width={400} />, <Diagram />][
          selectedIndex
        ]
      }
    </View>
  );
};

export {Draw};
