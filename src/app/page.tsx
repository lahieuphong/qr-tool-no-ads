import QrStudioFooter from "@/components/qr-tool/QrStudioFooter";
import QrStudioHeader from "@/components/qr-tool/QrStudioHeader";
import QrStudio from "@/components/qr-tool/QrStudio";

export default function Page() {
  return (
    <>
      <div id="top" />
      <QrStudioHeader />
      <div id="qr-studio" className="scroll-mt-24">
        <QrStudio />
      </div>
      <QrStudioFooter />
    </>
  );
}