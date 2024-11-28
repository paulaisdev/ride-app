// Adiciona matchers customizados do Testing Library ao Jest
import "@testing-library/jest-dom";


// Mock para window.matchMedia (caso necessário)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Usado para browsers antigos
    removeListener: jest.fn(), // Usado para browsers antigos
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
  