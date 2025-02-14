


class Controller {
    static test = async (req, res) => {
        res.json({ message: "Hello, world!" });
    }
    static test2 = async (req,res) =>{
        console.log(req.body)
        res.json({ message: "Hello, test!" })
    }
}

module.exports = Controller;