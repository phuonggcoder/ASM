import { Button, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function Anim() {
  const translateX = useSharedValue(0);
  const width = useSharedValue(20);
  const height = useSharedValue(20);

  const handlePress = () => {
    translateX.value = withSequence(
      withTiming(50, { duration: 500 }), // Di chuyển 50px trong 500ms
      withTiming(-50, { duration: 500 }), // Di chuyển ngược lại 50px
      withTiming(0, { duration: 500 }), // Quay lại vị trí ban đầu
      withTiming(100, { duration: 500 }) 
    );

    width.value = withSequence(
      withTiming(100, { duration: 500 }),
      withTiming(50, { duration: 500 }),
      withTiming(20, { duration: 500 })
    );

    height.value = withSequence(
      withTiming(100, { duration: 500 }),
      withTiming(50, { duration: 500 }),
      withTiming(20, { duration: 500 })
    );
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: width.value,
    height: height.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "tomato",
  },
});
