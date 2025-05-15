import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { getThemedStyles } from "../styles/styles";
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={localStyles.contentContainer}
    >
      <View style={[styles.card, localStyles.section]}>
        <View style={localStyles.sectionHeader}>
          <Ionicons 
            name="calculator" 
            size={24} 
            color={theme.colors.primary} 
            style={localStyles.sectionIcon} 
          />
          <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>
            Calculateur d'Itérations
          </Text>
        </View>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          Le calculateur d'itérations est un outil qui permet de planifier une stratégie d'achat progressif 
          sur un actif dont le prix baisse régulièrement. Il calcule le nombre d'achats nécessaires pour 
          atteindre le prix cible final.
        </Text>
        
        <Text style={[styles.secondaryText, localStyles.subtitle]}>Comment ça marche?</Text>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          1. Entrez votre balance totale disponible pour la stratégie.
        </Text>
        <Text style={[styles.text, localStyles.paragraph]}>
          2. Spécifiez le prix initial et le prix final cible de l'actif.
        </Text>
        <Text style={[styles.text, localStyles.paragraph]}>
          3. Définissez le pourcentage de réduction attendu à chaque itération.
        </Text>
        <Text style={[styles.text, localStyles.paragraph]}>
          4. Optionnellement, définissez un target (objectif) de prix de sortie.
        </Text>
        <Text style={[styles.text, localStyles.paragraph]}>
          5. Le calculateur vous indiquera combien d'itérations seront nécessaires, comment répartir votre 
          capital, et présentera le détail de chaque itération.
        </Text>
        
        <Text style={[styles.secondaryText, localStyles.subtitle]}>Formules utilisées</Text>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          <Text style={{fontWeight: 'bold'}}>Nombre d'itérations: </Text>
          log(Prix final / Prix initial) / log(1 - Réduction)
        </Text>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          <Text style={{fontWeight: 'bold'}}>Prix de sortie: </Text>
          Si Target en %, alors Prix d'entrée × (1 + Target/100)
          {'\n'}
          Si Target en valeur absolue, alors directement cette valeur
        </Text>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          <Text style={{fontWeight: 'bold'}}>Profit: </Text>
          (Prix Sortie - Prix entrée) × (Montant Par Trade × Levier / Prix entrée)
        </Text>
        
        <Text style={[styles.secondaryText, localStyles.subtitle]}>Récupération des pertes</Text>
        
        <Text style={[styles.text, localStyles.paragraph]}>
          L'option "Récupération des pertes" permet d'ajouter au profit le montant par trade 
          multiplié par (numéro d'itération - 1). Cette stratégie est utile pour compenser 
          les pertes accumulées lors des itérations précédentes.
        </Text>
      </View>
      
      <View style={[styles.card, localStyles.section]}>
        <View style={localStyles.sectionHeader}>
          <Ionicons 
            name="information-circle" 
            size={24} 
            color={theme.colors.primary} 
            style={localStyles.sectionIcon} 
          />
          <Text style={[localStyles.sectionTitle, { color: theme.colors.text, fontSize: 18 }]}>
            Historique des mises à jour
          </Text>
        </View>
        
        <View style={localStyles.updateItem}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>v1.0.0 - Lancement initial</Text>
          <Text style={[styles.secondaryText, localStyles.updateDate]}>Octobre 2023</Text>
          <Text style={styles.text}>• Calculateur d'itérations de base</Text>
          <Text style={styles.text}>• Mode clair/sombre</Text>
          <Text style={styles.text}>• Calcul des prix de sortie et profits</Text>
          <Text style={styles.text}>• Option de récupération des pertes</Text>
        </View>
        
        {/* Des entrées futures seront ajoutées ici */}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  section: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 20,
  },
  updateItem: {
    marginBottom: 15,
  },
  updateDate: {
    fontStyle: 'italic',
    marginBottom: 5,
    fontSize: 12,
  }
}); 