import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const carlogo = require("@/assets/images/taxi.png");

import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  //หน่วงหน้าจอตอนโหลด
  useEffect(() => {
    setTimeout(() => {
      router.replace("/input");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Image source={carlogo} style={styles.taxiIcon} />
        <Text style={styles.title}>Taxi Fare Calculator</Text>
        <Text style={styles.subtitle}>คำนวณค่าโดยสารแท็กซี่</Text>
        <ActivityIndicator size="large" color="#df4b4b" style={styles.loader} />
      </View>

      {/* ส่วนแสดงข้อมูลนักศึกษา */}
      <View style={styles.footer}>
        <Image
          source={require("@/assets/images/ing.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.footerText}>พัฒนาโดย</Text>
        <Text style={styles.studentInfo}>
          6825D10028 Rujirada Hongsingthong
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taxiIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Kanit-Bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f01ff",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Kanit",
    fontSize: 16,
    color: "#4a4a4b",
  },
  loader: {
    marginTop: 30,
  },
  footer: {
    alignItems: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
  studentInfo: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
});
