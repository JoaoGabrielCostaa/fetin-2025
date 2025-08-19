import { Header } from "@/components/layout/header";
import { ChatBot } from "@/components/chatbot";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-32">
        {children}
      </div>

      <ChatBot />
    </div>
  );
}
