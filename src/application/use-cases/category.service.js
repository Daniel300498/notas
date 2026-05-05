import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(data) {
        if (!data.name) {throw new Error("Name is required");}
        const category = new CategoryEntity(data);
        return await this.categoryRepository.save(category);
    }
    async getCategoriesByUserId(userId) {
        return await this.categoryRepository.findByUserId(userId);
    }
    async getByIdCategory(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {throw new Error("Categoria no encontrada");}
        return category;
    }

    async updateCategory(id, data) {
        const category = await this.categoryRepository.updateCategory(id, data);
        if (!category) {throw new Error("Categoria no encontrada");}
        return category;
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.delete(id);
        if (!category) {
            throw new Error("Categoria no se pudo eliminar");
        }
        return {message: "Categoria eliminada satisfactoriamente"};
    }
}