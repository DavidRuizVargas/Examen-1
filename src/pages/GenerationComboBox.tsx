import React from 'react';

interface Generation {
  name: string;
  offset: number;
  limit: number;
}

interface GenerationComboBoxProps {
  generations: Generation[];
  onSelectGeneration: (offset: number, limit: number) => void;
}

const GenerationComboBox: React.FC<GenerationComboBoxProps> = ({ generations, onSelectGeneration }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex > 0 && selectedIndex <= generations.length) {
      const { offset, limit } = generations[selectedIndex - 1];
      onSelectGeneration(offset, limit);
    }
  };
  

  return (
    <select onChange={handleChange}>
      <option>Seleccione</option>
      {generations.map((generation, index) => (
        <option key={index} value={generation.name}>{generation.name}</option>
      ))}
    </select>
  );
};

export default GenerationComboBox;



