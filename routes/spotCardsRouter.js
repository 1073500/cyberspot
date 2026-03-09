import express from "express";
import Spotcard from "../models/Spotcard.js";

const spotCardsRouter = express.Router();
//OPTIONS GET

spotCardsRouter.options("/", (req, res) => {
    res.header("Allow", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(204).send();
});

// GET ALL
spotCardsRouter.get("/", async(req, res) => {
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
spotCardsRouter.get("/:id", async(req, res) => {
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
spotCardsRouter.post('/', async(req, res) => {
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
spotCardsRouter.put("/:id", async (req, res) => {
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
spotCardsRouter.delete("/:id", async(req, res) => {
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

export default spotCardsRouter;