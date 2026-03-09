import express from "express";
import Category from "../models/Category.js";

const categoryRouter = express.Router();

//OPTIONS GET
categoryRouter.options("/", (req, res) => {
    res.header("Allow", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(204).send();
});

// GET ALL
categoryRouter.get("/", async(req, res) => {
    try {
        const categories = await Category.find({});
        const collection = {
            items: categories,
            _links: {
                self: {
                    href: process.env.BASE_URL
                },
                collection: {
                    href: process.env.BASE_URL
                }
            }
        }
        console.log(`${categories.length} categorieën opgehaald`);
        res.json(collection);
    } catch (e) {
        console.error("Error bij ophalen categorieën:", e);
        res.status(500).json({
            message: "Algemene fout op de server",
        });
    }
});

//OPTIONS DETAIL

//DETAIL (get by id)
categoryRouter.get("/:id", async(req, res) => {
    console.log("Details opgehaald")
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        res.json(category);
    } catch (e) {
        console.error("Error bij ophalen categorie detail:", e);
        res.status(404).json({
            message: "Categorie resource bestaat niet op de server",
        });
    }
});

//POST
categoryRouter.post('/', async(req, res) => {
    console.log("Post ontvangen")
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })
        await category.save();
        res.status(201).json(category);
    } catch (e) {
        console.error("Error bij aanmaken categorie:", e);
        res.status(400).json({  
            message: "Ongeldige data voor categorie",
        });
    }
});

//PUT
categoryRouter.put("/:id", async(req, res) => {
    console.log("Put ontvangen")
    try {
        const categoryId = req.params.id;

        const newCategory = {
            name: req.body.name,
            description: req.body.description
        };

        const updatedCategory = await Category.findByIdAndUpdate(
            id, newCategory, { new: true }
        );
        res,json({
            message: "Categorie succesvol bijgewerkt",
            category: updatedCategory
        });
    } catch (e) {
        console.error("Error bij bijwerken categorie:", e);
        res.status(400).json({
            message: "Ongeldige data voor categorie",
        });
    }
});

//DELETE
categoryRouter.delete("/:id", async(req, res) => {
    console.log("Delete ontvangen")
    try {        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        res.json({
            message: "Categorie succesvol verwijderd"
        });
    } catch (e) {
        console.error("Error bij verwijderen categorie:", e);
        res.status(404).json({
            message: "Categorie resource bestaat niet op de server",
        });
    }
});

export default categoryRouter;