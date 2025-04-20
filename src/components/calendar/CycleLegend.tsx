
export function CycleLegend() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#F9C5D1] mr-1"></div>
        <span className="text-xs">Menstruação</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#B084CC] mr-1"></div>
        <span className="text-xs">Ovulação</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#D8C8F2] mr-1"></div>
        <span className="text-xs">Período Fértil</span>
      </div>
    </div>
  );
}
