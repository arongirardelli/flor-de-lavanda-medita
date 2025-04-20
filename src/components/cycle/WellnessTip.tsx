interface WellnessTipProps {
  currentPhase: string;
}
export function WellnessTip({
  currentPhase
}: WellnessTipProps) {
  return <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lavanda-800 font-medium mb-1">Dica de bem-estar</h3>
      <p className="text-sm text-lavanda-600 mb-4">
        {currentPhase === "Menstrual" && "Durante a fase menstrual, seu corpo precisa de descanso. Pratique atividades leves e cuide da sua alimentação."}
        {currentPhase === "Folicular" && "Na fase folicular, você tende a ter mais energia. Aproveite para praticar exercícios mais intensos."}
        {currentPhase === "Ovulatória" && "Na fase ovulatória, seu corpo está no auge da energia. Ótimo momento para atividades sociais e físicas."}
        {currentPhase === "Lútea" && "Durante a fase lútea, seu corpo precisa de mais descanso e autocuidado. Pratique respiração profunda e evite alimentos inflamatórios."}
        {currentPhase === "Desconhecido" && "Registre seu ciclo regularmente para receber dicas personalizadas para cada fase."}
      </p>
      
    </div>;
}