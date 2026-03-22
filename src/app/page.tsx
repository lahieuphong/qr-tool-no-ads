import QrStudioFooter from "@/components/qr-tool/QrStudioFooter";
import QrStudioHeader from "@/components/qr-tool/QrStudioHeader";
import QrStudio from "@/components/qr-tool/QrStudio";
import { APP_SECTION_IDS } from "@/lib/app-config";

export default function Page() {
  return (
    <>
      <div id={APP_SECTION_IDS.top} />
      <QrStudioHeader />
      <div id={APP_SECTION_IDS.qrStudio} className="scroll-mt-24">
        <QrStudio />
      </div>
      <QrStudioFooter />
    </>
  );
}