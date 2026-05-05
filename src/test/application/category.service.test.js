import CategoryService from '../../application/use-cases/category.service.js';
import { jest } from '@jest/globals';

const mockCategoryRepository = {
    save: jest.fn(),
    findByUserId: jest.fn()
};

describe('CategoryService - Pruebas Unitarias', () => {
    let categoryService;

    beforeEach(() => {
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('Crear: debería crear y guardar una categoría correctamente', async () => {
        const data = {
            name: 'Ideas',
            userId: 'user_123'
        };

        mockCategoryRepository.save.mockResolvedValue({
            id: 1,
            ...data
        });

        const result = await categoryService.createCategory(data);

        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result.name).toBe('Ideas');
    });
});