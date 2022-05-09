#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include <addons/TokenHelper.h>

#include <addons/RTDBHelper.h>

#define API_KEY "AIzaSyAvRqmiTWAI_cD_UvU-7u5v4HeFAuxAqbo"


#define DATABASE_URL "car-parking-system-243ba-default-rtdb.firebaseio.com"//<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app


#define USER_EMAIL "romel.nettey32@gmail.com"
#define USER_PASSWORD "123456"

#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig configF;

int parking1_slot1_ir_s = 15; // parking slot1 infrared sensor connected with pin number A0 of arduino
int parking1_slot2_ir_s = 2;
int parking1_slot3_ir_s = 4;
int parking1_slot4_ir_s = 8;
int parking1_slot5_ir_s = 12;

String sensor1; 
String sensor2; 
String sensor3;
String sensor4;
String sensor5;
String status1;
String status2;
String status3;
String status4;
String status5;

const char* ssid = "AndroidAPF5B0";
const char* password = "good1234";


void setup(){
  Serial.begin(9600);  
  
  pinMode(parking1_slot1_ir_s, INPUT);
  pinMode(parking1_slot2_ir_s, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");


   /* Assign the api key (required) */
  configF.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the RTDB URL (required) */
  configF.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  configF.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

 
  Firebase.begin(&configF, &auth);

  //Comment or pass false value when WiFi reconnection will control by your code or third party library
  Firebase.reconnectWiFi(true);

  Firebase.setDoubleDigits(5);
  
}

void loop(){
  
  p1slot1(); 
  p1slot2();
  p1slot3();
  p1slot4();
  p1slot5();
  digitalWrite(parking1_slot1_ir_s, LOW); 
  digitalWrite(parking1_slot2_ir_s, LOW); 
  digitalWrite(parking1_slot3_ir_s, LOW); 
  digitalWrite(parking1_slot4_ir_s, LOW); 
  digitalWrite(parking1_slot5_ir_s, LOW); 

}


void p1slot1() // parkng 1 slot1
{
  if( digitalRead(parking1_slot1_ir_s) == LOW) 
  {
  sensor1 = "P1S1: Parked";
  status1 = "Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot1", status1) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor1);
 delay(500); 
  } 
if( digitalRead(parking1_slot1_ir_s) == HIGH)
{
  sensor1 = "P1S1: Not Parked"; 
  status1 = "Not Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot1", status1) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor1);
 delay(500);  
}

}

void p1slot2() // parking 1 slot2
{
  if( digitalRead(parking1_slot2_ir_s) == HIGH) 
  {
  sensor2 = "P1S2: Parked"; 
  status2 = "Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor2);  
  delay(500); 
  }
if( digitalRead(parking1_slot2_ir_s) == LOW)  
  {
  sensor2 = "P1S2: Not Parked";
  status2 = "Not Parked";  
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor2);
 delay(500);
  } 
}

void p1slot3() // parking 1 slot3
{
  if( digitalRead(parking1_slot3_ir_s) == HIGH) 
  {
  sensor3 = "P1S3: Parked"; 
  status3 = "Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor3);  
  delay(500); 
  }
if( digitalRead(parking1_slot3_ir_s) == LOW)  
  {
  sensor3 = "P1S3: Not Parked";
  status3 = "Not Parked";  
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor3);
 delay(500);
  } 
}

void p1slot4() // parking 1 slot4
{
  if( digitalRead(parking1_slot4_ir_s) == HIGH) 
  {
  sensor4 = "P1S4: Parked"; 
  status4 = "Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor4);  
  delay(500); 
  }
if( digitalRead(parking1_slot4_ir_s) == LOW)  
  {
  sensor4 = "P1S4: Not Parked";
  status4 = "Not Parked";  
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor4);
 delay(500);
  } 
}

void p1slot5() // parking 1 slot5
{
  if( digitalRead(parking1_slot5_ir_s) == HIGH) 
  {
  sensor5 = "P1S5: Parked"; 
  status5 = "Parked";
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor5);  
  delay(500); 
  }
if( digitalRead(parking1_slot5_ir_s) == LOW)  
  {
  sensor5 = "P1S5: Not Parked";
  status5 = "Not Parked";  
  Serial.printf("Set string... %s\n", Firebase.RTDB.setString(&fbdo, "/Parking_lot_1/slot2", status2) ? "ok" : fbdo.errorReason().c_str());
  Serial.println(sensor5);
 delay(500);
  } 
}
