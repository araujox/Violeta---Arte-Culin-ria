import React, { useState, useEffect } from 'react';

// Explicit list of files that exist on disk in the /public/cardapio directory
const CARDAPIO_FILES = [
  'Fetuccine Cogumelo.jpeg',
  'alfredo.jpeg',
  'brusqueta.jpeg',
  'camarão crocante.jpeg',
  'carbonara.jpeg',
  'cocada.jpeg',
  'cracker de ceviche.jpeg',
  'mousseline.jpeg',
  'parmegiana.jpeg',
  'pesto.jpeg',
  'polvo ao arroz negro.jpeg',
  'queijadinha.jpeg',
  'risoto alcafrão.jpeg',
  'risoto de camarão.jpeg',
  'risoto de limão siciliano.jpeg',
  'risoto gorgonzola.jpeg',
  'risoto parmesão.jpeg',
  'salada file.jpeg',
  'sonho salgado.jpeg',
  'tagliate.jpeg',
  'torta basca.jpeg',
  'vinagrete de polvo.jpeg'
];

// Special overrides map for spelling differences and specific recipes
const SPECIAL_MAPPINGS: Record<string, string> = {
  'fettuccine de cogumelo': 'Fetuccine Cogumelo.jpeg',
  'risoto de acafrao': 'risoto alcafrão.jpeg',
  'risoto limao siciliano': 'risoto de limão siciliano.jpeg',
  'risoto de arroz negro': 'polvo ao arroz negro.jpeg',
  'cracker com ceviche': 'cracker de ceviche.jpeg',
  'brusquetta': 'brusqueta.jpeg',
  'brusquetta tradicional': 'brusqueta.jpeg',
  'carbonara de camarao': 'carbonara.jpeg',
  'fettuccine ao pesto': 'pesto.jpeg',
  'mousseline prime': 'mousseline.jpeg',
  'tagliatelle': 'tagliate.jpeg',
  'fettuccine alfredo': 'alfredo.jpeg',
  'salada de file mignon': 'salada file.jpeg',
  'cocada de forno': 'cocada.jpeg',
  'torta basca cremosa': 'torta basca.jpeg',
};

// Strips accents, stop-words, non-alphas to allow comparison with file names
const simplify = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(de|com|ao|do|da|o|a|e|para|em|no|na)\b/g, '')
    .replace(/[^a-z0-9]/g, '');
};

// Gets the mapped local path from disk
export function getLocalImagePath(itemName: string): string | null {
  const normName = itemName.toLowerCase().trim();
  const normStripped = normName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Explicit mapping override check
  if (SPECIAL_MAPPINGS[normStripped]) {
    return `/cardapio/${SPECIAL_MAPPINGS[normStripped]}`;
  }
  if (SPECIAL_MAPPINGS[normName]) {
    return `/cardapio/${SPECIAL_MAPPINGS[normName]}`;
  }

  // 2. Exact match check
  const simpleName = simplify(itemName);
  for (const file of CARDAPIO_FILES) {
    const fileWithoutExt = file.substring(0, file.lastIndexOf('.'));
    if (simplify(fileWithoutExt) === simpleName) {
      return `/cardapio/${file}`;
    }
  }

  // 3. Substring match check
  for (const file of CARDAPIO_FILES) {
    const fileWithoutExt = file.substring(0, file.lastIndexOf('.'));
    const simpleFile = simplify(fileWithoutExt);
    if (simpleName.includes(simpleFile) || simpleFile.includes(simpleName)) {
      return `/cardapio/${file}`;
    }
  }

  return null;
}

interface ImageWithFallbackProps {
  itemName: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function ImageWithFallback({ itemName, fallbackSrc, className, ...props }: ImageWithFallbackProps) {
  const [sources, setSources] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const matchedPath = getLocalImagePath(itemName);

    const candidates: string[] = [];
    if (matchedPath) {
      candidates.push(matchedPath);
    }

    // Standard slug lookups
    const cleanName = itemName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-_]/g, '')
      .trim();

    const hyphenated = cleanName.replace(/\s+/g, '-');
    const snakeCase = cleanName.replace(/\s+/g, '_');

    candidates.push(`/cardapio/${hyphenated}.jpeg`);
    candidates.push(`/cardapio/${snakeCase}.jpeg`);
    candidates.push(`/cardapio/${cleanName}.jpeg`);
    candidates.push(`/cardapio/${itemName}.jpeg`);

    // Standard fallback image
    candidates.push(fallbackSrc);

    // Filter duplicates
    const uniqueCandidates = Array.from(new Set(candidates)).filter(Boolean);

    setSources(uniqueCandidates);
    setCurrentIndex(0);
  }, [itemName, fallbackSrc]);

  const handleError = () => {
    if (currentIndex < sources.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentSrc = sources[currentIndex] || fallbackSrc;

  return (
    <img
      src={currentSrc}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
