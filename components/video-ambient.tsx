import { useEffect, useRef } from "react";

function TransitionCanvas() {
  // HTMLCanvasElement 타입 지정
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // alpha 상태를 useRef로 관리하고 number 타입 지정
  const alphaRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvas가 null이면 종료
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // context가 없으면 종료

    let animationFrameId: number;

    const renderTransition = () => {
      // 기존 canvas 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 기존 canvas 그리기 (예시 색상)
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 새로운 canvas 내용 (예시 색상과 투명도)
      ctx.globalAlpha = alphaRef.current;
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 투명도 증가
      alphaRef.current += 0.0001;
      if (alphaRef.current < 1) {
        animationFrameId = requestAnimationFrame(renderTransition);
      } else {
        ctx.globalAlpha = 1; // 전환 완료 시 최종 alpha 설정
      }
    };

    renderTransition(); // 애니메이션 시작
    return () => cancelAnimationFrame(animationFrameId); // 정리
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="z-30 aspect-video size-32 scale-125 overflow-clip"
      width={320}
      height={180}
    />
  );
}

export default TransitionCanvas;
