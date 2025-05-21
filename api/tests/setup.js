jest.setTimeout(10000);

// Exemplo: mock do console para não poluir o output
global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
