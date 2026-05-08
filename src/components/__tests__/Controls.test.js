
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from '../Controls';

describe('Componente Controls', () => {
  // Configuración inicial de mocks para las funciones
  const mockOnPrev = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnRandom = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiamos el historial de llamadas antes de cada prueba
  });

  test('renderiza los tres botones con sus atributos aria-label correctos', () => {
    render(<Controls onPrev={mockOnPrev} onNext={mockOnNext} onRandom={mockOnRandom} />);
    
    // Verificamos que los botones existan accesibles mediante su aria-label
    expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aleatorio/i })).toBeInTheDocument();
  });

  test('ejecuta la función onNext al hacer clic en el botón Siguiente', async () => {
    const user = userEvent.setup();
    render(<Controls onPrev={mockOnPrev} onNext={mockOnNext} onRandom={mockOnRandom} />);
    
    const botonSiguiente = screen.getByRole('button', { name: /siguiente/i });
    await user.click(botonSiguiente);
    
    // Verificamos que la función pasada como prop se haya llamado una vez
    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnPrev).not.toHaveBeenCalled();
    expect(mockOnRandom).not.toHaveBeenCalled();
  });
});