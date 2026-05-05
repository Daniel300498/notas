import CategoryModel from './category.model.js';

export default class CategoryMongoRepository {
    async save(categoryEntity) {
        const category = new CategoryModel({
            name: categoryEntity.name,
            userId: categoryEntity.userId
        });
        const savedCategory = await category.save();
        return savedCategory.toObject();
    }
    async findByUserId(userId) {
        return await CategoryModel.find({ userId });
    }

    async findById(id) {
        return await CategoryModel.findById(id);
    }

    async updateCategory(id, data) {
        return await CategoryModel.findByIdAndUpdate(id,data,{ new: true });
    }
    async delete(id) {
        return await CategoryModel.findByIdAndDelete(id);
    }
}