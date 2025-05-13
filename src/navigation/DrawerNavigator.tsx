import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import { ThemeContext } from "../theme/ThemeContext";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { StyleSheet, View } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator 
      initialRouteName="Accueil"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <ThemeToggleButton />
          </View>
        )
      }}
    >
      <Drawer.Screen name="Accueil" component={HomeScreen} />
      <Drawer.Screen name="Calculateur" component={CalculatorScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
  }
});
