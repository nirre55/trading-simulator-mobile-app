import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import ThemeToggleButton from "../components/ThemeToggleButton";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={HomeScreen} />
        <Drawer.Screen name="Calculateur" component={CalculatorScreen} />
      </Drawer.Navigator>
    </>
  );
}
