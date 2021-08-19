const route = require("../controllers/user")
const router = require("express").Router();

router.get("/", route.getusers )
router.post("/add", route.createuser)
router.put("/update", route.updateuser )
router.delete("/delete/:id", route.deleteusers)

module.exports = router;