import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const useChartDownload = () => {
  const ref = useRef(null);

  const handleDownload = useCallback(
    async (title) => {
      if (ref.current === null) {
        return;
      }

      const dataUrl = await toPng(ref.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    },
    [ref],
  );

  return {
    ref,
    handleDownload,
  };
};

export default useChartDownload;
