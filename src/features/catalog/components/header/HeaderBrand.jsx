const HeaderBrand = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
        <span className="text-xl font-black">H</span>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">HNKGen</h1>
        <span className="text-xs text-green-600 font-medium tracking-wider uppercase">Generador de Pedidos</span>
      </div>
    </div>
  );
};

export default HeaderBrand;
