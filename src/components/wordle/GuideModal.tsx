'use client';

import React from 'react';
import { HelpCircle, Check } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export default function GuideModal({ onClose }: GuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scaleUp">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            게임 방법 안내
          </h2>
        </div>

        <div className="text-sm text-neutral-300 flex flex-col gap-3 leading-relaxed">
          <p>
            <strong>5개의 한글 자소(자음/모음)</strong>로 구성된 비밀 단어를 <strong>5번의 기회</strong> 내에 추리하는 게임입니다.
          </p>
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex flex-col gap-1 text-xs">
            <div>• <strong>바람</strong>: [ㅂ] [ㅏ] [ㄹ] [ㅏ] [ㅁ] (5자소)</div>
            <div>• <strong>구름</strong>: [ㄱ] [ㅜ] [ㄹ] [ㅡ] [ㅁ] (5자소)</div>
            <div>• <strong>하늘</strong>: [ㅎ] [ㅏ] [ㄴ] [ㅡ] [ㄹ] (5자소)</div>
          </div>
          <p>
            실제 키보드로 바로 한글을 타이핑하거나, 화면의 자모 키보드를 눌러 입력할 수 있습니다.
          </p>

          <hr className="border-neutral-800" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">ㅂ</span>
              <span><strong>초록색</strong>: 자소 종류와 자리가 정확히 일치</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white text-xs">ㅏ</span>
              <span><strong>노란색</strong>: 단어에 포함되나 자리가 다름</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-neutral-500 text-xs">ㄹ</span>
              <span><strong>회색</strong>: 단어에 포함되지 않는 자소</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-1.5"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          게임 시작하기
        </button>
      </div>
    </div>
  );
}
