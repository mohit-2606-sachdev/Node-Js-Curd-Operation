const Person = require('../Models/PersonSchema')

exports.getPersonDetails = (req, res) => {
    Person.find({ CREATED_BY: req.Id }).then(result => {
        res.send(result)
    })
}

exports.addPersonDetails = (req, res) => {
    const name = req.body.name
    const number = req.body.number
    const email = req.body.email

    const personDetails = new Person({
        "name": name,
        "number": number,
        "email": email,
        "CREATED_BY": req.Id
    })

    personDetails.save().then(() => {
        res.send({
            message: 'Person Details Added Successfully'
        })
    }).catch((err) => {
        res.send({
            message: "Email Should Be Unique",
            err: err
        })
    })
}

exports.deletePersonDetails = (req, res) => {
    Person.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send("deleted succesfully")
        })
}

exports.updatePersonDetails = async (req, res) => {
    const id = req.params.id
    const newDetails = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        UPDATED_AT: new Date
    }

    try {
        await Person.findByIdAndUpdate(id, newDetails, { new: true })
        res.send("updated succesfully")
    } catch (error) {
        res.status(500).send({ message: "Something went Wrong", error: error })
    }
}

