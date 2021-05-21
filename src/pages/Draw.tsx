import React, {FunctionComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeSegmentedControlIOSChangeEvent,
  Dimensions,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {Plot} from '../components/Plot';
import Diagram from '../components/Diagram';

const Draw: FunctionComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orientation, setOrientation] = useState<'portrate' | 'landscape'>(
    'portrate',
  );
  const onLayout = () => {
    const {width, height} = Dimensions.get('window');
    if (height > width) {
      setOrientation('portrate');
    } else {
      setOrientation('landscape');
    }
  };
  const onChange = (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
  ) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };
  const graphSize = orientation === 'portrate' ? 350 : 250;
  const marginTop = orientation === 'portrate' ? 100 : 25;
  return (
    <View
      style={
        orientation === 'portrate'
          ? styles.containerPortrait
          : styles.containerLandscape
      }
      onLayout={onLayout}>
      <SegmentedControl
        style={
          orientation === 'portrate'
            ? styles.controlPortrait
            : styles.controlLandscape
        }
        fontStyle={{
          fontSize: 20,
          color: 'black',
        }}
        values={['Графік', 'Діаграма']}
        selectedIndex={selectedIndex}
        onChange={onChange}
      />
      {
        [
          <Plot
            max={Math.PI * 2}
            min={-Math.PI * 2}
            height={graphSize}
            width={graphSize}
            marginTop={marginTop}
          />,
          <Diagram
            height={graphSize}
            width={graphSize}
            marginTop={marginTop}
          />,
        ][selectedIndex]
      }
    </View>
  );
};

export {Draw};

const styles = StyleSheet.create({
  controlPortrait: {
    width: 300,
    maxWidth: '90%',
    marginTop: 100,
    height: 50,
  },
  controlLandscape: {
    width: 300,
    maxWidth: '90%',
    marginTop: 30,
    height: 30,
  },
  containerPortrait: {
    flex: 1,
    maxHeight: '95%',
    alignItems: 'center',
    padding: 10,
  },
  containerLandscape: {
    flex: 1,
    maxHeight: '95%',
    alignItems: 'center',
    padding: 10,
  },
});
