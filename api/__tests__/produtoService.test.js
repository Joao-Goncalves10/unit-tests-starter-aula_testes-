const ProdutoService = require('../ProdutoService'); // Ajuste o caminho se necessário

describe('ProdutoService - Teste Unitário', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    service = new ProdutoService(mockRepository);
  });

  describe('listar', () => {
    test('chama repository.findAll e retorna os produtos', async () => {
      const produtos = [{ id: 1, nome: 'Coxinha', preco: 5.0 }];
      mockRepository.findAll.mockResolvedValue(produtos);

      const result = await service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(produtos);
    });
  });

  describe('criar', () => {
    test('Deve repassar dados para mockRepository.create e retornar o produto criado', () => {
      const dadosEntrada = { nome: 'Teclado', preco: 150 };
      const produtoEsperado = { id: 1, ...dadosEntrada };

      mockRepository.create.mockReturnValue(produtoEsperado);

      const resultado = service.criar(dadosEntrada);

      expect(mockRepository.create).toHaveBeenCalledWith(dadosEntrada);
      expect(resultado).toEqual(produtoEsperado);
    });

    test('Deve propagar o erro lancado pelo repository quando os dados forem invalidos', () => {
      const dadosInvalidos = { nome: '' };
      mockRepository.create.mockImplementation(() => {
        throw new Error('Dados inválidos');
      });

      expect(() => service.criar(dadosInvalidos)).toThrow('Dados inválidos');
    });
  });

  describe('remover', () => {
    test('Deve chamar mockRepository.delete com o id correto quando o produto existe', () => {
      const idExistente = 1;
      mockRepository.delete.mockReturnValue(true);

      expect(() => service.remover(idExistente)).not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith(idExistente);
    });

    test('Deve lancar erro "Produto nao encontrado" quando o repository retornar false', () => {
      const idInexistente = 999;
      mockRepository.delete.mockReturnValue(false);

      expect(() => service.remover(idInexistente)).toThrow('Produto nao encontrado');
      expect(mockRepository.delete).toHaveBeenCalledWith(idInexistente);
    });
  });
});