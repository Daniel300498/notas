export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {
        const data = req.body;
        data.userId = req.user.id;
        try {
            const category = await this.categoryService.createCategory(data);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getCategoriesByUserId = async (req, res) => {
        const userId = req.user.id;
        try {
            const categories = await this.categoryService.getCategoriesByUserId(userId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdCategory = async (req, res) => {
        const {id} = req.params;
        const userId = req.user.id;
        try {
            const category = await this.categoryService.getByIdCategory(id);

            if (!category || category.userId !== userId) {
                return res.status(404).json({
                    error: 'Category not found or non-existent'
                });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateCategory = async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const data = req.body;
        try {
            const category = await this.categoryService.getByIdCategory(id);
            if (!category || category.userId !== userId) {
                return res.status(404).json({
                    error: 'Category not found or non-existent'
                });
            }
            const updated = await this.categoryService.updateCategory(id, data);
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteCategory = async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const category = await this.categoryService.getByIdCategory(id);
            if (!category || category.userId !== userId) {
                return res.status(404).json({
                    error: 'Category not found or non-existent'
                });
            }
            await this.categoryService.deleteCategory(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}