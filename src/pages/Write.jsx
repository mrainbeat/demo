import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Write() {
  const navigate = useNavigate();
  const { EMOTIONS, addDiary } = useContext(AppContext);
  
  const [step, setStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [content, setContent] = useState('');
  const [aiData, setAiData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 실전(OpenAI 연동)을 가정한 딜레이 함수
  const fetchAIResponse = async (emotionLabel) => {
    await new Promise(r => setTimeout(r, 1500)); 
    const mockData = {
      '안도감, 평온함': { q: '오늘 마음이 가장 편안했던 순간의 소리와 풍경을 떠올려보세요.', s: '고요한 잔물결처럼 평화로운 순간이 당신의 마음에 오래 머물기를 원합니다.' },
      '기쁨, 즐거움': { q: '오늘 이 기쁨을 더욱 기억하기 위해 기록해두고 싶은 장면은 무엇인가요?', s: '오늘 느낀 긍정의 에너지가 당신의 내일을 밝게 조명할 것입니다.' },
      '슬픔, 우울함': { q: '지금의 마음을 스스로 따뜻하게 보듬어주기 위해 할 수 있는 작은 일은 무엇일까요?', s: '비 온 뒤 땅이 더욱 굳어지듯, 오늘의 감정 또한 당신을 다정하게 성장시킵니다.' },
      '분노, 짜증': { q: '이 감정 뒤에 숨겨진 나의 솔직한 마음이나 바람은 무엇이었나요?', s: '마음의 폭풍을 알아차린 것만으로도 당신은 이미 유연한 힘을 가졌습니다.' },
      '지침, 피곤함': { q: '오늘 하루 고생한 나에게 선물하고 싶은 가장 편안한 휴식은 무엇인가요?', s: '잠시 쉬어가도 괜찮습니다. 오늘 밤은 오롯이 당신만을 위한 시간입니다.' },
      '설렘, 기대됨': { q: '앞으로 다가올 순간 중에서 어떤 모습이 당신을 가장 설레게 만드나요?', s: '새로운 기대와 희망은 언제나 당신을 더 멋진 곳으로 안내합니다.' }
    };
    return mockData[emotionLabel] || mockData['안도감, 평온함'];
  };

  const handleFinishDiary = async () => {
    if (!selectedEmotion || !content.trim()) return alert('감정과 일기를 모두 작성해주세요.');
    setIsLoading(true);
    
    // 일기 작성을 완료하는 순간 API가 호출됨
    const result = await fetchAIResponse(selectedEmotion.label);
    setAiData(result);
    
    setIsLoading(false);
    setStep(2); // 자연스럽게 답변 단계로 전환
  };

  const handleSaveFinal = () => {
    if (!userAnswer.trim()) return alert('AI의 질문에 대한 답변을 작성해주세요.');
    
    addDiary({
      date: new Date().toISOString().split('T')[0],
      emotion: selectedEmotion,
      content,
      aiQuestion: aiData.q,
      aiSentence: aiData.s,
      userAnswer: userAnswer.trim()
    });
    
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto hide-scrollbar bg-black z-50 relative">
      <header className="flex items-center px-4 pt-12 pb-4 sticky top-0 bg-black/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>
        <h1 className="text-[17px] font-semibold text-white ml-2">새로운 기록</h1>
      </header>

      <div className="px-6 mt-4 space-y-8 pb-32">
        {step === 1 ? (
          <div className="animate-in fade-in duration-300 space-y-8">
            <section>
              <h2 className="text-white text-lg font-bold mb-4">지금 어떤 감정인가요?</h2>
              <div className="grid grid-cols-2 gap-3">
                {EMOTIONS.map(emo => (
                  <button
                    key={emo.id}
                    onClick={() => setSelectedEmotion(emo)}
                    className={`p-4 rounded-[20px] flex flex-col items-start gap-2 transition-all border ${
                      selectedEmotion?.id === emo.id 
                        ? 'bg-[#1C1C1E] border-white/40' 
                        : 'bg-[#121212] border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="text-2xl">{emo.emoji}</span>
                    <span className="text-white font-medium text-sm">{emo.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-white text-lg font-bold mb-4">하루를 기록해주세요</h2>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘 하루 어떤 일이 있었나요? 감정과 함께 솔직하게 적어보세요."
                className="w-full bg-[#1C1C1E] text-white px-5 py-5 rounded-[24px] outline-none focus:ring-1 focus:ring-white/30 placeholder-[#555555] min-h-[200px] resize-none leading-relaxed"
              />
            </section>

            <button
              onClick={handleFinishDiary}
              disabled={isLoading || !selectedEmotion || !content.trim()}
              className="w-full bg-brandBlue disabled:bg-[#1C1C1E] disabled:text-[#555555] text-white font-bold text-lg py-5 rounded-[24px] active:scale-95 transition flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(10,132,255,0.3)] disabled:shadow-none"
            >
              {isLoading ? (
                <span className="animate-pulse flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> AI가 성찰 질문을 생성하고 있어요...
                </span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  일기 작성 완료
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
            {/* AI Question Section */}
            <div className="bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] p-6 rounded-[24px] border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                <h4 className="text-[14px] font-bold text-[#A78BFA]">AI의 성찰 질문</h4>
              </div>
              <p className="text-white font-medium text-[18px] leading-relaxed">
                {aiData?.q}
              </p>
            </div>

            {/* User Answer Section */}
            <section className="space-y-4">
              <h2 className="text-white text-lg font-bold">질문에 답변을 남겨보세요</h2>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="내 생각은 어땠는지 깊이 있게 적어보세요..."
                className="w-full bg-[#1C1C1E] text-white px-5 py-5 rounded-[24px] outline-none focus:ring-1 focus:ring-[#A78BFA]/50 placeholder-[#555555] min-h-[150px] resize-none leading-relaxed"
              />
            </section>

            <button
              onClick={handleSaveFinal}
              disabled={!userAnswer.trim()}
              className="w-full bg-[#A78BFA] disabled:bg-[#1C1C1E] disabled:text-[#555555] text-white font-bold text-lg py-5 rounded-[24px] active:scale-95 transition flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(167,139,250,0.3)] disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
              최종 기록 저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
