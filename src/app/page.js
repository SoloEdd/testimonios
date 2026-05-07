// src/app/page.js
"use client"; // Directiva estricta de Next.js para habilitar Hooks

import React, { useState, useEffect, useRef } from 'react';
import testimonios from '../data/data';
import Testimonial from '../components/testimonial';
import Controls from '../components/Controls';
import './globals.css'; 
export default function App() {
  // 1. Estado principal
  const [index, setIndex] = useState(0);
  const length = testimonios.length; 
  const autoplayRef = useRef(null); 

  // 2. Funciones de navegación (Navegación circular)
  const next = () => setIndex(prev => (prev + 1) % length); 
  const prev = () => setIndex(prev => (prev - 1 + length) % length);
  const random = () => {
    let r = Math.floor(Math.random() * length); 
    if (r === index) r = (r + 1) % length; // Evitar que se repita el mismo testimonio
    setIndex(r);
  };

  // 3. Autoplay: cambia automáticamente cada 5 segundos 
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length); 
    }, 5000); 

    // Limpieza del intervalo cuando el componente se desmonta 
    return () => clearInterval(autoplayRef.current);
  }, [length]); 

  // 4. Manejador de acciones del usuario: Pausar autoplay al interactuar 
  const handleUserAction = (actionFn) => {
    clearInterval(autoplayRef.current); // Detiene la rotación automática actual 
    actionFn(); // Ejecuta la acción (prev, next o random)
    
    // Reanuda el autoplay iniciando un nuevo intervalo 
    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length); 
    }, 5000); 
  };

  // 5. Renderizado de la UI
  return (
    <main className="app">
      <h1>Testimonios</h1>
      <div className="card-wrapper">
        <Testimonial item={testimonios[index]} />
      </div>
      <Controls 
        onPrev={() => handleUserAction(prev)} 
        onNext={() => handleUserAction(next)} 
        onRandom={() => handleUserAction(random)} 
      />
      <p className="counter"> {index + 1} / {length} </p>
    </main>
  );
}