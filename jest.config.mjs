// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provee la ruta al directorio de Next.js para cargar la configuración de next.config.js y .env
  dir: './',
})

// Configuración personalizada de Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

export default createJestConfig(config)