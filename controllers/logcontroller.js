let router = require("express").Router();
let validateSession = require("../middleware/validate-session");
let Log = require("../db").import("../models/log");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey! this is a practice route");
});

/* *************
 *** Log Create ***
 *************** */

router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

/* *****************
 *** GET ALL ENTRIES OF SINGLE USER ***
 ******************* */

router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: { owner_id: userid },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ********************
 *** Get entry by indivdual logs by user
 ********************* */

router.get("/:id", validateSession, (req, res) => {
  let log = req.params.id;

  Log.findOne({
    where: { id: log },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ********************
 ***Allows indivdual logs to be updated by user
 ********************** */
router.put("/:id", validateSession, (req, res) => {
  console.log(req.user.id);
  console.log(req.body);
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.id, owner_id: req.user.id } };
  Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ********************
 ***Allows individual logs to be deleted by user
 ********************* */
router.delete("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log entry removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
