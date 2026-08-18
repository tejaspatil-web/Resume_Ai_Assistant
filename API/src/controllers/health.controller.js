import healthRepository from '../repositories/health.repository.js';

class HealthController {
    async checkHealth(req, res) {
        try {
            await healthRepository.checkDatabase();

            res.status(200).json({
                status: 'healthy',
                database: 'connected'
            });
        } catch (error) {
            console.error('Database health check failed:', error);

            res.status(503).json({
                status: 'unhealthy',
                database: 'disconnected'
            });
        }
    }
}

export default new HealthController();