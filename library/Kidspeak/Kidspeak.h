#ifndef Kidspeah_h
#define Kidspeah_h

#if defined(__AVR__)
  #include "Arduino.h"
#endif

#define SPEAKER PD2
#define SPEAKER_PORT PORTD
#define SPEAKER_DDR DDRD
#define SPEAKER_ON() (SPEAKER_PORT |= (1 << SPEAKER))
#define SPEAKER_OFF() (SPEAKER_PORT &= ~(1 << SPEAKER))

#define NOTE(tone, dur) ((((((uint8_t)(dur)) & 0x07)<<5) | (((uint8_t)(tone)) & 0x1F)))
#define GET_TONE(note) ((note) & 0x1F)
#define GET_DURATION(note) (((note)>>5) & 0x07)
#define END_MARKER 0XFF
#define READ_BIT(byte, bit) ((byte & (1 << bit)) >> bit)

enum {
	T_REST,
	T_C,
	T_CS,
	T_D,
	T_EB,
	T_E,
	T_F,
	T_FS,
	T_G,
	T_AB,
	T_A,
	T_BB,
	T_B,
	T_CX,
	T_CSX,
	T_DX,
	T_EBX,
	T_EX,
	T_FX,
	T_FSX,
	T_GX,
	T_ABX,
	T_AX,
	T_BBX,
	T_BX
};

class Kidspeak
{
  public:
    Kidspeak(void);
    void init(void);
    void rgb_set_color(uint8_t redPin, uint8_t greenPin, uint8_t bluePin, uint8_t red, uint8_t green, uint8_t blue);
    void play_tune(uint8_t *currentTune);
    void play_tune_mario(void);
    void play_tune_complete(void);
    void play_tune_ducktales(void);
    void play_tune_felix(void);
    void play_tune_heman(void);
    void play_tune_kirby(void);
    void play_tune_morning(void);
    void play_tune_pony(void);
    void play_tune_reindeer(void);
    void play_tune_simpsons(void);
    void play_tune_smurfs(void);
    void draw_clear(void);
    void draw_update(void);
    void draw_invert(bool mode);
    void draw_text(char *st, int x, int y);
    void draw_text(String st, int x, int y);
    void draw_baby_groot(uint8_t x, uint8_t y);
    void draw_bat(uint8_t x, uint8_t y);
    void draw_boo(uint8_t x, uint8_t y);
    void draw_tretton37(uint8_t x, uint8_t y);
    void draw_ghostbusters(uint8_t x, uint8_t y);
    void draw_jackolantern(uint8_t x, uint8_t y);
    void draw_kidspeak(uint8_t x, uint8_t y);
    void draw_mickey(uint8_t x, uint8_t y);
    void draw_mushroom(uint8_t x, uint8_t y);
    void draw_oogie(uint8_t x, uint8_t y);
    void draw_pokeball(uint8_t x, uint8_t y);
    void draw_triforce(uint8_t x, uint8_t y);
    void draw_yoshi(uint8_t x, uint8_t y);

  protected:
    void _play_byte(uint8_t pByte);
    void _play_tone(int tone, long tempo_value);
};

#endif
