#include "avr/eeprom.h"
#include "Kidspeak.h"
#include "audio/tunes.h"
#include "oled/images.h"
#include <OLED_I2C.h>

#if defined(__AVR__)
  #include <avr/pgmspace.h>
#endif

#define vel 20000l;

OLED myOLED(SDA, SCL, 8);
extern uint8_t SmallFont[];

Kidspeak::Kidspeak(void)
{
}

void Kidspeak::init(void)
{
  myOLED.begin();
  myOLED.setFont(SmallFont);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
}

void Kidspeak::rgb_set_color(uint8_t redPin, uint8_t greenPin, uint8_t bluePin, uint8_t red, uint8_t green, uint8_t blue)
{
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);
}

void Kidspeak::play_tune(uint8_t *currentTune)
{
  while (*currentTune != END_MARKER)
  {
    _play_byte(*currentTune++);
  }
}

void Kidspeak::play_tune_mario(void)
{
  play_tune(tune_mario);
}

void Kidspeak::play_tune_complete(void)
{
  play_tune(complete);
}

void Kidspeak::play_tune_ducktales(void)
{
  play_tune(tune_ducktales);
}

void Kidspeak::play_tune_felix(void)
{
  play_tune(tune_felix);
}

void Kidspeak::play_tune_heman(void)
{
  play_tune(tune_heman);
}

void Kidspeak::play_tune_kirby(void)
{
  play_tune(tune_kirby);
}

void Kidspeak::play_tune_morning(void)
{
  play_tune(tune_morning);
}

void Kidspeak::play_tune_pony(void)
{
  play_tune(tune_pony);
}

void Kidspeak::play_tune_reindeer(void)
{
  play_tune(tune_reindeer);
}

void Kidspeak::play_tune_simpsons(void)
{
  play_tune(tune_simpsons);
}

void Kidspeak::play_tune_smurfs(void)
{
  play_tune(tune_smurfs);
}

void Kidspeak::draw_clear(void)
{
  myOLED.clrScr();
}

void Kidspeak::draw_update(void)
{
  myOLED.update();
}

void Kidspeak::draw_invert(bool mode)
{
  myOLED.invert(mode);
}

void Kidspeak::draw_text(char *st, int x, int y)
{
  myOLED.print(st, x, y);
}

void Kidspeak::draw_text(String st, int x, int y)
{
  myOLED.print(st, x, y);
}

void Kidspeak::draw_number(long num, int x, int y, int length, char filler)
{
  myOLED.printNumI(num, x, y, length, filler);
}

void Kidspeak::draw_baby_groot(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Baby_Groot_Black, 35, 64);
}

void Kidspeak::draw_bat(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Bat, 109, 64);
}

void Kidspeak::draw_boo(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)boo, 70, 64);
}

void Kidspeak::draw_tretton37(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)tretton37, 64, 64);
}

void Kidspeak::draw_ghostbusters(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Ghostbusters, 75, 64);
}

void Kidspeak::draw_jackolantern(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)JackoLantern, 74, 64);
}

void Kidspeak::draw_kidspeak(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)kidspeak, 128, 52);
}

void Kidspeak::draw_mickey(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Mickey_and_Minnie_Kissing, 98, 64);
}

void Kidspeak::draw_mushroom(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)mushroom, 64, 64);
}

void Kidspeak::draw_oogie(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Oogie_Boogie, 64, 64);
}

void Kidspeak::draw_pokeball(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)Pokeball, 63, 64);
}

void Kidspeak::draw_triforce(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)triforce, 101, 64);
}

void Kidspeak::draw_yoshi(uint8_t x, uint8_t y)
{
  myOLED.drawBitmap(x, y, (uint8_t*)yoshi, 117, 64);
}

void Kidspeak::_play_byte(uint8_t pByte)
{
	int tone = 0;
	int duration = 0;
	switch (GET_TONE(pByte)) {
		case T_C:
		tone = 1911;
		break;
		case T_CS:
		tone = 1804;
		break;
		case T_D:
		tone = 1703;
		break;
		case T_EB:
		tone = 1607;
		break;
		case T_E:
		tone = 1517;
		break;
		case T_F:
		tone = 1432;
		break;
		case T_FS:
		tone = 1352;
		break;
		case T_G:
		tone = 1276;
		break;
		case T_AB:
		tone = 1204;
		break;
		case T_A:
		tone = 1136;
		break;
		case T_BB:
		tone = 1073;
		break;
		case T_B:
		tone = 1012;
		break;
		case T_CX:
		tone = 955;
		break;
		case T_CSX:
		tone = 902;
		break;
		case T_DX:
		tone = 851;
		break;
		case T_EBX:
		tone = 803;
		break;
		case T_EX:
		tone = 758;
		break;
		case T_FX:
		tone = 716;
		break;
		case T_FSX:
		tone = 676;
		break;
		case T_GX:
		tone = 638;
		break;
		case T_ABX:
		tone = 602;
		break;
		case T_AX:
		tone = 568;
		break;
		case T_BBX:
		tone = 536;
		break;
		case T_BX:
		tone = 506;
		break;
		case T_REST:
		tone = 0;
		break;
	}
	switch (GET_DURATION(pByte)) {
		case 0:
		duration = 2;
		break;
		case 1:
		duration = 4;
		break;
		case 2:
		duration = 6;
		break;
		case 3:
		duration = 8;
		break;
		case 4:
		duration = 12;
		break;
		case 5:
		duration = 16;
		break;
		case 6:
		duration = 18;
		break;
		case 7:
		duration = 24;
		break;
	}
	long tvalue = duration * vel;
	if (tone == 0)
	{
		delayMicroseconds(tvalue);
	}
	else
	{
		_play_tone(tone, tvalue);
	}
}

void Kidspeak::_play_tone(int tone, long tempo_value)
{
	long tempo_position = 0;
	while (tempo_position < tempo_value && tempo_value < 640000) // enters an infinite loop when tempo_value is a big value
	{
		SPEAKER_ON();
		delayMicroseconds(tone / 2);

		SPEAKER_OFF();
		delayMicroseconds(tone / 2);

		tempo_position += tone;
	}
}
