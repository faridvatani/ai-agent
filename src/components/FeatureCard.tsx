import { FC } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="text-center">
    <div className="flex items-center justify-center size-16 mx-auto mb-4 rounded-full bg-slate-100 text-black p-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
    <p className="text-sm text-slate-400 mt-1">{description}</p>
  </div>
);

export default FeatureCard;
