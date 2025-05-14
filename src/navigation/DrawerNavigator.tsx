import React, { useContext } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { ThemeContext } from "../theme/ThemeContext";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const mainScreens = [
  {
    name: "Accueil",
    component: HomeScreen,
    icon: "home" as IconName
  },
  {
    name: "Calculateur",
    component: CalculatorScreen,
    icon: "calculator" as IconName
  },
];

const bottomScreens = [
  {
    name: "Paramètres",
    component: SettingsScreen,
    icon: "settings" as IconName
  }
];

// Composant personnalisé pour le contenu du Drawer
function CustomDrawerContent(props: any) {
  const { theme } = useContext(ThemeContext);
  const { state, navigation } = props;
  const { routes } = state;
  
  // Séparer les routes principales et les routes du bas
  const mainRoutes = routes.filter((route: any) => 
    mainScreens.some(screen => screen.name === route.name));
  
  const bottomRoutes = routes.filter((route: any) => 
    bottomScreens.some(screen => screen.name === route.name));

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Liste des écrans principaux */}
        <View>
          {mainRoutes.map((route: any, index: number) => {
            const { name } = route;
            const focused = index === state.index;
            const screen = mainScreens.find(s => s.name === name);
            
            return (
              <DrawerItem
                key={name}
                label={name}
                focused={focused}
                onPress={() => navigation.navigate(name)}
                activeTintColor={theme.colors.primary}
                inactiveTintColor={theme.colors.text}
                icon={({ color, size }) => (
                  <Ionicons 
                    name={screen?.icon || "help-circle"} 
                    size={size} 
                    color={color} 
                  />
                )}
              />
            );
          })}
        </View>
        
        {/* Écrans du bas (comme Paramètres) */}
        <View style={[
          styles.bottomSection, 
          { borderTopColor: theme.colors.border }
        ]}>
          {bottomRoutes.map((route: any) => {
            const { name } = route;
            const focused = bottomRoutes.indexOf(route) + mainRoutes.length === state.index;
            const screen = bottomScreens.find(s => s.name === name);
            
            return (
              <DrawerItem
                key={name}
                label={name}
                focused={focused}
                onPress={() => navigation.navigate(name)}
                activeTintColor={theme.colors.primary}
                inactiveTintColor={theme.colors.text}
                icon={({ color, size }) => (
                  <Ionicons 
                    name={screen?.icon || "help-circle"} 
                    size={size} 
                    color={color} 
                  />
                )}
              />
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Drawer.Navigator 
      initialRouteName="Accueil"
      drawerContent={props => <CustomDrawerContent {...props} />}
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
        }
      }}
    >
      {/* Écrans principaux */}
      {mainScreens.map((screen) => (
        <Drawer.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component} 
        />
      ))}
      
      {/* Écrans en bas */}
      {bottomScreens.map((screen) => (
        <Drawer.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component} 
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    paddingTop: 10,
  }
});
