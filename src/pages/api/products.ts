// pages/api/products.js

import { NextApiRequest, NextApiResponse } from "next";

let products = [
  { id: 1, name: 'Produto 1', description: 'Descrição do produto 1' },
  { id: 2, name: 'Produto 2', description: 'Descrição do produto 2' },
  { id: 3, name: 'Produto 3', description: 'Descrição do produto 3' },
];

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }
    
    const newProduct = {
      id: products.length + 1,
      name,
      description,
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}
