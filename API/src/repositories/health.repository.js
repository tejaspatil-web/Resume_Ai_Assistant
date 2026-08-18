import db from '../config/db.js';

class HealthRepository {
    async checkDatabase() {
        await db.query('SELECT 1');
        return true;
    }
}

export default new HealthRepository();