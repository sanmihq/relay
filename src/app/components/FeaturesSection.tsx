import { MonitorSmartphone, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Sync",
      description:
        "Instantly share text, links, and code snippets across all your devices without missing a beat.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description:
        "Create private rooms with optional password protection. Your data is yours alone.",
    },
    {
      icon: MonitorSmartphone,
      title: "Cross-Device Access",
      description:
        "Access your shared clipboard from your phone, tablet, or computer. All you need is a browser.",
    },
  ];

  return (
    <section>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
        {features.map((feature, id) => {
          const Icon = feature.icon;
          return (
            <div
              key={id}
              className="flex flex-1 flex-col items-start gap-2 rounded border border-gray-800 bg-[#090f20] p-6 text-start"
            >
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-[#151737]">
                <Icon size={24} strokeWidth={1.7} color="#6e4adb" />
              </div>
              <h3 className="text-md font-semibold">{feature.title}</h3>
              <p className="text-sm text-black/70 dark:text-white/70">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
