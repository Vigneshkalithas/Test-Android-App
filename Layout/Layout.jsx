import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createStackNavigator , TransitionPresets } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  Home,
  Agent,
  Procurement,
  Logistics,
} from "../pages";
import { Login, UserProfile, AllActivities, MapFullView ,ListView, CalenderView, NewProcurement, ProcurementCart, EditProcurement,EditContentScreen, AgentActivities, CompetitorsDetails , PricingScreen, DetailsHistory, DetailsHistoryMonthly,ParticularDayHistory, AllCompetitors, EditParticularProcurement, OnBoarding, ProfileInfo , LogoutScreen, CreateCompatitors,  OffBeatS, Sample2, Reimbursement, LeaderBoard,  ProfileDetails, HelpAndSupport, Aboutus, PrivacyAndPolicy, HelpDetails, HepDetailsInfo , APMCWinner, ExportDocuments , APMCDetails ,Notification , DrawerContent, Experiment, ReimburseBill,DistrictWiseReim, SelectProcurement, AgentWages, CreateReimbursement,  ChatHome, ChatScreen, CreateEvent}from "../screen";
import { ASPECTRADIO, COLORS, ICONS , UNIQUEWIDTH} from "../Constants";
import { MyContext } from "../context/MyContext";
import { ConfirmBottmSheet, ExportBottomSheet , DistrictSheet, FloatButton } from "../components";
import { createDrawerNavigator } from '@react-navigation/drawer';





const Layout = () => {
  // const navigationState = useNavigationState(state => state);
  const { isLoggedIn, isLoading } = useContext(MyContext);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const AgentStack = createStackNavigator();
  const ProcurementStack = createStackNavigator();
  const Drawer = createDrawerNavigator();



  const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="HomeMain" component={Home}  options={{ headerShown: false }} />
     
            <HomeStack.Screen
              name="ListView"
              component={ListView}
              options={{ headerShown: false }}
            />
            <HomeStack.Screen
              name="CalenderView"
              component={CalenderView}
              options={{ headerShown: false }}
            />
  </HomeStack.Navigator>
);

  const AgentStackScreen = () => (
  <AgentStack.Navigator>
    <AgentStack.Screen name="AgentMain" component={Agent}  options={{ headerShown: false }} />
     <AgentStack.Screen
              name="AgentActivities"
              component={AgentActivities}
              options={{ headerShown: false }}
            />
             {/* <AgentStack.Screen
              name="CompetitorsDetails"
              component={CompetitorsDetails}
              options={{ headerShown: false }}
            /> */}
            {/* <AgentStack.Screen
              name="PricingScreen"
              component={PricingScreen}
              options={{ headerShown: false }}
            /> */}
            
  </AgentStack.Navigator>
);

const ProcurementStackScreen = () => (
  <ProcurementStack.Navigator>
    <ProcurementStack.Screen name="ProcurementMain" component={Procurement}  options={{ headerShown: false }} />
     {/* <ProcurementStack.Screen
              name="DetailsHistory"
              component={DetailsHistory}
              options={{ headerShown: false }}
            /> */}
             <ProcurementStack.Screen
              name="DetailsHistoryMonthly"
              component={DetailsHistoryMonthly}
              options={{ headerShown: false }}
            />
            <ProcurementStack.Screen
              name="ParticularDayHistory"
              component={ParticularDayHistory}
              options={{ headerShown: false }}
            />
             <ProcurementStack.Screen
              name="AllCompetitors"
              component={AllCompetitors}
              options={{ headerShown: false }}
            />
            
  </ProcurementStack.Navigator>
);

  function BottomTabs() {
    return (
     
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            // backgroundColor: COLORS.white,
            position: "absolute",
            bottom: "1%",
            borderTopWidth: 0,
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <ICONS.HomeActiveIcon /> : <ICONS.HomeIcon />,
          }}
        />

        <Tab.Screen
          name="Agent"
          component={AgentStackScreen}
          options={{
            tabBarLabel: "Agent",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <ICONS.AgentActiveIcon /> : <ICONS.AgentIcon />,
          }}
        />
        <Tab.Screen
          name="Procurement"
          component={ProcurementStackScreen}
          options={{
            tabBarLabel: "Procurement",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <ICONS.ProcurementActiveIcon/>
              ) : (
                <ICONS.ProcurementIcon />
              ),
          }}
        />

        <Tab.Screen
          name="Logistics"
          component={Logistics}
          options={{
            tabBarLabel: "Logistics",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? <ICONS.LogisticsActiveIcon /> : <ICONS.LogisticsIcon />,
          }}
        />
          {/* <FloatButton/> */}
      </Tab.Navigator>
      
    );
  }



const MainStackNavigator = ()=> {
  return (
    <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProfileInfo"
              component={ProfileInfo}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
           
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllActivities"
              component={ AllActivities}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="NewProcurement"
              component={NewProcurement}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProcurementCart"
              component={ProcurementCart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProcurement"
              component={EditProcurement}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditParticularProcurement"
              component={EditParticularProcurement}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditContentScreen"
              component={EditContentScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="PricingScreen"
              component={PricingScreen}
              options={{ headerShown: false }}
            />
           <Stack.Screen
              name="MapFullView"
              component={MapFullView}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="CompetitorsDetails"
              component={CompetitorsDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailsHistory"
              component={DetailsHistory}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="LogoutScreen"
              component={LogoutScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateCompatitors"
              component={CreateCompatitors}
              options={{ headerShown: false }}
            />
             <Stack.Screen name="OffBeatS" component={OffBeatS}  />
              <Stack.Screen name="Sample2" component={Sample2} options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade' }}/>
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileDetails"
              component={ProfileDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Aboutus"
              component={Aboutus}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="HelpAndSupport"
              component={HelpAndSupport}
              options={{ headerShown: false }}
            /> 
             <Stack.Screen
              name="PrivacyAndPolicy"
              component={PrivacyAndPolicy}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="HelpDetails"
              component={HelpDetails}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="HepDetailsInfo"
              component={HepDetailsInfo}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              options={{ headerShown: false }}
              name="APMCWinner"
              component={APMCWinner}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="APMCDetails"
              component={APMCDetails}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ExportDocuments"
              component={ExportDocuments}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="LeaderBoard"
              component={LeaderBoard}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="Reimbursement"
              component={Reimbursement}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="ReimburseBill"
              component={ReimburseBill}
            />
              <Stack.Screen
              options={{ headerShown: false }}
              name="Notification"
              component={Notification}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="Experiment"
              component={Experiment}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="DistrictWiseReim"
              component={DistrictWiseReim}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SelectProcurement"
              component={SelectProcurement}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AgentWages"
              component={AgentWages}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CreateReimbursement"
              component={CreateReimbursement}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="ChatScreen"
              component={ChatScreen}
            />
             <Stack.Screen
              options={{ headerShown: false }}
              name="ChatHome"
              component={ChatHome}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CreateEvent"
              component={CreateEvent}
            />
            
          </Stack.Group>
        )}
      </Stack.Navigator>
  );
}

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.btnBlue} />
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator screenOptions={{
    drawerStyle: {
      width: ASPECTRADIO.width * 0.85
    },
  }} drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }}/>
      </Drawer.Navigator>
      <StatusBar/>
      {isLoggedIn ? (
        <StatusBar animated={true} />
      ) : (
        <StatusBar style="light" backgroundColor="#1B51BB"/>
        // <StatusBar animated={true} backgroundColor="transparent" />
      )}
      
       <ConfirmBottmSheet/>
        <DistrictSheet/>
    </NavigationContainer>
  );
};

export default Layout;

const styles = StyleSheet.create({});