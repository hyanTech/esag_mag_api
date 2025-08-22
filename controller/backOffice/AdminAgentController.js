const createAgentSchema = require("../../Validation/agent/validateShemaAgent");
const { Agent, Event,TicketCode,Ticket } = require("../../Models");
const AgentLoginSchema = require("../../Validation/agent/AgentLoginShema");

class AdminAgentController {
  static async getAgents(req, res) {
    try {
      const agents = await Agent.findAll({
        include: [{ model: Event, attributes: ["id", "titre"] }],
      });
      return res.status(200).json({ agents });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erreur", error: error.message });
    }
  }

  static async createAgent(req, res) {
    try {
      const { eventId } = req.params;
      const agent = createAgentSchema.parse(req.body);
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res
          .status(400)
          .json({ message: "Erreur", error: "L'événement n'existe pas" });
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

  static deleteAgent = async (req, res) => {
    try {
      const { id } = req.params;
      const agent = await Agent.findByPk(id);
      if (!agent) {
        return res.status(400).json({ message: "Agent introuvable" });
      }
      await Agent.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Agent supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  };

    static AgentConnexion = async (req, res) => {
            try {
            const agent = AgentLoginSchema.parse(req.body);
            if (req.session.agentId) {
                return res.status(400).json({ message: "Vous êtes déjà connecté." });
            }
            const agents = await Agent.findOne({
                where: {
                codeAgent: agent.codeAgent,
                },
            });
            if (agents.length === 0) {
                return res.status(400).json({ message: "Agent introuvable" });
            }
            // Création de la session
            req.session.agentId = agents.id;
            req.session.save((err) => {
                if (err) {
                console.error("Erreur lors de la sauvegarde de la session : ", err);
                return res.status(500).json({ message: "Erreur interne du serveur" });
                }
                return res.status(200).json({
                message: "Connexion réussie",
                agent: { id: agent.id, codeAgent: agent.codeAgent },
                });
            });
            } catch (error) {
            console.error("Erreur lors de la connexion de l'agent : ", error);
            return res
                .status(500)
                .json({ message: "Erreur interne du serveur", error: error.message });
            }
    };


    static async LogoutAgent(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                  console.error('Erreur lors de la destruction de la session : ', err);
                  return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
                }
                return res.status(200).json({ message: 'Déconnexion réussie' });
              });
        } catch (error) {
            console.error('Erreur lors de la déconnexion : ', error);
            return res.status(500).json({ message: 'Erreur lors de la déconnexion', error: error.message });
        }
    }


    static async checkSession(req, res) {
        try {
            if (req.session.agentId) {
              return res.status(200).json({
                isAuthenticated: true,
                agentId: req.session.agentId,
              });
            } else {
              return res.status(200).json({
                isAuthenticated: false,
              });
            }
          } catch (error) {
            console.error("Erreur lors de la vérification de la session :", error);
            return res.status(500).json({
              message: "Erreur interne du serveur",
              error: error.message,
            });
          }
    }


    static async verifyTicket(req, res) {
      try {
       
        console.log(req.body);
        return res.status(200).json({ message: "ticket Verifie" });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Erreur", error: error.message });
      }
    }
    


}

module.exports = AdminAgentController;
