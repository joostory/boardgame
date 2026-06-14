// 초성, 중성, 종성 기본 매핑용 리스트
export const CHO_SUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

export const JUNG_SUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

export const JONG_SUNG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㅈ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 이중 모음 분해 맵 (키보드 2타 입력 기준 분해)
const SPLIT_VOWELS: Record<string, string[]> = {
  'ㅐ': ['ㅏ', 'ㅣ'],
  'ㅔ': ['ㅓ', 'ㅣ'],
  'ㅒ': ['ㅑ', 'ㅣ'],
  'ㅖ': ['ㅕ', 'ㅣ'],
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅏ', 'ㅣ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅓ', 'ㅣ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ']
};

// 초성 쌍자음 분해 맵
const SPLIT_CHO: Record<string, string[]> = {
  'ㄲ': ['ㄱ', 'ㄱ'],
  'ㄸ': ['ㄷ', 'ㄷ'],
  'ㅃ': ['ㅂ', 'ㅂ'],
  'ㅆ': ['ㅅ', 'ㅅ'],
  'ㅉ': ['ㅈ', 'ㅈ']
};

// 종성 겹받침 분해 맵
const SPLIT_JONG: Record<string, string[]> = {
  'ㄲ': ['ㄱ', 'ㄱ'],
  'ㄳ': ['ㄱ', 'ㅅ'],
  'ㄵ': ['ㄴ', 'ㅈ'],
  'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'],
  'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'],
  'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'],
  'ㅄ': ['ㅂ', 'ㅅ'],
  'ㅆ': ['ㅅ', 'ㅅ']
};

/**
 * 한글 문자열을 키보드 입력 타수 기준 단일 자소 배열로 완전히 분해합니다.
 * 예: "바람" -> ['ㅂ', 'ㅏ', 'ㄹ', 'ㅏ', 'ㅁ']
 * 예: "참외" -> ['ㅊ', 'ㅏ', 'ㅁ', 'ㅇ', 'ㅗ', 'ㅣ'] (6자소로 판정되어 5자소 단어 목록에서 제외)
 */
export function disassembleHangul(text: string): string[] {
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    // 한글 음절 범위 (가 ~ 힣)
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const hangulCode = code - 0xAC00;
      const jongIndex = hangulCode % 28;
      const jungIndex = Math.floor(hangulCode / 28) % 21;
      const choIndex = Math.floor(Math.floor(hangulCode / 28) / 21);

      const cho = CHO_SUNG[choIndex];
      const jung = JUNG_SUNG[jungIndex];
      const jong = JONG_SUNG[jongIndex];

      // 초성 분해 추가
      if (SPLIT_CHO[cho]) {
        result.push(...SPLIT_CHO[cho]);
      } else {
        result.push(cho);
      }

      // 중성 분해 추가 (이중 모음 대응)
      if (SPLIT_VOWELS[jung]) {
        result.push(...SPLIT_VOWELS[jung]);
      } else {
        result.push(jung);
      }

      // 종성 분해 추가 (겹받침 대응)
      if (jong) {
        if (SPLIT_JONG[jong]) {
          result.push(...SPLIT_JONG[jong]);
        } else {
          result.push(jong);
        }
      }
    } else {
      // 단독 자모 입력 처리
      if (SPLIT_CHO[char]) {
        result.push(...SPLIT_CHO[char]);
      } else if (SPLIT_VOWELS[char]) {
        result.push(...SPLIT_VOWELS[char]);
      } else if (SPLIT_JONG[char]) {
        result.push(...SPLIT_JONG[char]);
      } else {
        result.push(char);
      }
    }
  }

  return result;
}

/**
 * 자소 배열을 완성형 한글 단어로 조합합니다. (이중 자모 결합 대응)
 */
export function assembleHangul(jasos: string[]): string {
  // 실제 키 입력 렌더링 동기화 목적이므로 자소 리스트를 이어붙여 출력하거나,
  // 쪼개진 모음/자음을 다시 합치는 맵을 거쳐 원래대로 구성합니다.
  const mergeVowels: Record<string, string> = {
    'ㅏㅣ': 'ㅐ',
    'ㅓㅣ': 'ㅔ',
    'ㅑㅣ': 'ㅒ',
    'ㅕㅣ': 'ㅖ',
    'ㅗㅏ': 'ㅘ',
    'ㅗㅏㅣ': 'ㅙ',
    'ㅗㅣ': 'ㅚ',
    'ㅜㅓ': 'ㅝ',
    'ㅜㅓㅣ': 'ㅞ',
    'ㅜㅣ': 'ㅟ',
    'ㅡㅣ': 'ㅢ'
  };

  const mergeCho: Record<string, string> = {
    'ㄱㄱ': 'ㄲ',
    'ㄷㄷ': 'ㄸ',
    'ㅂㅂ': 'ㅃ',
    'ㅅㅅ': 'ㅆ',
    'ㅈㅈ': 'ㅉ'
  };

  const mergeJong: Record<string, string> = {
    'ㄱㄱ': 'ㄲ',
    'ㄱㅅ': 'ㄳ',
    'ㄴㅈ': 'ㅈ',
    'ㄴㅎ': 'ㄶ',
    'ㄹㄱ': 'ㄺ',
    'ㄹㅁ': 'ㄻ',
    'ㄹㅂ': 'ㄼ',
    'ㄹㅅ': 'ㄽ',
    'ㄹㅌ': 'ㄾ',
    'ㄹㅍ': 'ㄿ',
    'ㄹㅎ': 'ㅀ',
    'ㅂㅅ': 'ㅄ',
    'ㅅㅅ': 'ㅆ'
  };

  // 1단계: 인접 자모들 조합 가능한 것 결합
  const combined: string[] = [];
  let idx = 0;
  while (idx < jasos.length) {
    const cur = jasos[idx];
    const next = jasos[idx + 1];
    const next2 = jasos[idx + 2];

    // 삼중 조합 체크 (ㅙ, ㅞ)
    if (next && next2 && mergeVowels[cur + next + next2]) {
      combined.push(mergeVowels[cur + next + next2]);
      idx += 3;
    } else if (next && mergeVowels[cur + next]) {
      combined.push(mergeVowels[cur + next]);
      idx += 2;
    } else if (next && mergeCho[cur + next]) {
      combined.push(mergeCho[cur + next]);
      idx += 2;
    } else {
      combined.push(cur);
      idx += 1;
    }
  }

  // 2단계: 초성 + 중성 + 종성 한글 문자 조합
  let result = '';
  let i = 0;
  while (i < combined.length) {
    const cho = combined[i];
    const choIdx = CHO_SUNG.indexOf(cho);

    if (choIdx !== -1 && i + 1 < combined.length) {
      const jung = combined[i + 1];
      const jungIdx = JUNG_SUNG.indexOf(jung);

      if (jungIdx !== -1) {
        let jongIdx = 0;
        let hasJong = false;

        if (i + 2 < combined.length) {
          const nextJong = combined[i + 2];
          // 다음 결합할 글자가 자음이고, 그 다음 글자가 모음이 아닐 때 종성 결합
          const nextNext = combined[i + 3];
          const isNextNextJung = nextNext ? JUNG_SUNG.indexOf(nextNext) !== -1 : false;

          if (JONG_SUNG.indexOf(nextJong) !== -1 && !isNextNextJung) {
            jongIdx = JONG_SUNG.indexOf(nextJong);
            hasJong = true;
          }
        }

        const charCode = 0xAC00 + (choIdx * 21 * 28) + (jungIdx * 28) + jongIdx;
        result += String.fromCharCode(charCode);
        i += hasJong ? 3 : 2;
      } else {
        result += cho;
        i += 1;
      }
    } else {
      result += cho;
      i += 1;
    }
  }

  return result;
}

// 이중 모음, 쌍자음, 겹받침이 전혀 들어가지 않는 완벽한 단일 타건 5자소 한글 단어 목록
export const WORDS_5_JASO = [
  '바람', '구름', '사랑', '하늘', '가을', '마음', '아침', '노을', '마을', '소망', 
  '겨울', '여름', '시골', '거울', '보석', '소금', '수박', '미술', '사진', '그림', 
  '우산', '이불', '거실', '마당', '지붕', '기둥', '우물', '소설', '시인', '시합', 
  '우정', '비밀', '편지', '문자', '단어', '축구', '농구', '탁구', '인사', '역사', 
  '약수', '감자', '만두', '김치', '녹차', '홍차', '식사', '공부', '단도', '봄비', 
  '길가', '동기', '동요', '동서', '남녀', '남부', '북부', '중부', '동부', '신부', 
  '신사', '숙소', '학교', '학자', '독자', '역자', '필자', '약사', '안마', '악마', 
  '천사', '심사', '감사', '검사', '판사', '역기', '인기', '공기', '온도', '습도', 
  '밀도', '속도', '각도', '강도', '인도', '반도', '별도', '용도', '영토', '국토', 
  '국가', '작가', '상가', '향가', '단가'
];

export function getRandomWord(): { word: string; jasos: string[] } {
  const randomIndex = Math.floor(Math.random() * WORDS_5_JASO.length);
  const word = WORDS_5_JASO[randomIndex];
  return {
    word,
    jasos: disassembleHangul(word)
  };
}
