import { formatTimeAgo } from '../utils/formatters';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from './theme'; 
import { Ionicons } from '@expo/vector-icons';
import { apiRequest } from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context';


const Dashboard = () => {
  const router = useRouter();
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recentLeads, setRecentLeads] = useState([]);





  const fetchActivity = async () => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("userToken");
    
    // Fetch both at the same time
    const [notesRes, leadsRes] = await Promise.all([
      apiRequest('/notes', 'GET', null, token),
      apiRequest('/leads', 'GET', null, token)
    ]);

    // Handle Notes
    const notesData = Array.isArray(notesRes) ? notesRes : (notesRes.data || []);
    setRecentNotes(notesData.slice(0, 3));

    // Handle Leads
    const leadsData = Array.isArray(leadsRes) ? leadsRes : (leadsRes.data || []);
    setRecentLeads(leadsData.slice(0, 3));

    

  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};
  // 2. THE EFFECT (This fixes the "unused" warning and starts the app)
  useEffect(() => {
    fetchActivity();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchActivity();
  }, []);

  const quickActions = [
    { id: '1', title: 'Customer', icon: 'person-add', route: '/add-customer', color: Colors.info },
    { id: '2', title: 'New Lead', icon: 'flash', route: '/add-lead', color: Colors.accent },
    { id: '3', title: 'Log Note', icon: 'journal', route: '/add-note', color: Colors.success },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />
        }
      >
        {/* Header */}
        
        <View style={styles.header}>
          
          <View>
            <Text style={styles.greeting}>Hello, Youssef!</Text>
            <Text style={styles.subGreeting}>Welcome to your BizPal dashboard.</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/customers')}>
             <Ionicons name="person-circle" size={45} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* 3. QUICK ACTIONS (Now guaranteed to stay visible) */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.actionCard}
              onPress={() => router.push(action.route)}
            >
              <View style={[styles.iconCircle, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {/* 4. ACTIVE LEADS SECTION */}
<View style={styles.activityHeader}>
    <Text style={styles.sectionTitle}>Active Leads</Text>
    <TouchableOpacity onPress={() => router.push('/leads')}>
        <Text style={{color: Colors.accent, fontFamily: Typography.semiBold}}>View All</Text>
    </TouchableOpacity>
</View>

{recentLeads.length > 0 ? (
  recentLeads.map((lead) => (
    <View key={lead.id} style={[styles.noteCard, { borderLeftColor: Colors.info }]}>
        <View style={styles.noteTop}>
          <Text style={styles.noteCustomer}>{lead.customer_name || 'New Lead'}</Text>
          <Text style={[styles.statusBadge, { color: lead.status === 'Closed' ? Colors.success : Colors.accent }]}>
            {lead.status}
          </Text>
        </View>
        <Text style={styles.noteText}>Value: ${lead.deal_value}</Text>
    </View>
  ))
) : (
  <Text style={styles.emptySubText}>No active leads yet.</Text>
)}

<View style={{ marginVertical: 10 }} />

{/* 5. RECENT NOTES SECTION (Your existing Recent Activity) */}
<View style={styles.activityHeader}>
    <Text style={styles.sectionTitle}>Recent Notes</Text>
</View>
{/* ... keep your existing notes mapping here ... */}

        {/* 4. RECENT ACTIVITY */}
        <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={fetchActivity}>
                <Text style={{color: Colors.accent, fontFamily: Typography.semiBold}}>Refresh</Text>
            </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color={Colors.accent} size="large" style={{ marginTop: 20 }} />
        ) : recentNotes.length > 0 ? (
          recentNotes.map((item) => (
            <View key={item.id} style={styles.noteCard}>
               <View style={styles.noteTop}>
                  <Text style={styles.noteCustomer}>{item.customer_name || 'Note Update'}</Text>
                  <Text style={styles.noteDate}>{formatTimeAgo(item.created_at)}</Text>
                  <Text style={styles.noteDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
               </View>
               <Text style={styles.noteText}>{item.note}</Text>
               
               
            </View>
            
          ))
        ) : (
          <TouchableOpacity style={styles.emptyActivityCard} onPress={() => router.push('/add-note')}>
              <Ionicons name="analytics-outline" size={40} color={Colors.border} />
              <Text style={styles.emptyText}>No recent activity found.</Text>
              <Text style={styles.emptySubText}>Start by logging a new note for a customer.</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.m },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: Spacing.l },
  greeting: { fontSize: 24, fontFamily: Typography.bold, color: Colors.primary },
  subGreeting: { fontSize: 14, fontFamily: Typography.regular, color: Colors.textMuted },
  sectionTitle: { fontSize: 18, fontFamily: Typography.semiBold, color: Colors.secondary, marginBottom: Spacing.m },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xl },
  actionCard: { backgroundColor: Colors.surface, width: '30%', padding: Spacing.m, borderRadius: 16, alignItems: 'center' },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.s },
  actionLabel: { fontSize: 12, fontFamily: Typography.semiBold, color: Colors.primary },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.s },
  noteCard: { 
    backgroundColor: Colors.surface, 
    padding: Spacing.m, 
    borderRadius: 16, 
    marginBottom: Spacing.m,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent 
  },
  statusBadge: { fontSize: 12, fontFamily: Typography.semiBold, textTransform: 'uppercase' },
  noteTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  noteCustomer: { fontFamily: Typography.bold, fontSize: 14, color: Colors.primary },
  noteDate: { fontSize: 11, color: Colors.textMuted },
  noteText: { fontFamily: Typography.regular, fontSize: 13, color: Colors.textMain },
  emptyActivityCard: { backgroundColor: Colors.surface, padding: Spacing.xl, borderRadius: 20, alignItems: 'center', marginTop: Spacing.m, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.border },
  emptyText: { fontFamily: Typography.semiBold, color: Colors.secondary, marginTop: Spacing.m },
  emptySubText: { fontFamily: Typography.regular, color: Colors.textMuted, fontSize: 12, textAlign: 'center' }
});

export default Dashboard;