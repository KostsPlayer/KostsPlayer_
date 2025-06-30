import { useEffect, useRef } from "react";
import paper from "paper";

export function useCursorInk(canvasSize) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasSize.width === 0 || canvasSize.height === 0) return;

    paper.setup(canvas);
    paper.view.viewSize = new paper.Size(canvas.width, canvas.height);

    const path = new paper.Path();
    path.strokeColor = "white";
    path.strokeWidth = 1.5;
    path.strokeCap = "round";

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const point = new paper.Point(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
      const segment = path.add(point);

      setTimeout(() => {
        const index = path.segments.indexOf(segment);
        if (index !== -1) {
          path.removeSegment(index);
        }
      }, 1000);

      if (path.segments.length > 60) {
        path.removeSegment(0);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      path.remove(); // bersihkan path agar tidak leak
    };
  }, [canvasSize]); // hanya rerun saat size valid berubah

  return canvasRef;
}
