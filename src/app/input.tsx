import React, { useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function TaxiFareScreen() {
  const [distance, setDistance] = useState<string>("");
  const [trafficTime, setTrafficTime] = useState<string>("");
  const [fare, setFare] = useState<number>(0);

  // ฟังก์ชันคำนวณค่าแท็กซี่
  const calculateFare = () => {
    if (!distance.trim() || !trafficTime.trim()) {
      Alert.alert(
        "ข้อผิดพลาด",
        "กรุณากรอกข้อมูลให้ครบถ้วนทั้งระยะทางและเวลารถติด",
      );
      return;
    }

    const dist = parseFloat(distance);
    const time = parseInt(trafficTime);

    if (isNaN(dist) || isNaN(time) || dist < 0 || time < 0) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลเป็นตัวเลขที่ถูกต้อง");
      return;
    }

    let totalFare = 0;

    if (dist > 0) {
      if (dist <= 1) {
        totalFare += 35;
      } else {
        totalFare += 35; // กิโลเมตรแรก 35 บาท

        let remainingDist = dist - 1;

        // กม.ที่ 2 - 10 (กิโลเมตรละ 6.50 บาท) -> คิดสูงสุด 9 กม.
        const tier1 = Math.min(remainingDist, 9);
        totalFare += tier1 * 6.5;
        remainingDist -= tier1;

        // กม.ที่ 11 - 20 (กิโลเมตรละ 7.00 บาท) -> คิดสูงสุด 10 กม.
        if (remainingDist > 0) {
          const tier2 = Math.min(remainingDist, 10);
          totalFare += tier2 * 7.0;
          remainingDist -= tier2;
        }

        // กม.ที่ 21 - 40 (กิโลเมตรละ 8.00 บาท) -> คิดสูงสุด 20 กม.
        if (remainingDist > 0) {
          const tier3 = Math.min(remainingDist, 20);
          totalFare += tier3 * 8.0;
          remainingDist -= tier3;
        }

        // กม.ที่ 41 - 60 (กิโลเมตรละ 8.50 บาท) -> คิดสูงสุด 20 กม.
        if (remainingDist > 0) {
          const tier4 = Math.min(remainingDist, 20);
          totalFare += tier4 * 8.5;
          remainingDist -= tier4;
        }

        // กม.ที่ 61 - 80 (กิโลเมตรละ 9.00 บาท) -> คิดสูงสุด 20 กม.
        if (remainingDist > 0) {
          const tier5 = Math.min(remainingDist, 20);
          totalFare += tier5 * 9.0;
          remainingDist -= tier5;
        }

        // กม.ที่ 81 ขึ้นไป (กิโลเมตรละ 10.50 บาท)
        if (remainingDist > 0) {
          totalFare += remainingDist * 10.5;
        }
      }
    }

    // คำนวณจากเวลารถติด (นาทีละ 3 บาท)
    totalFare += time * 3;

    // ตั้งค่าผลลัพธ์
    setFare(totalFare);
    Keyboard.dismiss();
  };

  // ฟังก์ชันรีเซ็ตล้างหน้าจอ
  const handleClear = () => {
    setDistance("");
    setTrafficTime("");
    setFare(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Taxi Fare</Text>
      </View>

      <View style={styles.content}>
        {/* รูปไอคอน Taxi */}
        <Image
          source={require("@/assets/images/taxi.png")}
          style={styles.taxiIcon}
        />

        <Text style={styles.title}>คำนวณค่าโดยสารแท็กซี่</Text>

        {/* ฟิลด์กรอกระยะทาง */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ระยะทาง (กิโลเมตร) 🚖</Text>
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกระยะทาง"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
          />
        </View>

        {/* ฟิลด์กรอกเวลารถติด */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>เวลารถติด (นาที) ⏰</Text>
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกเวลารถติด"
            keyboardType="numeric"
            value={trafficTime}
            onChangeText={setTrafficTime}
          />
        </View>

        {/* ปุ่มคำนวณ */}
        <TouchableOpacity style={styles.calcButton} onPress={calculateFare}>
          <Text style={styles.buttonText}>คำนวณค่าโดยสาร</Text>
        </TouchableOpacity>

        {/* ปุ่มยกเลิก */}
        <TouchableOpacity style={styles.cancelButton} onPress={handleClear}>
          <Text style={styles.buttonText}>ยกเลิก</Text>
        </TouchableOpacity>

        {/* กล่องแสดงผลลัพธ์ */}
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>ค่าโดยสารแท็กซี่</Text>
          <Text style={styles.resultValue}>{fare.toFixed(2)}</Text>
          <Text style={styles.resultUnit}>บาท</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#07acff",
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  taxiIcon: {
    width: 165,
    height: 165,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontFamily: "Kanit-Bold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: "Kanit",
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a5a5a5",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: "Kanit",
    fontSize: 14,
  },
  calcButton: {
    backgroundColor: "#07acff",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#9E9E9E",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "Kanit",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#cde0f3",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cde0f3",
  },
  resultLabel: {
    fontFamily: "Kanit",
    fontSize: 14,
    color: "#232323",
    marginBottom: 5,
  },
  resultValue: {
    fontFamily: "Kanit",
    fontSize: 36,
    fontWeight: "bold",
    color: "#DC3545",
    marginVertical: 5,
  },
  resultUnit: {
    fontFamily: "Kanit",
    fontSize: 14,
    color: "#232323",
  },
});
