#include <OLED_I2C.h>
#include "libs/led/CyberLane-RGB.h"
#include "libs/audio/CyberLane-Audio.h"
#include "libs/audio/tune_kirby.h"

int i;

int  j;

OLED myOLED(SDA, SCL, 8);
extern uint8_t SmallFont[];
void LED_OFF() {
  analogWrite(5, 0);
  analogWrite(3, 0);
  analogWrite(6, 0);
  analogWrite(10, 0);
  analogWrite(11, 0);
  analogWrite(9, 0);
}

extern uint8_t kidspeak[];
void setup()
{
  myOLED.begin();
  myOLED.setFont(SmallFont);
  pinMode(12, INPUT);
  pinMode(4, INPUT);
  pinMode(A0, INPUT);
  pinMode(2, OUTPUT);

}


void loop()
{
  myOLED.clrScr();
  myOLED.print("S1: ", LEFT, 44);
  if (digitalRead(12) == HIGH) {
    myOLED.print("ON", 24, 54);

  } else {
    myOLED.print("OFF", 24, 54);

  }
  myOLED.print("S2:", LEFT, 54);
  if (digitalRead(4) == HIGH) {
    myOLED.print("ON", 24, 44);

  } else {
    myOLED.print("OFF", 24, 44);

  }
  myOLED.print("S3:", 90, 44);
  if (analogRead(A7) > 600) {
    myOLED.print("ON", RIGHT, 44);

  } else {
    myOLED.print("OFF", RIGHT, 44);

  }
  myOLED.print("S4:", 90, 54);
  if (digitalRead(A0) == HIGH) {
    myOLED.print("ON", RIGHT, 54);

  } else {
    myOLED.print("OFF", RIGHT, 54);

  }
  myOLED.print("LDR: ", 28, 2);
  myOLED.printNumI(analogRead(A6), CENTER, 2);
  myOLED.update();

  if (digitalRead(4) && digitalRead(12)) {
    LED_OFF();
    myOLED.clrScr();
    myOLED.print("RED", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,255,0,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Green", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,0,255,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Blue", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,51,51,255);delay(1000);
    myOLED.clrScr();
    myOLED.print("Yellow", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,255,255,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Purple", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,204,51,204);delay(1000);
    myOLED.clrScr();
    myOLED.print("Aqua", CENTER, 28);
    myOLED.update();
    rgb_set_color(5,3,6,102,255,255);delay(1000);

  }

  if (analogRead(A7) > 600 && digitalRead(A0)) {
    LED_OFF();
    myOLED.clrScr();
    myOLED.print("RED", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,255,0,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Green", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,0,255,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Blue", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,51,51,255);delay(1000);
    myOLED.clrScr();
    myOLED.print("Yellow", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,255,255,0);delay(1000);
    myOLED.clrScr();
    myOLED.print("Purple", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,204,51,204);delay(1000);
    myOLED.clrScr();
    myOLED.print("Aqua", CENTER, 28);
    myOLED.update();
    rgb_set_color(10,11,9,102,255,255);delay(1000);

  }

  if (digitalRead(4) && analogRead(A7) > 600) {
    myOLED.clrScr();
    myOLED.drawBitmap(0, 0, kidspeak, 128, 52);
    myOLED.update();
    for (j = 1; j <= 5; j++) {
      myOLED.invert(true);
      delay(1000);
      myOLED.invert(false);
      delay(1000);
      myOLED.update();
    }

  }

  if (digitalRead(12) && digitalRead(A0)) {
    myOLED.clrScr();
    myOLED.print("Playing Kirby", CENTER, 28);
    myOLED.update();
    play_tune(tune_kirby);

  }

}
