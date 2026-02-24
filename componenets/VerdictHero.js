import { ShieldCheck } from 'lucide-react';

export default function VerdictHero({ verdict, confidence }) {
    const isBuy = verdict === 'BUY';
    const isCaution = verdict === 'CAUTION';

    const colorClass = isBuy ? 'text-emerald-400' : isCaution ? 'text-orange-400' : 'text-red-500';
    const borderClass = isBuy ? 'border-emerald-500/30' : isCaution ? 'border-orange-500/30' : 'border-red-500/30';
    const shadowClass = isBuy ? 'shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]' : 'shadow-[0_0_50px_-12px_rgba(249,115,22,0.1)]';

    return (
        <div className={`relative overflow-hidden rounded-3xl bg-[#0d141c] border ${borderClass} p-12 text-center ${shadowClass}`}>
            <div className={`flex justify-center mb-6 ${colorClass}`}>
                <ShieldCheck size={48} />
            </div>
            <h2 className={`text-4xl font-black mb-6 uppercase tracking-widest ${colorClass}`}>
                {verdict === 'BUY' ? 'SAFE TO BUY' : verdict === 'CAUTION' ? 'PROCEED WITH CAUTION' : 'AVOID PRODUCT'}
            </h2>

            <div className="max-w-md mx-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase font-bold">
                    <span>Confidence</span>
                    <span>{confidence}</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ${isBuy ? 'bg-emerald-500' : 'bg-orange-500'}`}
                        style={{ width: confidence }}
                    />
                </div>
            </div>
        </div>
    );
}