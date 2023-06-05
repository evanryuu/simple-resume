import { useReactToPrint } from 'react-to-print'

const usePrintResume = (contentRef: React.RefObject<any>) => {
  const print = useReactToPrint({
    content: () => (contentRef.current),
    pageStyle: `
    @media print {
      @page {
        size: A4;
        orientation: portrait;
        -webkit-print-color-adjust: exact;
      }
    }
    `,
  })

  return { print }
}

export default usePrintResume
