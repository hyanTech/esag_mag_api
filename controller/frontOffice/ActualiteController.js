const {Actualite} = require('../../models')

class ActualiteController{
    static async dernierActu(req, res){
        try{
            const dernierActu = await Actualite.findAll({
                where:{
                    enabled: true
                },
                order: [['createdAt', 'DESC']],
                limit: 4
            });
           return res.status(200).json({dernierActu})
        }catch(error){
            console.error(error);
            res.status(500).json({message: error.message})
        }
    }

    static async detailActu(req, res){
        try {
            const {id} = req.params
            const actu = await Actualite.findByPk(id, { where: { enabled: true } });
            return res.status(200).json(actu)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message})
        }
    }
}

module.exports = ActualiteController;