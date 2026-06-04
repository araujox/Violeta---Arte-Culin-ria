import React, { useState, useEffect } from 'react';

// Explicit list of files that exist on disk in the /public/cardapio directory
const CARDAPIO_FILES = [
  'Fetuccine Cogumelo.jpeg',
  'VLT - Risoto de Gorgonzola - 02.png',
  'VLT - Risoto Camarão - 05.jpg',
  'VLT - Risoto Camarão - 05-1.jpg',
  'VLT - Risoto Parmesão - 07 (1).jpg',
  'VLT - Risoto Parmesão - 07 (1)-1.jpg',
  'VLT - Tagliatele - 01.png',
  'VLT - Tagliatele - 01-1.png',
  'alfredo.jpeg',
  'brusqueta.jpeg',
  'camarão crocante.jpeg',
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

// Explicit list of files that exist in the /public/cardapio/vinhos directory
const WINE_FILES = [
  'Bons Ventos.png',
  'Cabriz Colheita Branco.png',
  'Cabriz Colheita Tinto.png',
  'Cartuxa Evora.png',
  'Casa Perini Aquarela.png',
  'Casal Garcia Branco Sweet.png',
  'Chac Chac Cabernet Franc.png',
  'Chac Chac Malbec.png',
  'Chac Chac Sauvignon Blanc.png',
  'Chilano Sauvignon Blanc.png',
  'EA Cartuxa Tinto Red.png',
  'Freixenet Moscato.png',
  'Gato Negro Sweet Red.png',
  'Minimalista Pinot Grigio Branco.png',
  'Pata Negra Oro Tempranillo.png',
  'Rapariga da Quinta (Colheita Selecionada).png',
  'Rio Sol Branco Moscatel.png',
  'Trapiche Vineyards Malbec.png',
  'Vinho Barrica Andina Syrah Tinto.png',
  'carbonara.jpeg',
  'Chilano_Branco_Moscato-removebg-preview.png',
  'soldado-removebg-preview.png'
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
  'carbonara de camarao': 'vinhos/carbonara.jpeg', // mapped to brand-new location in wine subfolder
  'carbonara': 'vinhos/carbonara.jpeg', // mapped to brand-new location in wine subfolder
  'fettuccine ao pesto': 'pesto.jpeg',
  'mousseline prime': 'mousseline.jpeg',
  'tagliatelle': 'VLT - Tagliatele - 01.png',
  'tagliate': 'VLT - Tagliatele - 01.png',
  'fettuccine alfredo': 'alfredo.jpeg',
  'salada de file mignon': 'salada file.jpeg',
  'cocada de forno': 'cocada.jpeg',
  'torta basca cremosa': 'torta basca.jpeg',
  'risoto de camarao': 'VLT - Risoto Camarão - 05.jpg',
  'risoto de parmesao': 'VLT - Risoto Parmesão - 07 (1).jpg',
  'risoto de gorgonzola': 'VLT - Risoto de Gorgonzola - 02.png'
};

const SPECIAL_WINE_MAPPINGS: Record<string, string> = {
  'chileno branco moscato': 'Chilano_Branco_Moscato-removebg-preview.png',
  'chilano branco moscato': 'Chilano_Branco_Moscato-removebg-preview.png',
  'chileno sauvignon blanc': 'Chilano Sauvignon Blanc.png',
  'vinho barrica andina syrah tinto': 'Vinho Barrica Andina Syrah Tinto.png',
  'rapariga da quinta colheita selecionada': 'Rapariga da Quinta (Colheita Selecionada).png',
  'soldado tinto': 'soldado-removebg-preview.png',
  'soldado.png': 'soldado-removebg-preview.png',
  'soldado': 'soldado-removebg-preview.png',
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

  // 1. Explicit food mappings
  if (SPECIAL_MAPPINGS[normStripped]) {
    return `/cardapio/${SPECIAL_MAPPINGS[normStripped]}`;
  }
  if (SPECIAL_MAPPINGS[normName]) {
    return `/cardapio/${SPECIAL_MAPPINGS[normName]}`;
  }

  // 2. Explicit wine mappings
  if (SPECIAL_WINE_MAPPINGS[normStripped]) {
    return `/cardapio/vinhos/${SPECIAL_WINE_MAPPINGS[normStripped]}`;
  }
  if (SPECIAL_WINE_MAPPINGS[normName]) {
    return `/cardapio/vinhos/${SPECIAL_WINE_MAPPINGS[normName]}`;
  }

  // 3. Exact/substring wine match check (check wine list first if name might match wine)
  const simpleName = simplify(itemName);
  
  for (const file of WINE_FILES) {
    const fileWithoutExt = file.substring(0, file.lastIndexOf('.'));
    const simpleFile = simplify(fileWithoutExt);
    if (simpleFile === simpleName || simpleName.includes(simpleFile) || simpleFile.includes(simpleName)) {
      return `/cardapio/vinhos/${file}`;
    }
  }

  // 4. Exact match check for food
  for (const file of CARDAPIO_FILES) {
    const fileWithoutExt = file.substring(0, file.lastIndexOf('.'));
    if (simplify(fileWithoutExt) === simpleName) {
      return `/cardapio/${file}`;
    }
  }

  // 5. Substring match check for food
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
    
    // Check if the current fallback is a legacy placeholder from Unsplash
    const isLegacyUnsplash = fallbackSrc && fallbackSrc.includes('unsplash.com');
    
    // If it is NOT a legacy placeholder, prioritize the specified fallbackSrc (which could be a custom upload, web link, or explicitly set local file)
    if (fallbackSrc && !isLegacyUnsplash) {
      candidates.push(fallbackSrc);
    }

    if (matchedPath) {
      candidates.push(matchedPath);
    }

    // Add old version fallback candidates for newly customized user dishes
    const normName = itemName.toLowerCase().trim();
    const normStripped = normName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    if (normStripped === 'risoto de camarao') {
      candidates.push('/cardapio/VLT - Risoto Camarão - 05.jpg');
      candidates.push('/cardapio/VLT - Risoto Camarão - 05-1.jpg');
      candidates.push('/cardapio/risoto de camarão.jpeg');
    } else if (normStripped === 'risoto de parmesao') {
      candidates.push('/cardapio/VLT - Risoto Parmesão - 07 (1).jpg');
      candidates.push('/cardapio/VLT - Risoto Parmesão - 07 (1)-1.jpg');
      candidates.push('/cardapio/risoto parmesão.jpeg');
    } else if (normStripped === 'tagliatelle') {
      candidates.push('/cardapio/VLT - Tagliatele - 01.png');
      candidates.push('/cardapio/VLT - Tagliatele - 01-1.png');
      candidates.push('/cardapio/tagliate.jpeg');
    } else if (normStripped === 'risoto de gorgonzola') {
      candidates.push('/cardapio/VLT - Risoto de Gorgonzola - 02.png');
      candidates.push('/cardapio/risoto gorgonzola.jpeg');
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

    // Standard fallback image at the end
    if (fallbackSrc) {
      candidates.push(fallbackSrc);
    }

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
      loading="lazy"
      {...props}
    />
  );
}
