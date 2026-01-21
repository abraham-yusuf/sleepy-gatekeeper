"use client";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
}

interface StartMenuProps {
  items: MenuItem[];
  show: boolean;
  sidebarText?: string;
}

export function StartMenu({
  items,
  show,
  sidebarText = "$402",
}: StartMenuProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1 z-[1001] w-64 bg-retro-gray win95-shadow flex">
      {/* Sidebar */}
      <div className="start-menu-sidebar w-8 flex items-center justify-end pb-3">
        <span className="text-white font-black text-xl font-mono tracking-widest">
          {sidebarText}
        </span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-0.5 glass-panel bg-retro-gray/90">
        <div className="flex flex-col gap-0.5">
          {items.map((item, index) => (
            <div key={index}>
              {item.label === "separator" ? (
                <div className="h-[1px] bg-white border-b border-[#808080] my-1 mx-1"></div>
              ) : (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="flex items-center gap-3 px-3 py-2 text-black text-sm font-semibold menu-item-hover transition-all cursor-pointer group"
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.hasSubmenu && (
                    <span className="material-symbols-outlined text-[16px]">
                      chevron_right
                    </span>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
