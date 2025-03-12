const createAgentSchema = require("../../Validation/agent/validateShemaAgent");
const { Agent,Event } = require("../../Models");

class AdminAgentController {
    static async getAgents(req, res) {
        try {
            const agents = await Agent.findAll();
            return res.status(200).json({ agents });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erreur", error: error.message });
        }
    }

    static async createAgent(req, res) {
        try {
            const {eventId} = req.params;
            const agent = createAgentSchema.parse(req.body);
            const event = await Event.findByPk(eventId);
            if (!event) {
                return res.status(400).json({ message: "Erreur", error: "L'événement n'existe pas" });
            }
            agent.eventId = event.id;
            await Agent.create(agent);
            return res.status(200).json({ message: "Ok", agent: agent });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Erreur", error: error.message });
        }
    }


    static async ValidateTicket(req, res) {
        try {
            const { id } = req.params;
            const agent = await Agent.findByPk(id);
            return res.status(200).json({ agent });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erreur", error: error.message });
        }
    }

}

module.exports = AdminAgentController;