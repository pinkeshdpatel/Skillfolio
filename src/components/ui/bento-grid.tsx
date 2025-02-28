import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  href?: string;
  onClick?: () => void;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => {
        const Component = item.href ? Link : 'div';
        
        return (
          <Component
            key={index}
            to={item.href || ''}
            onClick={item.onClick}
            className={cn(
              "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
              "border border-white/10 bg-black",
              "hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
              "hover:-translate-y-0.5 will-change-transform",
              item.colSpan || "col-span-1",
              item.colSpan === 2 ? "md:col-span-2" : "",
              {
                "shadow-[0_2px_12px_rgba(255,255,255,0.03)] -translate-y-0.5":
                  item.hasPersistentHover,
              }
            )}
          >
            <div
              className={`absolute inset-0 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="relative flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                  {item.icon}
                </div>
                {item.status && (
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                      "bg-white/10 text-gray-300",
                      "transition-colors duration-300 group-hover:bg-white/20"
                    )}
                  >
                    {item.status}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-100 tracking-tight text-xl">
                  {item.title}
                  {item.meta && (
                    <span className="ml-2 text-xs text-gray-400 font-normal">
                      {item.meta}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-300 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.cta || "View Templates →"}
                </span>
              </div>
            </div>

            <div
              className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            />
          </Component>
        );
      })}
    </div>
  );
}

export { BentoGrid };