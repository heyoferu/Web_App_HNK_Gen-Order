const toBrandFolder = (brand) => {
  if (!brand) return '';

  const folderMap = {
    'Heineken 0.0': 'heineken',
    'Miller High Life': 'miller',
    'Sol Mezclas': 'sol',
    'Tecate 0.0': 'tecate',
    'Tecate Light': 'tecate',
    'Tecate Titanium': 'tecate',
    'XX Lager': 'xx',
    'Dos Equis': 'xx',
    XX: 'xx',
  };

  if (folderMap[brand]) return folderMap[brand];

  return brand
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getImagePath = (sku, brand) => {
  const folder = toBrandFolder(brand);

  if (folder) {
    return `/assets/products/${folder}/${sku}.png`;
  }

  return `/assets/products/${sku}.png`;
};
