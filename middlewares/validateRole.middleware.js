const { ObjectId } = require('mongodb');
const { getClient } = require('../config/database.config');

const validateRole = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const userRoleID = new ObjectId(req.user.role);
            const db = getClient();
            const rolesCollection = db.collection('roles');

            // Check if the user has any of the required roles
            const userRole = await rolesCollection.findOne({ _id: userRoleID });

            if (userRole && requiredRoles.includes(userRole.name)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Forbidden: Insufficient role privileges' });
            }
        } catch (error) {
            console.error('Error validating role:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = validateRole;
