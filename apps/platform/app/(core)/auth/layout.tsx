import Image from "next/image";

import donAiAuthBackground from "@/public/backgrounds/don-ai-luminosity-background.jpg";
import donAiLogoBranco from "@/public/images/don-ai-logo-white.png";
import donAiDonatello from "@/public/images/don-ai-donatello.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="grid grid-cols-2 h-screen">
        <div className="relative">
          <Image
            src={donAiAuthBackground}
            className="absolute inset-0 h-full w-full object-cover opacity-85"
            alt="DonAI Background"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,theme(colors.donai-primary.800),theme(colors.donai-primary.500))] mix-blend-color"></div>
        </div>

        <div className="bg-white" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Image
            src={donAiLogoBranco}
            className="absolute -left-[550px] top-1/2 -translate-y-1/2"
            alt="DonAI Logo Branco"
          />
          {children}
        </div>
      </div>

      <Image
        src={donAiDonatello}
        className="absolute hidden xl:block bottom-0 right-28"
        width={600}
        alt="DonAI Donatello"
      />
    </div>
  );
}
