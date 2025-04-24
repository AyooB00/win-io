'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface PlayerPosition {
  id: string;
  top: number;
  right: number;
  number: number;
  name: string;
}

interface FormationEditorProps {
  initialFormation?: string;
  players?: { id: string; name: string; number: number }[];
  onSave?: (positions: PlayerPosition[]) => void;
  readOnly?: boolean;
  className?: string;
}

const defaultFormations: Record<string, { top: number; right: number }[]> = {
  '4-3-3': [
    { top: 85, right: 50 }, // GK
    { top: 65, right: 20 }, // DEF
    { top: 65, right: 40 }, // DEF
    { top: 65, right: 60 }, // DEF
    { top: 65, right: 80 }, // DEF
    { top: 45, right: 30 }, // MID
    { top: 45, right: 50 }, // MID
    { top: 45, right: 70 }, // MID
    { top: 25, right: 20 }, // FWD
    { top: 25, right: 50 }, // FWD
    { top: 25, right: 80 }, // FWD
  ],
  '4-4-2': [
    { top: 85, right: 50 }, // GK
    { top: 65, right: 20 }, // DEF
    { top: 65, right: 40 }, // DEF
    { top: 65, right: 60 }, // DEF
    { top: 65, right: 80 }, // DEF
    { top: 45, right: 20 }, // MID
    { top: 45, right: 40 }, // MID
    { top: 45, right: 60 }, // MID
    { top: 45, right: 80 }, // MID
    { top: 25, right: 35 }, // FWD
    { top: 25, right: 65 }, // FWD
  ],
  '3-5-2': [
    { top: 85, right: 50 }, // GK
    { top: 65, right: 30 }, // DEF
    { top: 65, right: 50 }, // DEF
    { top: 65, right: 70 }, // DEF
    { top: 45, right: 10 }, // MID
    { top: 45, right: 30 }, // MID
    { top: 45, right: 50 }, // MID
    { top: 45, right: 70 }, // MID
    { top: 45, right: 90 }, // MID
    { top: 25, right: 35 }, // FWD
    { top: 25, right: 65 }, // FWD
  ],
};

export const FormationEditor: React.FC<FormationEditorProps> = ({
  initialFormation = '4-3-3',
  players = [],
  onSave,
  readOnly = false,
  className = '',
}) => {
  const [formation, setFormation] = useState(initialFormation);
  const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>([]);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize positions based on formation
    const basePositions = defaultFormations[formation] || defaultFormations['4-3-3'];
    
    const newPositions = basePositions.map((pos, index) => {
      const player = players[index] || { id: `player-${index}`, name: `لاعب ${index + 1}`, number: index + 1 };
      return {
        id: player.id,
        top: pos.top,
        right: pos.right,
        number: player.number,
        name: player.name,
      };
    });
    
    setPlayerPositions(newPositions);
  }, [formation, players]);

  const handleDragStart = (playerId: string, e: React.MouseEvent) => {
    if (readOnly) return;
    
    const playerElement = document.getElementById(`player-${playerId}`);
    if (!playerElement || !fieldRef.current) return;
    
    const fieldRect = fieldRef.current.getBoundingClientRect();
    const playerRect = playerElement.getBoundingClientRect();
    
    setDraggedPlayer(playerId);
    setDragOffset({
      x: e.clientX - playerRect.left,
      y: e.clientY - playerRect.top
    });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!draggedPlayer || !fieldRef.current || readOnly) return;
    
    const fieldRect = fieldRef.current.getBoundingClientRect();
    
    const newRight = 100 - ((e.clientX - dragOffset.x - fieldRect.left) / fieldRect.width * 100);
    const newTop = ((e.clientY - dragOffset.y - fieldRect.top) / fieldRect.height * 100);
    
    // Clamp values to keep within field
    const clampedRight = Math.max(5, Math.min(95, newRight));
    const clampedTop = Math.max(5, Math.min(95, newTop));
    
    setPlayerPositions(prevPositions => 
      prevPositions.map(pos => 
        pos.id === draggedPlayer 
          ? { ...pos, right: clampedRight, top: clampedTop } 
          : pos
      )
    );
  };

  const handleDragEnd = () => {
    setDraggedPlayer(null);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(playerPositions);
    }
  };

  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormation(e.target.value);
  };

  return (
    <div className={`${className} w-full`}>
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">محرر التشكيل</h3>
          
          {!readOnly && (
            <div className="flex gap-2">
              <select 
                value={formation} 
                onChange={handleFormationChange}
                className="p-2 border rounded"
              >
                <option value="4-3-3">4-3-3</option>
                <option value="4-4-2">4-4-2</option>
                <option value="3-5-2">3-5-2</option>
              </select>
              
              <Button onClick={handleSave}>
                حفظ التشكيل
              </Button>
            </div>
          )}
        </div>
        
        <div 
          ref={fieldRef}
          className="relative w-full h-[500px] bg-green-600 rounded-lg overflow-hidden"
          style={{ backgroundImage: 'url(/images/field.png)', backgroundSize: 'cover' }}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {/* Field markings */}
          <div className="absolute inset-0 flex flex-col">
            <div className="border-2 border-white opacity-50 w-[80%] h-[40%] mx-auto"></div>
          </div>
          
          {/* Players */}
          {playerPositions.map((player) => (
            <div
              id={`player-${player.id}`}
              key={player.id}
              className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 ${
                draggedPlayer === player.id ? 'z-50' : 'z-10'
              } ${readOnly ? 'cursor-default' : 'cursor-move'}`}
              style={{ 
                top: `${player.top}%`, 
                right: `${player.right}%`,
              }}
              onMouseDown={(e) => handleDragStart(player.id, e)}
            >
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-xs shadow-lg">
                <span className="font-bold">{player.number}</span>
                <span className="text-[8px] whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                  {player.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
