// pages/index.js
import { routes } from '@/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, FormEvent } from 'react';

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter()
  
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  
  const handleHome = async () => {
    router.push(routes.home)
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Preencha todos os campos');
      return;
    }


    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      
      const newProduct = await res.json();
      
      if (res.ok) {
        setProducts([...products, newProduct]);
        setName('');
        setDescription('');
      } else {
        console.error('Erro ao adicionar produto:', newProduct.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Produtos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>

      <ul>
        {products.length === 0 ? (
          <p>Carregando produtos...</p>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </li>
          ))
        )}
      </ul>
      <button onClick={handleHome}>Voltar para Home</button>
    </div>
  );
}
