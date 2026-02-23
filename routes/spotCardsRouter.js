import express from "express";
import Spotcard from "../models/Spotcard.js";

const router = express.Router();
//OPTIONS GET

router.options("/", (req, res) => {
    res.header("Allow", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(204).send();
});

// GET ALL
router.get("/", async(req, res) => {
    try {
        const spotcards = await Spotcard.find({});
        
        const collection = {
            items: spotcards,
            _links: {
                self: {
                    href: process.env.BASE_URL
                },
                collection: {
                    href: process.env.BASE_URL
                }
            }
        }
        
        console.log(`${spotcards.length} spotcard opgehaald`);
        res.json(collection);
    } catch (e) {
        console.error("Error bij ophalen spotcards:", e);
        res.status(500).json({
            message: "Algemene fout op de server",
        });
    }
});

//OPTIONS DETAIL


//DETAIL (get by id)
router.get("/:id", async(req, res) => {
    console.log("Details opgehaald")
    try {
        const cardId = req.params.id;
        const spotcard = await Spotcard.findById(cardId);
        res.json(spotcard);
    } catch (e) {
        console.error("Error bij ophalen spotcard detail:", e);
        res.status(404).json({
            message: "Spotcard resource bestaat niet op de server",
        });
    }
});

//POST
router.post('/', async(req, res) => {
    console.log("Post ontvangen")
    try {
        const spotcard = new Spotcard ({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            location: req.body.location,
            year: req.body.year 
        })
        await spotcard.save();
        res.json(spotcard);
    } catch (e) {
        res.status(400).json({
            message: "Request van de client is ongeldig"
        });
    }
});

//PUT
router.put("/:id", async (req, res) => {
    const id = req.params.id;

    const newSpotcard ={
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        location: req.body.location,
        year: req.body.year
    };

    try {
        const updatedCard = await Spotcard.findByIdAndUpdate(
            id, newSpotcard,
            { new: true }
        );
        res.json({
            message: "Card aangepast!",
            card: updatedCard
        });

        } catch (e) {
            console.error("Update fout:", e);
            res.status(500).json({
                message: "Er ging iets mis",
                error: e.message
            });
        }

});



//DELETE
router.delete("/:id", async(req, res) => {
    console.log("Delete ontvangen", req.params.id);
    try {
        const deletedCard = await Spotcard.findByIdAndDelete(req.params.id);

        if (!deletedCard) {
            return res.status(404).json({
                message: "Card niet gevonden"
            });
        }

        res.status(200).json({
            message: "Card verwijderd!",
            deletedCard: deletedCard
        });

    } catch (e) {
        console.error("Delete error:", e);
        res.status(500).json({
            message: "Fout bij verwijderen",
            error: e.message
        });
    }
});

export default router;