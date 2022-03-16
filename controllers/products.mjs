import Products from "../models/products.mjs";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const {nama, harga, isPromo} = req.body;
  const product = await Products.findOne({ nama: req.body.nama });
  if (product) {
    return res.status(400).json({ message: "Produk Sudah Ada" });
  }
  if(!nama || !harga){
    return res.status(400).json({ message: "Semua Field Harus Diisi" });
  }
  const newProduct = new Products({
    nama,
    harga,
    isPromo,
    updatedAt: new Date(),
  });
  try {
    await newProduct.save();
    res.status(201).json({
      message: "Produk Berhasil Ditambahkan",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, isPromo } = req.body;
  try {
    await Products.findByIdAndUpdate(id, {
      nama,
      harga,
      isPromo,
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "Produk Berhasil Di Update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Produk Berhasil Di Hapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
