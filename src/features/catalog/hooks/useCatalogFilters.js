import { useMemo, useState } from 'react';
import { PRESENTATION_LABELS, PRESENTATION_ORDER } from '../constants';

const TYPE_FILTERS = ['Cajas o Charolas', 'Piezas', 'Promos'];

const resolveType = (product) => {
  if (product.category === 'Promos' || product.variantType === 'promo') return 'Promos';
  if (product.category === 'Piezas' || product.variantType === 'piece') return 'Piezas';
  return 'Cajas o Charolas';
};

const sortByRef = (values, refOrder) => {
  const refMap = new Map(refOrder.map((value, index) => [value, index]));
  return [...values].sort((a, b) => {
    const aRank = refMap.has(a) ? refMap.get(a) : Number.MAX_SAFE_INTEGER;
    const bRank = refMap.has(b) ? refMap.get(b) : Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.localeCompare(b);
  });
};

const useCatalogFilters = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Cajas o Charolas');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPresentation, setSelectedPresentation] = useState('');

  const preparedProducts = useMemo(() => {
    return products.map((product) => ({ ...product, filterType: resolveType(product) }));
  }, [products]);

  const searchedProducts = useMemo(() => {
    return preparedProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.includes(searchTerm);
    });
  }, [preparedProducts, searchTerm]);

  const typeCounts = useMemo(() => {
    const counts = Object.fromEntries(TYPE_FILTERS.map((type) => [type, 0]));
    searchedProducts.forEach((product) => {
      counts[product.filterType] = (counts[product.filterType] || 0) + 1;
    });
    return counts;
  }, [searchedProducts]);

  const scopedByType = useMemo(() => {
    return searchedProducts.filter((product) => product.filterType === selectedType);
  }, [searchedProducts, selectedType]);

  const brands = useMemo(() => {
    return sortByRef([...new Set(scopedByType.map((product) => product.brand).filter(Boolean))], []);
  }, [scopedByType]);

  const brandCounts = useMemo(() => {
    const counts = Object.fromEntries(brands.map((brand) => [brand, 0]));
    scopedByType.forEach((product) => {
      if (product.brand) counts[product.brand] = (counts[product.brand] || 0) + 1;
    });
    return counts;
  }, [brands, scopedByType]);

  const scopedByBrand = useMemo(() => {
    if (!selectedBrand) return scopedByType;
    return scopedByType.filter((product) => product.brand === selectedBrand);
  }, [scopedByType, selectedBrand]);

  const presentations = useMemo(() => {
    const existingKeys = [...new Set(scopedByBrand.map((product) => product.presentation).filter(Boolean))];
    return sortByRef(existingKeys, PRESENTATION_ORDER);
  }, [scopedByBrand]);

  const presentationLabelMap = useMemo(() => {
    const map = {};
    presentations.forEach((key) => {
      map[key] = PRESENTATION_LABELS[key] || key;
    });
    return map;
  }, [presentations]);

  const presentationCounts = useMemo(() => {
    const counts = Object.fromEntries(presentations.map((presentation) => [presentation, 0]));
    scopedByBrand.forEach((product) => {
      if (product.presentation) counts[product.presentation] = (counts[product.presentation] || 0) + 1;
    });
    return counts;
  }, [presentations, scopedByBrand]);

  const filteredProducts = useMemo(() => {
    const finalList = selectedPresentation
      ? scopedByBrand.filter((product) => product.presentation === selectedPresentation)
      : scopedByBrand;

    return [...finalList].sort((a, b) => a.name.localeCompare(b.name));
  }, [scopedByBrand, selectedPresentation]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('Cajas o Charolas');
    setSelectedBrand('');
    setSelectedPresentation('');
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    typeFilters: TYPE_FILTERS,
    typeCounts,
    selectedBrand,
    setSelectedBrand,
    brands,
    brandCounts,
    selectedPresentation,
    setSelectedPresentation,
    presentations,
    presentationLabelMap,
    presentationCounts,
    filteredProducts,
    clearFilters,
  };
};

export default useCatalogFilters;
