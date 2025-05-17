import React, { useContext } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import { ThemeContext } from "../contexts/ThemeContext";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

// Type pour un écran dans notre navigateur
type ScreenConfig = {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  icon: IconName;
};

// Utilisation d'une fonction pour définir les écrans afin d'accéder à la traduction
const getScreens = (t: (key: string) => string) => {
  // Écrans principaux
  const mainScreens: ScreenConfig[] = [
    {
      name: "home",
      label: t('navigation.home'),
      component: HomeScreen,
      icon: "home"
    },
    {
      name: "calculator",
      label: t('navigation.calculator'),
      component: CalculatorScreen,
      icon: "calculator"
    },
  ];

  // Écrans de bas de menu
  const bottomScreens: ScreenConfig[] = [
    {
      name: "about",
      label: t('navigation.about'),
      component: AboutScreen,
      icon: "information-circle"
    },
    {
      name: "settings",
      label: t('navigation.settings'),
      component: SettingsScreen,
      icon: "settings"
    }
  ];

  return { mainScreens, bottomScreens };
};

// Composant personnalisé pour le contenu du Drawer
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { state, navigation } = props;
  const { routes } = state;
  const currentRouteName = routes[state.index].name;
  
  const { mainScreens, bottomScreens } = getScreens(t);
  
  // Séparer les routes principales et les routes du bas
  const mainRoutes = routes.filter((route) => 
    mainScreens.some(screen => screen.name === route.name));
  
  const bottomRoutes = routes.filter((route) => 
    bottomScreens.some(screen => screen.name === route.name));

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Liste des écrans principaux */}
        <View>
          {mainRoutes.map((route) => {
            const { name } = route;
            const focused = name === currentRouteName;
            const screen = mainScreens.find(s => s.name === name);
            
            return (
              <DrawerItem
                key={name}
                label={screen?.label || name}
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
          {bottomRoutes.map((route) => {
            const { name } = route;
            const focused = name === currentRouteName;
            const screen = bottomScreens.find(s => s.name === name);
            
            return (
              <DrawerItem
                key={name}
                label={screen?.label || name}
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
  const { t } = useTranslation();
  const { mainScreens, bottomScreens } = getScreens(t);
  
  return (
    <Drawer.Navigator 
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
          options={{
            title: screen.label
          }}
        />
      ))}
      
      {/* Écrans en bas */}
      {bottomScreens.map((screen) => (
        <Drawer.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component}
          options={{
            title: screen.label
          }}
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
