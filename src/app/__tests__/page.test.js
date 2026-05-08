import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../page';
// Importamos los datos reales 
import testimonios from '../../data/data'; 

describe('Componente Principal App (page.js)', () => {
  beforeEach(() => {
    // Usamos temporizadores falsos para controlar el setInterval del Autoplay
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Limpiamos los temporizadores y restauramos el comportamiento normal
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renderiza el primer testimonio al cargar la aplicación', () => {
    render(<App />);
    
    // Verificamos que el nombre del primer testimonio esté en pantalla
    const primerTestimonio = testimonios[0];
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(primerTestimonio.nombre);
    expect(screen.getByText(primerTestimonio.cargo)).toBeInTheDocument();
  });

  test('navega al siguiente testimonio al hacer clic en "Siguiente"', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<App />);
    
    const botonSiguiente = screen.getByRole('button', { name: /siguiente/i });
    
    await act(async () => {
      await user.click(botonSiguiente);
    });
    
    // Verificamos que ahora se muestre el segundo testimonio
    const segundoTestimonio = testimonios[1];
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(segundoTestimonio.nombre);
  });

  test('respeta la navegación circular (retroceder en el primer testimonio va al último)', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<App />);
    
    const botonAnterior = screen.getByRole('button', { name: /anterior/i });
    
    await act(async () => {
      await user.click(botonAnterior);
    });
    
    // Como retrocedimos desde el índice 0, debe mostrar el último elemento
    const ultimoTestimonio = testimonios[testimonios.length - 1];
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(ultimoTestimonio.nombre);
  });

  test('el autoplay cambia de testimonio automáticamente después de 5 segundos', () => {
    render(<App />);
    
    // Al inicio está el primer testimonio
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(testimonios[0].nombre);
    
    // Avanzamos el tiempo de Jest por 5 segundos exactos (5000 milisegundos)
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // El efecto debe haberse ejecutado y ahora muestra el segundo testimonio
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(testimonios[1].nombre);
  });
});