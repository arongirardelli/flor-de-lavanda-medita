
export function CycleLegend() {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-rosa-300 mr-1"></div>
        <span className="text-xs">Menstruação</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-lavanda-400 mr-1"></div>
        <span className="text-xs">Ovulação</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-lavanda-200 mr-1"></div>
        <span className="text-xs">Fértil</span>
      </div>
    </div>
  );
}
